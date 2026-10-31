import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SUPPORTED_REGIONS, RegionConfig } from '../../utils/regionalFormatters';
import { useTheme } from '../../utils/theme';

interface RegionalFlagPickerProps {
  selectedRegion: RegionConfig;
  onSelectRegion: (region: RegionConfig) => void;
}

export const RegionalFlagPicker: React.FC<RegionalFlagPickerProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme();

  const filteredRegions = SUPPORTED_REGIONS.filter(
    (reg) =>
      reg.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.countryCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className={`p-6 rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'}`}>
      <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
        Regional & Date Settings
      </Text>
      <Text className={`text-sm mb-4 ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
        Select your country to govern date ordering and time formatting.
      </Text>

      <TextInput
        placeholder="Search country..."
        placeholderTextColor={isDark ? '#9CA3AF' : '#64748B'}
        value={searchQuery}
        onChangeText={setSearchQuery}
        className={`px-4 py-3 rounded-xl mb-4 text-sm ${
          isDark
            ? 'bg-dark-bg text-dark-text border border-dark-border'
            : 'bg-light-bg text-light-text border border-light-border'
        }`}
      />

      <FlatList
        data={filteredRegions}
        keyExtractor={(item) => item.countryCode}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const isSelected = selectedRegion.countryCode === item.countryCode;
          return (
            <TouchableOpacity
              onPress={() => onSelectRegion(item)}
              className={`flex-row items-center justify-between px-4 py-3 rounded-xl mb-2 ${
                isSelected
                  ? 'bg-brand-primary/10 border border-brand-primary/30'
                  : 'transparent'
              }`}
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">{item.flagEmoji}</Text>
                <View>
                  <Text className={`font-semibold ${isSelected ? 'text-brand-primary' : isDark ? 'text-dark-text' : 'text-light-text'}`}>
                    {item.countryName}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
                    {item.dateFormat} • {item.timeFormat}
                  </Text>
                </View>
              </View>
              {isSelected && <Text className="text-brand-primary font-bold">Active</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
