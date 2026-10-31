import { StyleSheet, Text, View } from 'react-native';

export function InboxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <Text style={styles.subtitle}>
        Capture tasks quickly and organize them when you are ready.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#64748b', fontSize: 16, lineHeight: 24 },
});
