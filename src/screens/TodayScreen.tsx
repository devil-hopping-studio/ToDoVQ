import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/theme';
import { useTaskStore } from '../services/database/taskStore';
import { formatTaskDate, formatTaskTime } from '../utils/regionalFormatters';

export const TodayScreen: React.FC = () => {
  const { isDark } = useTheme();
  const { tasks, region, toggleComplete } = useTaskStore();

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const todayTasks = tasks.filter(
    (t) => !t.isCompleted && t.dueDate && t.dueDate <= endOfToday.getTime()
  );

  return (
    <View className={`flex-1 p-4 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
        Due Today & Overdue ({todayTasks.length})
      </Text>

      <FlatList
        data={todayTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleComplete(item.id)}
            className={`p-4 rounded-xl mb-3 ${
              isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
            }`}
          >
            <Text className={`font-semibold text-base ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
              {item.title}
            </Text>
            {item.dueDate && (
              <Text className={`text-xs mt-1 ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
                Due: {formatTaskDate(item.dueDate, region)} at {formatTaskTime(item.dueDate, region)}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
