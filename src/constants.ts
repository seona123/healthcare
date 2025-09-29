import { DeviceConnection, KPIData, Goal, HospitalRecord, QuickLogEntry } from './types';

export const THEME_COLORS = {
  dark: {
    background: '#0B1220',
    surface: '#0F172A',
    primary: '#10B981',
    secondary: '#2563EB',
    accent: '#7C3AED',
    border: '#1F2937',
    textPrimary: '#E5E7EB',
    textSecondary: '#9CA3AF',
  },
  light: {
    background: '#F9FAFB',
    surface: '#FFFFFF',
    primary: '#059669',
    secondary: '#3B82F6',
    accent: '#8B5CF6',
    border: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
  }
};

export const MOCK_KPI_DATA: KPIData = {
  steps: 8240,
  kcal: 2130,
  hrAvg: 72,
  sleep: 6.8,
  water: 1.6,
  weight: 70.4,
  weightDelta: -0.2
};

export const MOCK_DEVICE_CONNECTIONS: DeviceConnection[] = [
  {
    provider: 'Apple Health',
    logo: '🍎',
    connected: true,
    lastSync: '2025-01-27 07:10',
    dataTypes: ['걸음수', '심박수', '수면', '체중'],
    status: 'connected'
  },
  {
    provider: 'Fitbit',
    logo: '⌚',
    connected: false,
    dataTypes: ['활동', '심박수', '수면'],
    status: 'disconnected'
  },
  {
    provider: 'Garmin',
    logo: '🔗',
    connected: true,
    lastSync: '2025-01-26 22:03',
    dataTypes: ['운동', '심박수', 'GPS'],
    status: 'connected'
  },
  {
    provider: '삼성헬스',
    logo: '📱',
    connected: false,
    dataTypes: ['걸음수', '심박수', '스트레스'],
    status: 'disconnected'
  }
];

export const MOCK_GOALS: Goal[] = [
  {
    id: '1',
    title: '일일 걸음 수',
    category: 'exercise',
    target: 10000,
    current: 8240,
    unit: '걸음',
    deadline: '2025-12-31',
    reminder: true,
    frequency: '매일'
  },
  {
    id: '2',
    title: '목표 체중',
    category: 'weight',
    target: 68,
    current: 70.4,
    unit: 'kg',
    deadline: '2025-06-30',
    reminder: true,
    frequency: '주간'
  },
  {
    id: '3',
    title: '수면 시간',
    category: 'sleep',
    target: 8,
    current: 6.8,
    unit: '시간',
    deadline: '2025-12-31',
    reminder: true,
    frequency: '매일'
  }
];

export const MOCK_HOSPITAL_RECORDS: HospitalRecord[] = [
  {
    id: '1',
    fileName: '진단서_2025-01-12.pdf',
    size: '1.2MB',
    uploadedAt: '2025-01-27 10:15',
    status: 'uploaded',
    type: 'pdf'
  },
  {
    id: '2',
    fileName: '건강검진결과.png',
    size: '0.8MB',
    uploadedAt: '2025-01-20 09:30',
    status: 'analyzed',
    type: 'image'
  }
];

export const QUICK_LOG_ENTRIES: QuickLogEntry[] = [
  { type: 'exercise', label: '운동', icon: '🏃‍♂️', unit: '분' },
  { type: 'meal', label: '식사', icon: '🍽️', unit: 'kcal' },
  { type: 'weight', label: '체중', icon: '⚖️', unit: 'kg' },
  { type: 'water', label: '수분', icon: '💧', unit: 'L' },
  { type: 'blood_pressure', label: '혈압', icon: '🩺', unit: 'mmHg' }
];

export const KEYBOARD_SHORTCUTS = {
  globalSearch: 'Meta+KeyK',
  dashboard: 'KeyG+KeyD',
  ai: 'KeyG+KeyA',
  goals: 'KeyG+KeyG',
  community: 'KeyG+KeyC',
  reports: 'KeyG+KeyR',
  settings: 'KeyG+KeyS',
  quickWeight: 'KeyL+KeyW',
  quickExercise: 'KeyL+KeyE',
  quickMeal: 'KeyL+KeyM',
  quickWater: 'KeyL+KeyH'
};