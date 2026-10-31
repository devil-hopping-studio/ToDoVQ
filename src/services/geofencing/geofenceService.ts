import { Task } from '../../models/Task';

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const calculateDistanceMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const earthRadiusMeters = 6371000;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMeters * c;
};

export const evaluateGeofenceTriggers = (
  tasks: Task[],
  currentLat: number,
  currentLon: number
): Task[] => {
  return tasks.filter((task) => {
    if (task.isCompleted || !task.geofence) return false;
    const distance = calculateDistanceMeters(
      currentLat,
      currentLon,
      task.geofence.latitude,
      task.geofence.longitude
    );
    return distance <= task.geofence.radiusMeters;
  });
};
