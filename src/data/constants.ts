import { Cap } from '../types';

export const LEVELS = [
  { name: 'BRONCE', icon: '🥉', min: 0,    max: 499,   color: '#E8A838' },
  { name: 'PLATA',  icon: '🥈', min: 500,  max: 1499,  color: '#C8D8E8' },
  { name: 'ORO',    icon: '🥇', min: 1500, max: 3999,  color: '#FFD700' },
  { name: 'ÉLITE',  icon: '💎', min: 4000, max: 99999, color: '#E040FB' },
];

export const CONDITIONS = [
  { label: 'Nueva con etiqueta', pts: 70, color: '#00E5A0' },
  { label: 'Como nueva',         pts: 50, color: '#00B8FF' },
  { label: 'Buen estado',        pts: 30, color: '#FFD700' },
  { label: 'Regular',            pts: 15, color: '#FF9800' },
  { label: 'Para reparar',       pts: 5,  color: '#FF5252' },
];

export const SAFE_SPOTS = [
  { name: 'El Hueco',  address: 'Cr 52 #50-50, Centro',     metro: 'Parque Berrío' },
  { name: 'Unicentro', address: 'Cr 65 #45-90',             metro: 'Estadio'       },
  { name: 'Oviedo',    address: 'Cr 43A #6Sur-15, Poblado', metro: 'El Poblado'    },
  { name: 'Santa Fe',  address: 'Cr 43A #7Sur-170',         metro: 'Industriales'  },
];

export const COLORS = {
  bg: '#070710',
  surface: '#111122',
  border: 'rgba(255,255,255,0.08)',
  gold: '#FFD700',
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.4)',
};