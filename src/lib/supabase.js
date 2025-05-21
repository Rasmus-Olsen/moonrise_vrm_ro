const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

// Helper funktion til at lave API kald
async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}/rest/v1/${endpoint}`, {
    headers,
    ...options
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response;
}

// Hent data fra en tabel med sortering
async function getData(table, orderBy) {
  try {
    const response = await fetchApi(`${table}?select=*&order=${orderBy}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${table}:`, error);
    return [];
  }
}

// Export functions
export const getReviews = () => getData('reviews', 'stars.asc');

export async function saveNewsletter(email) {
  try {
    await fetchApi('newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: email.toLowerCase() })
    });
    return { status: 'success' };
  } catch (error) {
    return error.message.includes('unique constraint')
      ? { status: 'exists' }
      : { status: 'error', error };
  }
}

export async function savePrice(name, email, price, newsletter = false) {
  try {
    // Gem pris
    await fetchApi('price', {
      method: 'POST',
      body: JSON.stringify({ name, email, price })
    });

    // Tilmeld nyhedsbrev hvis ønsket
    if (newsletter) {
      try {
        await saveNewsletter(email);
      } catch (newsletterError) {
        // Ignorer nyhedsbrev fejl - prisen er gemt
        console.log('Pris gemt, men kunne ikke tilmelde nyhedsbrev');
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving price:', error);
    throw error;
  }
}
