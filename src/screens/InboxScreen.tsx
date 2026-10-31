import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../utils/theme';
import { useTaskStore } from '../services/database/taskStore';
import { QuickCaptureBar } from '../components/common/QuickCaptureBar';
import { formatTaskDate, formatTaskTime } from '../utils/regionalFormatters';
import { GTDBucket } from '../models/Task';

const BUCKETS: { key: GTDBucket; label: string }[] = [
  { key: 'inbox', label: 'Inbox' },
  { key: 'next_action', label: 'Next Actions' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'waiting_for', label: 'Waiting' },
  { key: 'someday_maybe', label: 'Someday' },
];

export const InboxScreen: React.FC = () => {
  const [selectedBucket, setSelectedBucket] = useState<GTDBucket>('inbox');
  const { isDark } = useTheme();
  const { tasks, region, toggleComplete, deleteTask } = useTaskStore();

  const filteredTasks = tasks.filter((t) => t.bucket === selectedBucket);

  return (
    <View className={`flex-1 p-4 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <QuickCaptureBar />

      <View className="flex-row mb-4">
        {BUCKETS.map((b) => {
          const active = selectedBucket === b.key;
          return (
            <TouchableOpacity
              key={b.key}
              onPress={() => setSelectedBucket(b.key)}
              className={`px-3 py-2 rounded-lg mr-2 ${
                active ? 'bg-brand-primary' : isDark ? 'bg-dark-card' : 'bg-light-card'
              }`}
            >
              <Text className={`text-xs font-semibold ${active ? 'text-white' : isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
                {b.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className={`p-4 rounded-xl mb-3 flex-row items-center justify-between ${
              isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
            }`}
          >
            <TouchableOpacity onPress={() => toggleComplete(item.id)} className="flex-1 flex-row items-center">
              <View
                className={`w-5 h-5 rounded-md mr-3 border items-center justify-center ${
                  item.isCompleted ? 'bg-brand-secondary border-brand-secondary' : 'border-slate-500'
                }`}
              >
                {item.isCompleted && <Text className="text-white text-xs">✓</Text>}
              </View>
              <View className="flex-1">
                <Text
                  className={`font-semibold text-base ${
                    item.isCompleted ? 'line-through opacity-50' : ''
                  } ${isDark ? 'text-dark-text' : 'text-light-text'}`}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  {item.dueDate && (
                    <Text className={`text-xs mr-2 ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
                      📅 {formatTaskDate(item.dueDate, region)} {formatTaskTime(item.dueDate, region)}
                    </Text>
                  )}
                  {item.recurrence.type === 'repeating' && (
                    <Text className="text-xs text-brand-primary mr-2">
                      🔄 Every {item.recurrence.intervalValue} {item.recurrence.intervalUnit}
                    </Text>
                  )}
                  {item.geofence && (
                    <Text className="text-xs text-brand-accent">📍 {item.geofence.label}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)} className="px-2 py-1">
              <Text className="text-red-500 text-xs font-bold">Del</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
