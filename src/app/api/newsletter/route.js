import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Opret Supabase klient
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Tjek om vi har de nødvendige miljøvariabler
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Manglende miljøvariabler');
  throw new Error('Mangler en eller flere miljøvariabler: EMAIL_USER, EMAIL_PASS');
}

// Opret email transporter med Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Funktion til at hente emails fra Supabase newsletter tabel
async function getNewsletterEmails() {
  console.log('Henter emails fra Supabase...');
  const { data, error } = await supabase
    .from('newsletter')
    .select('email');

  if (error) {
    console.error('Fejl ved hentning af emails fra Supabase:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    console.log('Ingen emails fundet i Supabase newsletter tabel');
    return [];
  }

  const emails = data.map(row => row.email);
  console.log(`Fandt ${emails.length} emails i Supabase:`, emails);
  return emails;
}

// Hent nyhedsbrev fra Notion
async function getNewsletterFromNotion() {
  console.log('Henter fra Notion database:', process.env.NOTION_NEWSLETTER_DATABASE_ID);
  
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_NEWSLETTER_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        property: 'Date',
        date: {
          equals: '2025-06-02'
        }
      }
    })
  });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API fejl:', error);
      throw new Error(`Notion API fejl: ${error.message}`);
    }

    const data = await response.json();
    console.log('Notion svar:', data);

    if (!data.results || data.results.length === 0) {
      console.log('Ingen nyhedsbreve fundet');
      return null;
    }

    return data.results[0];
  } catch (error) {
    console.error('Fejl ved hentning fra Notion:', error);
    throw error;
  }
}

// Marker nyhedsbrev som sendt i Notion
async function markNewsletterAsSent(pageId) {
  await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        'Sendt': {
          checkbox: true
        }
      }
    })
  });
}

// GET route til at tjekke og sende planlagt nyhedsbrev
export async function GET(request) {
  try {
    console.log('=== Start nyhedsbrev check ===');
    
    const newsletter = await getNewsletterFromNotion();
    
    if (!newsletter) {
      return NextResponse.json({
        success: false,
        message: 'Ingen nyhedsbreve fundet'
      });
    }

    // Hent data fra nyhedsbrevet
    const title = newsletter.properties.Name.title[0]?.plain_text;
    const scheduledDate = new Date(newsletter.properties.Date.date.start);
    const fileData = newsletter.properties.File.files[0];
    const currentDate = new Date();

    console.log('Planlagt dato:', scheduledDate);
    console.log('Nuværende dato:', currentDate);

    // Tjek om nyhedsbrevet skal sendes (enten manuelt via Send eller automatisk via dato)
    const manualSend = newsletter.properties.Send?.checkbox;
    const scheduledSend = scheduledDate <= currentDate;
    
    if (!manualSend && !scheduledSend) {
      return NextResponse.json({
        success: false,
        message: 'Nyhedsbrev er ikke klar til at sende endnu',
        scheduledDate: scheduledDate,
        currentDate: currentDate
      });
    }

    // Hent billede fra Notion
    let imageBuffer;
    if (fileData?.file?.url) {
      const imageResponse = await fetch(fileData.file.url);
      imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    }

    // Hent emails fra Supabase newsletter table
    const recipients = await getNewsletterEmails();
    
    if (!recipients || recipients.length === 0) {
      console.error('Ingen modtagere fundet i newsletter tabellen');
      return NextResponse.json({
        success: false,
        error: 'Ingen modtagere fundet'
      }, { status: 400 });
    }
    console.log('Sender til følgende emails:', recipients);
    
    // Send email
    await transporter.sendMail({
      from: '"Moonrise Droner" <rasmusolsen071197@gmail.com>',
      bcc: recipients,
      subject: title,
      attachments: imageBuffer ? [
        {
          filename: fileData.name,
          content: imageBuffer,
          cid: 'newsletter-image'
        }
      ] : [],
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #333; text-align: center;">${title}</h1>
          ${imageBuffer ? `<img src="cid:newsletter-image" style="max-width: 100%; height: auto; display: block; margin: 20px auto;">` : ''}
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 Moonrise Droner. Alle rettigheder forbeholdes.<br>
            Ønsker du ikke at modtage flere nyhedsbreve? <a href="#" style="color: #666;">Afmeld her</a>
          </p>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      message: 'Nyhedsbrev sendt',
      recipients: recipients.length,
      title: title
    });

  } catch (error) {
    console.error('Fejl ved hentning af nyhedsbrev:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { subject, content, sendDate, fileUrl, fileName } = data;

    // Tjek om det er tid til at sende
    const now = new Date();
    const scheduledDate = new Date(sendDate);
    
    if (scheduledDate > now) {
      return NextResponse.json({ 
        success: false,
        message: 'Newsletter scheduled for future delivery',
        scheduledDate: sendDate
      });
    }
    
    // Hent alle emails fra Supabase newsletter tabel
    const recipients = await getNewsletterEmails();

    // Valider input
    if (!subject || !content || !recipients || recipients.length === 0) {
      return NextResponse.json({ 
        error: 'Invalid input',
        details: 'Missing required fields or invalid format'
      }, { status: 400 });
    }

    console.log('Forsøger at sende nyhedsbrev til:', recipients);

    // Send email til alle modtagere
    await transporter.sendMail({
      from: '"Moonrise Droner" <rasmusolsen071197@gmail.com>',
      to: recipients.join(', '),
      subject: subject,
      html: content,
      attachments: fileUrl ? [
        {
          filename: fileName || 'newsletter-attachment.pdf',
          path: fileUrl
        }
      ] : []
    });

    console.log('Nyhedsbrev sendt!');
    return NextResponse.json({ 
      success: true,
      message: 'Newsletter sent successfully'
    });

  } catch (error) {
    // Log den detaljerede fejl for debugging
    console.error('Detaljeret fejl:', {
      name: error.name,
      message: error.message,
      code: error.code
    });

    // Send en mere specifik fejlbesked tilbage
    const errorMessage = error.code === 'EAUTH' ? 
      'Email authentication failed' : 
      'Failed to send newsletter';

    return NextResponse.json({ 
      error: errorMessage,
      details: error.message
    }, { status: 500 });
  }
}
