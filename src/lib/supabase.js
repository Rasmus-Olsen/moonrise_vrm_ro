const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': key,
  'Authorization': `Bearer ${key}`
};

export async function getShows() {
  try {
    console.log('Fetching from URL:', `${url}/rest/v1/shows`);
    console.log('Using headers:', headers);
    
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
    console.log('Fetching from URL:', `${url}/rest/v1/reviews`);
    console.log('Using headers:', headers);
    
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

