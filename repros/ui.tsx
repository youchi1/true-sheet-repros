import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function Btn({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
}

export function Screen({ title, onBack, children }: { title: string; onBack: () => void; children: ReactNode }) {
  return (
    <View style={styles.screen}>
      <Btn title="< Back to list" onPress={onBack} />
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

export const rows = Array.from({ length: 50 }, (_, i) => i);

export const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 64, paddingHorizontal: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '600' },
  btn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 8, padding: 12, margin: 16, backgroundColor: '#fff' },
  row: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc' },
  header: { padding: 24, backgroundColor: '#fde68a' },
  footer: { padding: 16, backgroundColor: '#bbf7d0' },
});
