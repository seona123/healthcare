import React from 'react';
import { Search, Bell, Settings, User, Moon, Sun, Activity, Zap } from 'lucide-react';
import { ThemeMode, NavigationTab } from '../types';
import GlobalSearch from './GlobalSearch';
import QuickLogMenu from './QuickLogMenu';
import SyncStatusBadge from './SyncStatusBadge';

interface AppHeaderProps {
  theme: ThemeMode;
  onThemeToggle: () => void;
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onConnectClick: () => void;
  onQuickLogClick: () => void;
  onSearchOpen: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  theme,
  onThemeToggle,
  currentTab,
  onTabChange,
  onConnectClick,
  onQuickLogClick,
  onSearchOpen
}) => {
  const tabs = [
    { id: 'dashboard', label: '대시보드', shortcut: 'gd' },
    { id: 'ai', label: 'AI 도우미', shortcut: 'ga' },
    { id: 'goals', label: '목표관리', shortcut: 'gg' },
    { id: 'community', label: '커뮤니티', shortcut: 'gc' },
    { id: 'reports', label: '리포트', shortcut: 'gr' },
    { id: 'settings', label: '설정', shortcut: 'gs' }
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-slate-900/90 backdrop-blur-md">
      {/* Main Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-100">Health Autonomy</span>
          </div>

          {/* Global Search */}
          <div className="flex-1 max-w-lg mx-8">
            <GlobalSearch onOpen={onSearchOpen} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <QuickLogMenu onOpen={onQuickLogClick} />
            
            <button
              onClick={onConnectClick}
              className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>연동</span>
            </button>

            <SyncStatusBadge />

            <button className="relative rounded-full p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={onThemeToggle}
                className="rounded-full p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Tab Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as NavigationTab)}
                className={`relative py-4 px-1 text-sm font-medium transition-colors ${
                  currentTab === tab.id
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {currentTab === tab.id && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-400"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;