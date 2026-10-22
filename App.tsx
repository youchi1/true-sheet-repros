import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Issue955 from './repros/Issue955';
import Issue956 from './repros/Issue956';
import Issue957 from './repros/Issue957';
import Issue958 from './repros/Issue958';
import Issue959 from './repros/Issue959';
import Issue962 from './repros/Issue962';
import Issue963 from './repros/Issue963';
import { Btn, styles } from './repros/ui';

const repros = {
  '955 (iOS) late footer + keyboard': Issue955,
  '956 (Android) dismiss attempt from header': Issue956,
  '957 (Android) touches during present': Issue957,
  '958 (Android) gap above keyboard': Issue958,
  '959 (Android) extra inset with header + footer': Issue959,
  '962 (iOS) overlay accessibility': Issue962,
  '963 (Android) overlay clips shadows': Issue963,
};

export default function App() {
  const [open, setOpen] = useState<keyof typeof repros | null>(null);
  if (open) {
    const Repro = repros[open];
    return <Repro onBack={() => setOpen(null)} />;
  }
  return (
    <ScrollView contentContainerStyle={[styles.screen, { flexGrow: 1 }]}>
      <Text style={styles.title}>TrueSheet 4.0.0-beta.29 repros</Text>
      {Object.keys(repros).map((name) => (
        <Btn key={name} title={name} onPress={() => setOpen(name as keyof typeof repros)} />
      ))}
    </ScrollView>
  );
}
