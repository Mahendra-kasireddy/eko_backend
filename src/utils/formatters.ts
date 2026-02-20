export const formatCurrency = (amount: number): string =>
  `₹${amount.toLocaleString('en-IN')}`;

export const formatWeight = (kg: number): string =>
  kg >= 1 ? `${kg.toFixed(1)} kg` : `${(kg * 1000).toFixed(0)} g`;

export const formatDistance = (km: number): string =>
  km >= 1 ? `${km.toFixed(1)} km` : `${(km * 1000).toFixed(0)} m`;

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatPhone = (phone: string): string =>
  phone.replace(/(\d{5})(\d{5})/, '$1 $2');

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'});
};

export const formatTime = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'});
};

export const tierLabel = (tier: 'bronze' | 'silver' | 'gold'): string => {
  const map = {bronze: 'Bronze Rider', silver: 'Silver Rider', gold: 'Gold Rider'};
  return map[tier];
};
