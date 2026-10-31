import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EisenhowerMatrixScreen } from '../screens/EisenhowerMatrixScreen';
import { InboxScreen } from '../screens/InboxScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TodayScreen } from '../screens/TodayScreen';

export type RootStackParamList = {
  Inbox: undefined;
  Today: undefined;
  EisenhowerMatrix: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inbox">
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen
        name="EisenhowerMatrix"
        component={EisenhowerMatrixScreen}
        options={{ title: 'Eisenhower Matrix' }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
