import { useState, useEffect, useCallback } from 'react';
import { ThemeMode, NavigationTab, SyncStatus } from './types';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  return { theme, toggleTheme };
};

export const useKeyboard = () => {
  const [currentKeys, setCurrentKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setCurrentKeys(prev => new Set([...prev, e.code]));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setCurrentKeys(prev => {
        const updated = new Set(prev);
        updated.delete(e.code);
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const isShortcutPressed = useCallback((keys: string[]) => {
    return keys.every(key => currentKeys.has(key));
  }, [currentKeys]);

  return { isShortcutPressed };
};

export const useNavigation = (initialTab: NavigationTab = 'dashboard') => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>(initialTab);

  const navigateToTab = useCallback((tab: NavigationTab) => {
    setCurrentTab(tab);
  }, []);

  return { currentTab, navigateToTab };
};

export const useSyncStatus = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    status: 'synced',
    lastSyncedAt: '2025-01-27 09:30'
  });

  const updateSyncStatus = useCallback((status: SyncStatus) => {
    setSyncStatus(status);
  }, []);

  return { syncStatus, updateSyncStatus };
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
};