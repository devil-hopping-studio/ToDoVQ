import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../utils/theme';

interface SidebarDrawerProps {
  currentBucket: string;
  onSelectBucket: (bucketId: string) => void;
  onOpenSettings: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  currentBucket,
  onSelectBucket,
  onOpenSettings,
}) => {
  const { isDark } = useTheme();

  const systemBuckets = [
    { id: 'inbox', label: 'Inbox', icon: '📥' },
    { id: 'today', label: 'Today', icon: '☀️' },
    { id: 'next_7_days', label: 'Next 7 Days', icon: '📅' },
    { id: 'trash', label: 'Trash', icon: '🗑️' },
  ];

  return (
    <View className={`flex-1 p-6 ${isDark ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}>
      <View className="mb-8 mt-4">
        <Text className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          ToDoVQ
        </Text>
        <Text className={`text-sm ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
          GTD Productivity Engine
        </Text>
      </View>

      <ScrollView className="flex-1">
        <Text className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
          GTD Buckets
        </Text>
        
        {systemBuckets.map((bucket) => {
          const isActive = currentBucket === bucket.id;
          return (
            <TouchableOpacity
              key={bucket.id}
              onPress={() => onSelectBucket(bucket.id)}
              className={`flex-row items-center px-4 py-3 rounded-xl mb-2 ${
                isActive
                  ? 'bg-brand-primary/10 border border-brand-primary/30'
                  : 'transparent'
              }`}
            >
              <Text className="text-lg mr-3">{bucket.icon}</Text>
              <Text
                className={`font-medium ${
                  isActive
                    ? 'text-brand-primary font-semibold'
                    : isDark
                    ? 'text-dark-text'
                    : 'text-light-text'
                }`}
              >
                {bucket.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View className="pt-4 border-t border-slate-700/20">
        <TouchableOpacity
          onPress={onOpenSettings}
          className="flex-row items-center px-4 py-3 rounded-xl"
        >
          <Text className="text-lg mr-3">⚙️</Text>
          <Text className={`font-medium ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
            Settings & Region
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
