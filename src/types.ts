export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface KPIData {
  steps: number;
  kcal: number;
  hrAvg: number;
  sleep: number;
  water: number;
  weight: number;
  weightDelta: number;
}

export interface SyncStatus {
  status: 'synced' | 'pending' | 'error';
  lastSyncedAt: string;
}

export interface DeviceConnection {
  provider: string;
  logo: string;
  connected: boolean;
  lastSync?: string;
  dataTypes: string[];
  status: 'connected' | 'disconnected' | 'error';
}

export interface Goal {
  id: string;
  title: string;
  category: 'weight' | 'exercise' | 'sleep' | 'nutrition';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  reminder: boolean;
  frequency: string;
}

export interface HospitalRecord {
  id: string;
  fileName: string;
  size: string;
  uploadedAt: string;
  status: 'uploaded' | 'analyzed' | 'error';
  type: 'pdf' | 'image' | 'json';
  thumbnail?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface QuickLogEntry {
  type: 'exercise' | 'meal' | 'weight' | 'water' | 'blood_pressure';
  label: string;
  icon: string;
  unit: string;
}

export type ThemeMode = 'dark' | 'light';

export type NavigationTab = 'dashboard' | 'ai' | 'goals' | 'community' | 'reports' | 'analytics' | 'settings';