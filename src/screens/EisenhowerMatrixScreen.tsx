import { StyleSheet, Text, View } from 'react-native';

export function EisenhowerMatrixScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eisenhower Matrix</Text>
      <Text style={styles.subtitle}>Prioritize tasks by urgency and importance.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#64748b', fontSize: 16, lineHeight: 24 },
});
