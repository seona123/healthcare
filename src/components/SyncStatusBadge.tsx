import React from 'react';
import { Wifi, WifiOff, AlertCircle, Check } from 'lucide-react';
import { useSyncStatus } from '../hooks';

const SyncStatusBadge: React.FC = () => {
  const { syncStatus } = useSyncStatus();

  const getStatusConfig = () => {
    switch (syncStatus.status) {
      case 'synced':
        return {
          icon: Check,
          color: 'text-emerald-400',
          bgColor: 'bg-emerald-500/20',
          label: '동기화 완료'
        };
      case 'pending':
        return {
          icon: Wifi,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          label: '동기화 중'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          label: '동기화 오류'
        };
      default:
        return {
          icon: WifiOff,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          label: '연결 안됨'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="group relative">
      <div className={`flex items-center space-x-2 rounded-lg px-2 py-1 ${config.bgColor}`}>
        <Icon className={`h-3 w-3 ${config.color} ${syncStatus.status === 'pending' ? 'animate-pulse' : ''}`} />
        <span className="text-xs font-medium text-gray-300">
          {syncStatus.status === 'synced' ? '●' : syncStatus.status === 'pending' ? '◐' : '○'}
        </span>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 mb-2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-xs text-gray-200 px-2 py-1 rounded-md whitespace-nowrap">
        <div>{config.label}</div>
        <div className="text-gray-400">마지막: {syncStatus.lastSyncedAt}</div>
      </div>
    </div>
  );
};

export default SyncStatusBadge;