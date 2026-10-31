import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, View, Dimensions } from 'react-native';
import { useTheme } from '../../utils/theme';

interface RefreshableContainerProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}

export const RefreshableContainer: React.FC<RefreshableContainerProps> = ({
  children,
  onRefresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );
  const { isDark } = useTheme();

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });
    return () => subscription?.remove();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={isDark ? '#F3F4F6' : '#0F172A'}
            colors={['#6366F1']}
          />
        }
      >
        <View className={`flex-1 ${orientation === 'landscape' ? 'flex-row flex-wrap' : 'flex-col'}`}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};
