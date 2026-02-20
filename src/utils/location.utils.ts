import {Coordinates} from '../types/trip.types';

export const getDistanceBetween = (a: Coordinates, b: Coordinates): number => {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const aCalc =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  return parseFloat((R * c).toFixed(2));
};

export const HYDERABAD_CENTER: Coordinates = {
  latitude: 17.3850,
  longitude: 78.4867,
};
