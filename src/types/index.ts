export type CapCondition = 0 | 1 | 2 | 3 | 4;
export type CapType = 'venta' | 'swap' | 'ambos';
export type EscrowState = 'idle' | 'locked' | 'confirmed' | 'released';
export type Level = 'BRONCE' | 'PLATA' | 'ORO' | 'ÉLITE';

export interface Cap {
  id: number;
  name: string;
  brand: string;
  price: number;
  condition: CapCondition;
  type: CapType;
  owner: string;
  ownerPts: number;
  color: string;
  reported: number;
  images: string[];
  description?: string;
}

export interface User {
  id: string;
  username: string;
  points: number;
  capsListed: number;
  verified: boolean;
}

export interface Message {
  id: number;
  from: string;
  text: string;
  time: string;
  mine: boolean;
}