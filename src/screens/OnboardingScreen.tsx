import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { useTheme } from '../utils/theme';

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to ToDoVQ',
    description: 'A local-first, privacy-focused GTD productivity engine built to keep you completely organized.',
    icon: '⚡',
  },
  {
    id: '2',
    title: 'Voice-to-Task & NLP',
    description: 'Speak your tasks naturally. Our client-side parser extracts dates, priorities, and frequencies instantly.',
    icon: '🎙️',
  },
  {
    id: '3',
    title: 'Proximity Geofencing',
    description: 'Never forget an errand. Get location-triggered alerts the moment you arrive near a saved address.',
    icon: '📍',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const { isDark } = useTheme();
  const { width } = Dimensions.get('window');

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < SLIDES.length - 1 && slidesRef.current) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onComplete();
    }
  };

  return (
    <View className={`flex-1 items-center justify-between p-8 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <View className="flex-1 justify-center items-center">
        <FlatList
          data={SLIDES}
          renderItem={({ item }) => (
            <View style={{ width: width - 64 }} className="items-center justify-center px-4">
              <Text className="text-6xl mb-6">{item.icon}</Text>
              <Text className={`text-2xl font-bold text-center mb-3 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                {item.title}
              </Text>
              <Text className={`text-center text-base leading-relaxed ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
                {item.description}
              </Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View className="w-full pb-8">
        <View className="flex-row justify-center mb-6">
          {SLIDES.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                currentIndex === index ? 'w-8 bg-brand-primary' : 'w-2 bg-slate-600/40'
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={scrollToNext}
          className="w-full py-4 rounded-xl bg-brand-primary items-center justify-center"
        >
          <Text className="text-white font-semibold text-base">
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
