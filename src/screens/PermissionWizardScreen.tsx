import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/theme';

interface PermissionStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  permissionType: 'notifications' | 'location' | 'microphone';
}

const PERMISSION_STEPS: PermissionStep[] = [
  {
    id: '1',
    title: 'Task Notifications',
    description: 'Get timely reminders for due tasks and background synchronization updates.',
    icon: '🔔',
    permissionType: 'notifications',
  },
  {
    id: '2',
    title: 'Proximity Geofencing',
    description: 'Enable location monitoring to trigger location-based task reminders when arriving at saved addresses.',
    icon: '📍',
    permissionType: 'location',
  },
  {
    id: '3',
    title: 'Voice-to-Text Microphone',
    description: 'Speak your tasks naturally. Audio is parsed securely and locally on your device.',
    icon: '🎙️',
    permissionType: 'microphone',
  },
];

interface PermissionWizardScreenProps {
  onComplete: () => void;
}

export const PermissionWizardScreen: React.FC<PermissionWizardScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { isDark } = useTheme();

  const currentStep = PERMISSION_STEPS[currentStepIndex];

  const handleRequestPermission = async () => {
    if (currentStepIndex < PERMISSION_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (currentStepIndex < PERMISSION_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <View className={`flex-1 items-center justify-between p-8 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <View className="flex-1 justify-center items-center w-full max-w-sm">
        <Text className="text-6xl mb-6">{currentStep.icon}</Text>
        <Text className={`text-2xl font-bold text-center mb-3 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          {currentStep.title}
        </Text>
        <Text className={`text-center text-base leading-relaxed mb-8 ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
          {currentStep.description}
        </Text>

        <View className="flex-row justify-center mb-4">
          {PERMISSION_STEPS.map((_, index) => {
            const isActive = currentStepIndex === index;
            return (
              <View
                key={index}
                className={`h-2 rounded-full mx-1 ${
                  isActive ? 'w-6 bg-brand-primary' : 'w-2 bg-slate-600/40'
                }`}
              />
            );
          })}
        </View>
      </View>

      <View className="w-full pb-8">
        <TouchableOpacity
          onPress={handleRequestPermission}
          className="w-full py-4 rounded-xl bg-brand-primary items-center justify-center mb-3 shadow-lg shadow-brand-primary/30"
        >
          <Text className="text-white font-semibold text-base">Allow Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSkip}
          className="w-full py-3 rounded-xl items-center justify-center"
        >
          <Text className={`font-medium text-sm ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
