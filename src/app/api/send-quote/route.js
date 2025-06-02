import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateQuotePDF } from '@/components/pdf/QuotePDF';

const getEmailTemplate = (data, language = 'da') => {
  const templates = {
    da: {
      subject: 'Dit tilbud fra Moonrise Droner',
      text: `
        Kære ${data.name},
        
        Tak for din interesse i Moonrise Droner. Vedhæftet finder du dit personlige tilbud.
        
        Tilbudsoversigt:
        - Samlet pris: ${new Intl.NumberFormat("da-DK").format(data.price)} kr.
        - Antal droner: ${data.droneCount}
        
        Vi vil kontakte dig hurtigst muligt for at diskutere de nærmere detaljer.
        
        Med venlig hilsen
        Moonrise Droner
      `,
      filename: `Moonrise_Tilbud_${data.name.replace(/\s+/g, '_')}.pdf`
    },
    en: {
      subject: 'Your Quote from Moonrise Drones',
      text: `
        Dear ${data.name},
        
        Thank you for your interest in Moonrise Drones. Please find your personalized quote attached.
        
        Quote Overview:
        - Total price: ${new Intl.NumberFormat("en-US").format(data.price)} DKK
        - Number of drones: ${data.droneCount}
        
        We will contact you as soon as possible to discuss the details.
        
        Best regards,
        Moonrise Drones
      `,
      filename: `Moonrise_Quote_${data.name.replace(/\s+/g, '_')}.pdf`
    }
  };

  return templates[language] || templates.da;
};

export async function POST(request) {
  try {
    const data = await request.json();
    // Generer PDF med det valgte sprog
    const pdfBase64 = generateQuotePDF({ ...data, language: data.language });
    const pdfData = pdfBase64.split(',')[1];

    // Tjek om vi har de nødvendige miljøvariabler
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Manglende email credentials i miljøvariabler');
      return NextResponse.json({ 
        error: 'Server configuration error',
        details: 'Missing email credentials'
      }, { status: 500 });
    }

    // Opret email transporter med Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('Forsøger at sende email til:', data.email);

    // Hent den korrekte email template baseret på sprog
    const template = getEmailTemplate(data, data.language);

    // Send email
    await transporter.sendMail({
      from: '"Moonrise Droner" <rasmusolsen071197@gmail.com>',
      to: data.email,
      subject: template.subject,
      text: template.text,
      attachments: [
        {
          filename: template.filename,
          content: pdfData,
          encoding: 'base64'
        }
      ]
    });

    console.log('Email sendt!');
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully'
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
      'Failed to send email';

    return NextResponse.json({ 
      error: errorMessage,
      details: error.message
    }, { status: 500 });
  }
}
