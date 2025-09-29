import React, { useState } from 'react';
import { useTheme, useNavigation, useToast } from './hooks';
import { useModal } from './hooks';
import AppHeader from './components/AppHeader';
import TopKPIStrip from './components/TopKPIStrip';
import DeviceConnectModal from './components/DeviceConnectModal';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Goals from './pages/Goals';
import Community from './pages/Community';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { MOCK_KPI_DATA } from './constants';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { currentTab, navigateToTab } = useNavigation();
  const { toasts, showToast, removeToast } = useToast();
  const connectModal = useModal();

  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai':
        return <AIAssistant />;
      case 'goals':
        return <Goals />;
      case 'community':
        return <Community />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const handleConnectClick = () => {
    connectModal.openModal();
  };

  const handleQuickLogClick = () => {
    // Quick log menu is handled in the component
  };

  const handleSearchOpen = () => {
    showToast('검색 기능이 활성화되었습니다', 'info');
  };

  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark' 
        ? 'bg-slate-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <AppHeader
        theme={theme}
        onThemeToggle={toggleTheme}
        currentTab={currentTab}
        onTabChange={navigateToTab}
        onConnectClick={handleConnectClick}
        onQuickLogClick={handleQuickLogClick}
        onSearchOpen={handleSearchOpen}
      />
      
      <TopKPIStrip data={MOCK_KPI_DATA} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>

      <DeviceConnectModal
        isOpen={connectModal.isOpen}
        onClose={connectModal.closeModal}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
}

export default App;