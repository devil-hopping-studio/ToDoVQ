import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/theme';
import { InboxScreen } from '../screens/InboxScreen';
import { TodayScreen } from '../screens/TodayScreen';
import { EisenhowerMatrixScreen } from '../screens/EisenhowerMatrixScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { PermissionWizardScreen } from '../screens/PermissionWizardScreen';

type ScreenTab = 'inbox' | 'today' | 'matrix' | 'settings';

export const RootNavigator: React.FC = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [hasCompletedPermissions, setHasCompletedPermissions] = useState(true);
  const [activeTab, setActiveTab] = useState<ScreenTab>('inbox');
  const { isDark } = useTheme();

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  if (!hasCompletedPermissions) {
    return <PermissionWizardScreen onComplete={() => setHasCompletedPermissions(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'today':
        return <TodayScreen />;
      case 'matrix':
        return <EisenhowerMatrixScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'inbox':
      default:
        return <InboxScreen />;
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {/* Top Bar */}
      <View
        className={`px-4 py-3 flex-row justify-between items-center border-b ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border'
        }`}
      >
        <Text className={`text-lg font-extrabold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          ToDoVQ
        </Text>
        <TouchableOpacity onPress={() => setHasCompletedOnboarding(false)}>
          <Text className="text-xs text-brand-primary font-semibold">Tour</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1">{renderScreen()}</View>

      {/* Bottom GTD Navigation Bar */}
      <View
        className={`flex-row justify-around py-3 border-t ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border'
        }`}
      >
        {(
          [
            { key: 'inbox', label: '📥 GTD Buckets' },
            { key: 'today', label: '☀️ Today' },
            { key: 'matrix', label: '⊞ Matrix' },
            { key: 'settings', label: '⚙️ Settings' },
          ] as { key: ScreenTab; label: string }[]
        ).map((tab) => (
          <TouchableOpacity key={tab.key} onPress={() => setActiveTab(tab.key)} className="px-3 py-1">
            <Text
              className={`text-xs font-bold ${
                activeTab === tab.key
                  ? 'text-brand-primary'
                  : isDark
                  ? 'text-dark-subtext'
                  : 'text-light-subtext'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
