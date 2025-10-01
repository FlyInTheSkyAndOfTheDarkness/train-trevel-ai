export type Station = { id: string; name: string; country?: string; timezone?: string };
export type Trip = {
  id: string;
  trainNumber: string;
  operator?: string;
  origin: { stationId: string; name: string; time: string };
  destination: { stationId: string; name: string; time: string };
  durationMinutes: number;
  transfers?: number;
  amenities?: string[];
};
export type Fare = { classCode: string; className: string; priceMinor: number; currency: string; refundable?: boolean };

export interface RailProvider {
  searchStations(query: string): Promise<Station[]>;
  searchTrips(args: { originId: string; destinationId: string; date: string }): Promise<Trip[]>;
  getFares(args: { tripId: string; date: string }): Promise<Fare[]>;
  getCheapestCalendar?(args: { originId: string; destinationId: string; month: string }): Promise<{ date: string; minPriceMinor: number; currency: string }[]>;
}

