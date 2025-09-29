import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { QUICK_LOG_ENTRIES } from '../constants';

interface QuickLogMenuProps {
  onOpen: () => void;
}

const QuickLogMenu: React.FC<QuickLogMenuProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const handleEntryClick = (entryType: string) => {
    setSelectedEntry(entryType);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (selectedEntry && value) {
      // Here would be the actual logging logic
      console.log('Logging:', selectedEntry, value);
      setSelectedEntry(null);
      setValue('');
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          onOpen();
        }}
        className="flex items-center space-x-2 rounded-xl bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>빠른 기록</span>
      </button>

      {/* Quick Log Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 z-50 w-64 rounded-2xl bg-slate-800 shadow-2xl ring-1 ring-gray-700">
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-100">빠른 기록</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {QUICK_LOG_ENTRIES.map((entry) => (
                <button
                  key={entry.type}
                  onClick={() => handleEntryClick(entry.type)}
                  className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{entry.icon}</span>
                    <span className="text-sm text-gray-300">{entry.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{entry.unit}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Entry Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900/75" onClick={() => setSelectedEntry(null)} />
          
          <div className="relative w-full max-w-sm rounded-2xl bg-slate-800 p-6 shadow-2xl ring-1 ring-gray-700">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-100">
                {QUICK_LOG_ENTRIES.find(e => e.type === selectedEntry)?.label} 기록
              </h3>
              <p className="text-sm text-gray-400">지금 상태를 입력해주세요</p>
            </div>

            <div className="mb-6">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="값 입력"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-lg text-gray-100 focus:border-emerald-500 focus:outline-none"
                autoFocus
              />
              <div className="mt-2 text-right text-sm text-gray-400">
                {QUICK_LOG_ENTRIES.find(e => e.type === selectedEntry)?.unit}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedEntry(null)}
                className="flex-1 rounded-xl border border-gray-600 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={!value}
                className="flex-1 rounded-xl bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
              >
                기록
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickLogMenu;