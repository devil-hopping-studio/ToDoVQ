export interface RegionConfig {
  countryCode: string;
  countryName: string;
  flagEmoji: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeFormat: '12h' | '24h';
  locale: string;
}

export const SUPPORTED_REGIONS: RegionConfig[] = [
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flagEmoji: '🇬🇧',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    locale: 'en-GB',
  },
  {
    countryCode: 'US',
    countryName: 'United States',
    flagEmoji: '🇺🇸',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    locale: 'en-US',
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flagEmoji: '🇨🇦',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '12h',
    locale: 'en-CA',
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    flagEmoji: '🇦🇺',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    locale: 'en-AU',
  },
  {
    countryCode: 'DE',
    countryName: 'Germany',
    flagEmoji: '🇩🇪',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    locale: 'de-DE',
  },
  {
    countryCode: 'FR',
    countryName: 'France',
    flagEmoji: '🇫🇷',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    locale: 'fr-FR',
  },
];

export const formatTaskDate = (timestamp: number, region: RegionConfig): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  switch (region.dateFormat) {
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
    default:
      return `${day}/${month}/${year}`;
  }
};

export const formatTaskTime = (timestamp: number, region: RegionConfig): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (region.timeFormat === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  }

  const paddedHours = String(hours).padStart(2, '0');
  return `${paddedHours}:${minutes}`;
};
