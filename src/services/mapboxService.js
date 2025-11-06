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

export const getDirections = async (coordinates, profile = 'walking', options = {}) => {
  try {
    if (!MAPBOX_ACCESS_TOKEN) {
      throw new Error('Mapbox access token not found in environment variables');
    }

    if (!Array.isArray(coordinates) || coordinates.length < 2) {
      throw new Error('At least 2 coordinates are required');
    }

    // Format coordinates as comma-separated lng,lat pairs
    const coordinatesString = coordinates
      .map(([lng, lat]) => `${lng},${lat}`)
      .join(';');

    // Build query parameters
    const params = new URLSearchParams({
      access_token: MAPBOX_ACCESS_TOKEN,
      geometries: 'geojson',
      overview: 'full',
      ...options,
    });

    const url = `${BASE_URL}/directions/v5/mapbox/${profile}/${coordinatesString}?${params.toString()}`;


    const response = await fetch(url);

    const data_json = await response.json();

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status} - ${data_json.message || JSON.stringify(data_json)}`);
    }

    if (data_json.code !== 'Ok') {
      throw new Error(`Directions API error: ${data_json.code}`);
    }

    return data_json;
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error;
  }
};




/**
 * Get optimized route through multiple waypoints
 * @param {Array<[number, number]>} coordinates - Array of [longitude, latitude] pairs
 * @param {Object} options - Optional parameters
 * @returns {Promise<Object>} Optimized route data
 */
export const getOptimizedRoute = async (coordinates, options = {}) => {
  try {
    if (!MAPBOX_ACCESS_TOKEN) {
      throw new Error('Mapbox access token not found');
    }

    const coordinatesString = coordinates
      .map(([lng, lat]) => `${lng},${lat}`)
      .join(';');

    const params = new URLSearchParams({
      access_token: MAPBOX_ACCESS_TOKEN,
      geometries: 'geojson',
      overview: 'full',
      optimize: 'true',
      ...options,
    });

    const url = `${BASE_URL}/directions/v5/mapbox/driving/${coordinatesString}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== 'Ok') {
      throw new Error(`Directions API error: ${data.code}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching optimized route:', error);
    throw error;
  }
};

/**
 * Extract route geometry from directions response
 * @param {Object} directionsData - Response from getDirections
 * @param {number} routeIndex - Which route to extract (default: 0)
 * @returns {Object} GeoJSON Feature with route geometry
 */
export const extractRouteGeometry = (directionsData, routeIndex = 0) => {
  if (!directionsData.routes || !directionsData.routes[routeIndex]) {
    throw new Error('No route found at specified index');
  }

  const route = directionsData.routes[routeIndex];

  return {
    type: 'Feature',
    geometry: route.geometry,
    properties: {
      distance: route.distance,
      duration: route.duration,
      legs: route.legs,
    },
  };
};

/**
 * Calculate total distance and duration from route data
 * @param {Object} directionsData - Response from getDirections
 * @returns {Object} { distance: number (meters), duration: number (seconds) }
 */
export const getRouteStats = (directionsData) => {
  if (!directionsData.routes || directionsData.routes.length === 0) {
    throw new Error('No routes found in directions data');
  }

  const route = directionsData.routes[0];

  return {
    distance: route.distance, // meters
    duration: route.duration, // seconds
    distanceInMiles: (route.distance * 0.000621371).toFixed(2),
    durationInMinutes: Math.round(route.duration / 60),
  };
};
