import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { MOCK_DEVICE_CONNECTIONS } from '../constants';

interface DeviceConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeviceConnectModal: React.FC<DeviceConnectModalProps> = ({ isOpen, onClose }) => {
  const [connections, setConnections] = useState(MOCK_DEVICE_CONNECTIONS);

  const handleConnect = (provider: string) => {
    setConnections(prev => prev.map(conn => 
      conn.provider === provider 
        ? { ...conn, connected: true, status: 'connected' as const, lastSync: new Date().toLocaleString() }
        : conn
    ));
  };

  const handleDisconnect = (provider: string) => {
    setConnections(prev => prev.map(conn => 
      conn.provider === provider 
        ? { ...conn, connected: false, status: 'disconnected' as const, lastSync: undefined }
        : conn
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-800 shadow-2xl ring-1 ring-gray-700 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">데이터 연동 관리</h2>
            <p className="mt-1 text-sm text-gray-400">
              건강 데이터를 자동으로 수집하고 동기화하세요
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {connections.map((connection) => (
              <div
                key={connection.provider}
                className="rounded-2xl border border-gray-700 bg-slate-900/50 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{connection.logo}</div>
                    <div>
                      <h3 className="font-medium text-gray-100">{connection.provider}</h3>
                      <p className="text-xs text-gray-400">
                        {connection.dataTypes.join(', ')}
                      </p>
                    </div>
                  </div>
                  {getStatusIcon(connection.status)}
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-300 mb-2">수집 데이터</div>
                  <div className="flex flex-wrap gap-2">
                    {connection.dataTypes.map((dataType) => (
                      <span
                        key={dataType}
                        className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300"
                      >
                        {dataType}
                      </span>
                    ))}
                  </div>
                </div>

                {connection.connected && connection.lastSync && (
                  <div className="mb-4 text-xs text-gray-400">
                    마지막 동기화: {connection.lastSync}
                  </div>
                )}

                <div className="flex space-x-2">
                  {connection.connected ? (
                    <>
                      <button
                        onClick={() => handleDisconnect(connection.provider)}
                        className="flex-1 rounded-lg border border-red-600 py-2 text-sm font-medium text-red-400 hover:bg-red-600/10"
                      >
                        연결 해제
                      </button>
                      <button className="rounded-lg border border-gray-600 px-3 py-2 text-gray-400 hover:text-gray-300">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnect(connection.provider)}
                      className="flex-1 rounded-lg bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                    >
                      연결하기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-700 bg-slate-900/50 p-6">
              <h3 className="font-medium text-gray-100 mb-3">직접 업로드</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button className="rounded-lg border border-gray-600 p-3 text-left hover:bg-gray-700">
                  <div className="text-sm font-medium text-gray-300">CSV 파일</div>
                  <div className="text-xs text-gray-400">수면, 식단 기록</div>
                </button>
                <button className="rounded-lg border border-gray-600 p-3 text-left hover:bg-gray-700">
                  <div className="text-sm font-medium text-gray-300">API 토큰</div>
                  <div className="text-xs text-gray-400">고급 사용자</div>
                </button>
                <button className="rounded-lg border border-gray-600 p-3 text-left hover:bg-gray-700">
                  <div className="text-sm font-medium text-gray-300">병원 기록</div>
                  <div className="text-xs text-gray-400">PDF, 이미지</div>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-600 bg-yellow-500/10 p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="text-sm text-yellow-200">
                  <div className="font-medium mb-1">보안 및 프라이버시</div>
                  <div className="text-yellow-300/80">
                    모든 건강 데이터는 암호화되어 저장되며, 사용자가 명시적으로 동의한 경우에만 AI 분석에 활용됩니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceConnectModal;