import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../utils/theme';
import { useTaskStore } from '../../services/database/taskStore';

export const QuickCaptureBar: React.FC = () => {
  const [input, setInput] = useState('');
  const { isDark } = useTheme();
  const { addTaskFromNLP } = useTaskStore();

  const handleSubmit = () => {
    if (!input.trim()) return;
    addTaskFromNLP(input);
    setInput('');
  };

  return (
    <View className="flex-row items-center mb-4">
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSubmit}
        placeholder="e.g. Call client tomorrow every 2 weeks !high #sales"
        placeholderTextColor={isDark ? '#9CA3AF' : '#64748B'}
        className={`flex-1 px-4 py-3 rounded-xl mr-2 text-sm ${
          isDark
            ? 'bg-dark-card text-dark-text border border-dark-border'
            : 'bg-light-card text-light-text border border-light-border'
        }`}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="px-4 py-3 rounded-xl bg-brand-primary items-center justify-center"
      >
        <Text className="text-white font-bold text-sm">+ Add</Text>
      </TouchableOpacity>
    </View>
  );
};
