import type { RailProvider, Station, Trip, Fare } from '@/lib/rail/types';
import { addMinutes, formatISO } from 'date-fns';

const stations: Station[] = [
  { id: 'ru_mow_leningradskiy', name: 'Москва Ленинградская', country: 'RU', timezone: 'Europe/Moscow' },
  { id: 'ru_spb_moskovskiy', name: 'Санкт-Петербург Московский', country: 'RU', timezone: 'Europe/Moscow' },
  { id: 'kz_ala', name: 'Алматы-1', country: 'KZ', timezone: 'Asia/Almaty' }
];

function mockTrips(originId: string, destinationId: string, date: string): Trip[] {
  const start = new Date(date + 'T06:00:00');
  return [
    {
      id: 'trip_001',
      trainNumber: '012А',
      operator: 'RZD',
      origin: { stationId: originId, name: stations.find(s=>s.id===originId)?.name ?? 'Origin', time: formatISO(start) },
      destination: { stationId: destinationId, name: stations.find(s=>s.id===destinationId)?.name ?? 'Dest', time: formatISO(addMinutes(start, 240)) },
      durationMinutes: 240,
      transfers: 0,
      amenities: ['WiFi', 'Power']
    },
    {
      id: 'trip_002',
      trainNumber: '102Б',
      operator: 'RZD',
      origin: { stationId: originId, name: stations.find(s=>s.id===originId)?.name ?? 'Origin', time: formatISO(addMinutes(start, 120)) },
      destination: { stationId: destinationId, name: stations.find(s=>s.id===destinationId)?.name ?? 'Dest', time: formatISO(addMinutes(start, 540)) },
      durationMinutes: 420,
      transfers: 0,
      amenities: ['Power']
    }
  ];
}

function mockFares(): Fare[] {
  return [
    { classCode: 'eco', className: 'Плацкарт', priceMinor: 250000, currency: 'RUB', refundable: true },
    { classCode: 'std', className: 'Купе', priceMinor: 420000, currency: 'RUB', refundable: true },
    { classCode: 'bus', className: 'СВ', priceMinor: 780000, currency: 'RUB', refundable: false }
  ];
}

export const mockProvider: RailProvider = {
  async searchStations(query: string): Promise<Station[]> {
    if (!query) return stations;
    const q = query.toLowerCase();
    return stations.filter((s) => s.name.toLowerCase().includes(q));
  },
  async searchTrips({ originId, destinationId, date }) {
    return mockTrips(originId, destinationId, date);
  },
  async getFares() {
    return mockFares();
  },
  async getCheapestCalendar({ originId, destinationId, month }) {
    void originId; void destinationId; void month;
    // simple mock calendar: cheaper mid-week
    const days = Array.from({ length: 28 }).map((_, i) => {
      const day = i + 1;
      const isWeekend = [6, 7, 13, 14, 20, 21, 27, 28].includes(day);
      const price = isWeekend ? 450000 : 260000;
      return { date: `${month}-${String(day).padStart(2, '0')}`, minPriceMinor: price, currency: 'RUB' };
    });
    return days;
  }
};


