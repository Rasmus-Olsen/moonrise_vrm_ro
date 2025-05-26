import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export const getShows = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    });

    if (!response?.results) return [];

    return response.results.map(page => {
      const file = page.properties.Images?.files[0];
      const imageUrl = file?.external?.url || file?.file?.url || '/assets/images/testimage.jpg';
    
      return {
        id: page.id,
        title: page.properties.Title?.rich_text[0]?.plain_text || 'Ingen titel',
        description: page.properties.Description?.rich_text[0]?.plain_text || '',
        date: page.properties.Date?.date?.start || '',
        image: imageUrl,
        adresse: page.properties.Adresse?.rich_text[0]?.plain_text || ''
      };
    });

  } catch (error) {
    console.error('Fejl ved hentning fra Notion:', error);
    return [];
  }
};

export const formatNotionDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
