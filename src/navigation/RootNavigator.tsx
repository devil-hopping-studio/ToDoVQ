import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { SidebarDrawer } from '../components/navigation/SidebarDrawer';
import { InboxScreen } from '../screens/InboxScreen';
import { TodayScreen } from '../screens/TodayScreen';
import { useTheme } from '../../src/utils/theme';

export const RootNavigator: React.FC = () => {
  const [currentBucket, setCurrentBucket] = useState('inbox');
  const { isDark } = useTheme();

  const renderScreen = () => {
    switch (currentBucket) {
      case 'today':
        return <TodayScreen />;
      case 'inbox':
      default:
        return <InboxScreen />;
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <View className="flex-1 flex-row">
        <View className="w-64 border-r border-slate-700/10">
          <SidebarDrawer
            currentBucket={currentBucket}
            onSelectBucket={setCurrentBucket}
            onOpenSettings={() => console.log('Open Settings')}
          />
        </View>
        <View className="flex-1">
          {renderScreen()}
        </View>
      </View>
    </SafeAreaView>
  );
};
>
  );
}
