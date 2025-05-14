const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': key,
  'Authorization': `Bearer ${key}`
};

export async function getShows() {
  try {

    const response = await fetch(`${url}/rest/v1/shows?select=*&order=date.asc`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    return [];
  }
}

export async function getReviews() {
  try {

    const response = await fetch(`${url}/rest/v1/reviews?select=*&order=stars.asc`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function savePrice(name, email, price, newsletter = false) {
  try {
    // Gem pris data
    const response = await fetch(`${url}/rest/v1/price`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        email,
        price
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Hvis bruger har sagt ja til nyhedsbrev, tjek først om emailen allerede findes
    if (newsletter) {
      // Tjek om email allerede findes i newsletter tabellen
      const checkResponse = await fetch(
        `${url}/rest/v1/newsletter?email=eq.${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: headers
      });

      if (!checkResponse.ok) {
        console.error('Fejl ved tjek af eksisterende email');
      } else {
        const existingEmails = await checkResponse.json();
        
        // Kun tilføj til newsletter hvis emailen ikke allerede findes
        if (existingEmails.length === 0) {
          const newsletterResponse = await fetch(`${url}/rest/v1/newsletter`, {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              email
            })
          });

          if (!newsletterResponse.ok) {
            console.error('Fejl ved gemning af nyhedsbrev tilmelding');
          }
        } else {
          console.log(`Email ${email} findes allerede i newsletter`);
        }
      }
    }

    // Supabase returnerer ikke altid JSON ved POST requests
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error('Error saving price data:', error);
    throw error;
  }
}
