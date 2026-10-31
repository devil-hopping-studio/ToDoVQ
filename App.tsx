import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeContext, ThemeMode } from './src/utils/theme';
import { TaskStoreProvider } from './src/services/database/taskStore';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <TaskStoreProvider>
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </SafeAreaView>
      </TaskStoreProvider>
    </ThemeContext.Provider>
  );
}
