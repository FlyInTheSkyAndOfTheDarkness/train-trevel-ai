import type { RailProvider, Station, Trip, Fare } from '@/lib/rail/types';
import { env } from '@/lib/env.mjs';

// TODO: Replace placeholders with a real public rail API.
// Expected env: RAIL_API_BASE, RAIL_API_KEY

export const providerTemplate: RailProvider = {
  async searchStations(query: string): Promise<Station[]> {
    void query;
    // Example:
    // const res = await fetch(`${env.RAIL_API_BASE}/stations?query=${encodeURIComponent(query)}&key=${env.RAIL_API_KEY}`);
    // const data = await res.json();
    // return data.items.map(mapStation);
    return [];
  },

  async searchTrips({ originId, destinationId, date }): Promise<Trip[]> {
    void originId; void destinationId; void date;
    // Example:
    // const res = await fetch(`${env.RAIL_API_BASE}/trips?from=${originId}&to=${destinationId}&date=${date}&key=${env.RAIL_API_KEY}`);
    // const data = await res.json();
    // return data.items.map(mapTrip);
    return [];
  },

  async getFares({ tripId, date }): Promise<Fare[]> {
    void tripId; void date;
    // Example:
    // const res = await fetch(`${env.RAIL_API_BASE}/fares?tripId=${tripId}&date=${date}&key=${env.RAIL_API_KEY}`);
    // const data = await res.json();
    // return data.items.map(mapFare);
    return [];
  },

  async getCheapestCalendar?.({ originId, destinationId, month }: { originId: string; destinationId: string; month: string }) {
    void originId; void destinationId; void month;
    // Example optional endpoint for monthly price calendar
    return [] as { date: string; minPriceMinor: number; currency: string }[];
  }
};


