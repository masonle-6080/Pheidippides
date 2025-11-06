// Mapbox API Service
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const BASE_URL = 'https://api.mapbox.com';

/**
 * Get directions between two or more coordinates
 * @param {Array<[number, number]>} coordinates - Array of [longitude, latitude] pairs
 * @param {string} profile - Route profile: 'driving', 'driving-traffic', 'walking', 'cycling'
 * @param {Object} options - Optional parameters
 * @returns {Promise<Object>} Route data with geometry, distance, duration
 */

export const optimizedRoute = async (coords, profile = 'walking') => {
  try {
    if(!MAPBOX_ACCESS_TOKEN){
      throw new Error('Mapbox access not working');
    } 
    if (!Array.isArray(coords) || coords.length < 2) {
      throw new Error('coords wrong');
    }

    const coordString = coords
      .map(([lng, lat]) => `${lng},${lat}`)
      .join(';');
    
    const params = new URLSearchParams({
      access_token: MAPBOX_ACCESS_TOKEN,
      geometries: 'geojson',
      overview: 'full',
    });

    const response = await fetch(`${BASE_URL}/directions/v5/mapbox/${profile}/${coordString}?${params.toString()}`);
      
    const data_json = await response.json();

    if(!response.ok) {
      throw new Error(`Mapbox API error: ${response.status} - ${data_json.message || JSON.stringify(data_json)}`)
    }

    if (data_json.code !== 'Ok') {
      throw new Error(`Directions API error: ${data_json.code}`);
    }
    return data_json;
    
  } catch (error) {
    console.error('Error with getting route: ', error);
    throw error;
  }
}

