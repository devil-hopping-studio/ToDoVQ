import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/theme';
import { useTaskStore } from '../services/database/taskStore';
import { EisenhowerQuadrant } from '../models/Task';

const QUADRANTS: { key: EisenhowerQuadrant; title: string; subtitle: string; badgeClass: string }[] = [
  { key: 'do_first', title: '1. Do First', subtitle: 'Urgent & Important', badgeClass: 'border-red-500' },
  { key: 'schedule', title: '2. Schedule', subtitle: 'Important, Not Urgent', badgeClass: 'border-blue-500' },
  { key: 'delegate', title: '3. Delegate', subtitle: 'Urgent, Not Important', badgeClass: 'border-amber-500' },
  { key: 'eliminate', title: '4. Eliminate', subtitle: 'Neither Urgent Nor Important', badgeClass: 'border-slate-500' },
];

export const EisenhowerMatrixScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { tasks, toggleComplete } = useTaskStore();

  return (
    <ScrollView className={`flex-1 p-4 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <View className="flex-row flex-wrap justify-between">
        {QUADRANTS.map((q) => {
          const qTasks = tasks.filter((t) => !t.isCompleted && t.quadrant === q.key);
          return (
            <View
              key={q.key}
              className={`w-full mb-4 p-4 rounded-2xl border-l-4 ${q.badgeClass} ${
                isDark ? 'bg-dark-card' : 'bg-light-card'
              }`}
            >
              <Text className={`text-base font-bold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                {q.title} ({qTasks.length})
              </Text>
              <Text className={`text-xs mb-3 ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
                {q.subtitle}
              </Text>

              {qTasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  onPress={() => toggleComplete(task.id)}
                  className="py-2 border-b border-slate-700/20 flex-row justify-between items-center"
                >
                  <Text className={`text-sm ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                    • {task.title}
                  </Text>
                  <Text className="text-xs text-brand-primary">Done</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
