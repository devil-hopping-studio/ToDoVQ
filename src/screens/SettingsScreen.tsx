import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/theme';
import { useTaskStore } from '../services/database/taskStore';
import { RegionalFlagPicker } from '../components/settings/RegionalFlagPicker';
import { exportTasksToICS } from '../services/calendar/calendarSyncService';

export const SettingsScreen: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { region, setRegion, tasks, exportBackupJSON } = useTaskStore();
  const [exportPreview, setExportPreview] = useState<string | null>(null);

  return (
    <ScrollView className={`flex-1 p-4 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <View
        className={`p-5 rounded-2xl mb-4 flex-row justify-between items-center ${
          isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
        }`}
      >
        <View>
          <Text className={`text-base font-bold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
            Appearance Mode
          </Text>
          <Text className={`text-xs ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
            Current theme: {isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          className="px-4 py-2 rounded-xl bg-brand-primary"
        >
          <Text className="text-white font-semibold text-xs">Toggle Theme</Text>
        </TouchableOpacity>
      </View>

      <RegionalFlagPicker selectedRegion={region} onSelectRegion={setRegion} />

      <View
        className={`p-5 rounded-2xl mt-4 mb-8 ${
          isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
        }`}
      >
        <Text className={`text-base font-bold mb-2 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          100% Local Data Backup & Sync
        </Text>
        <View className="flex-row mt-2">
          <TouchableOpacity
            onPress={() => setExportPreview(exportBackupJSON())}
            className="px-4 py-3 rounded-xl bg-brand-primary mr-3"
          >
            <Text className="text-white text-xs font-bold">Export JSON</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setExportPreview(exportTasksToICS(tasks))}
            className="px-4 py-3 rounded-xl bg-brand-secondary"
          >
            <Text className="text-white text-xs font-bold">Export Calendar (.ICS)</Text>
          </TouchableOpacity>
        </View>
        {exportPreview && (
          <View className="mt-4 p-3 rounded-xl bg-black/30">
            <Text className="text-xs font-mono text-emerald-400" numberOfLines={8}>
              {exportPreview}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
