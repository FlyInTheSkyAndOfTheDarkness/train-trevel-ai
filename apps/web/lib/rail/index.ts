import { env } from '@/lib/env.mjs';
import type { RailProvider } from '@/lib/rail/types';
import { mockProvider } from '@/lib/rail/providers/mock';
import { providerTemplate } from '@/lib/rail/providers/providerTemplate';

export function getRailProvider(): RailProvider {
  switch (env.RAIL_PROVIDER) {
    case 'mock':
      return mockProvider;
    case 'transportapi_uk':
      return providerTemplate; // TODO: swap with real UK TransportAPI implementation when ready
    default:
      return mockProvider;
  }
}

