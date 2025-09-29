import React, { useState } from 'react';
import { Search, Clock, Zap } from 'lucide-react';

interface GlobalSearchProps {
  onOpen: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const recentSearches = [
    '수면 패턴',
    '심박수 트렌드',
    '체중 변화',
    '운동 기록'
  ];

  const quickActions = [
    { label: '대시보드', shortcut: 'gd' },
    { label: '목표 설정', shortcut: 'gg' },
    { label: '연동 관리', shortcut: 'gc' },
    { label: '리포트', shortcut: 'gr' }
  ];

  const handleInputClick = () => {
    setIsOpen(true);
    onOpen();
  };

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          onClick={handleInputClick}
          placeholder="걸음·수면·심박·식단·목표… 무엇을 찾으시나요?"
          className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-2 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <kbd className="inline-flex items-center rounded border border-gray-600 px-1 text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20">
          <div className="fixed inset-0 bg-gray-900/75" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-800 shadow-2xl ring-1 ring-gray-700">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색어 입력..."
                  className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-sm text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="border-t border-gray-700">
              <div className="p-4">
                <div className="mb-4">
                  <div className="mb-2 flex items-center space-x-2 text-xs font-medium text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>최근 검색</span>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full rounded-lg p-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center space-x-2 text-xs font-medium text-gray-400">
                    <Zap className="h-3 w-3" />
                    <span>빠른 이동</span>
                  </div>
                  <div className="space-y-1">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex w-full items-center justify-between rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <span>{action.label}</span>
                        <kbd className="text-xs text-gray-500">{action.shortcut}</kbd>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSearch;