// Android: touches reach the views behind a sheet while it presents.
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { Btn, Screen, styles } from './ui';

export default function Issue957({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const [taps, setTaps] = useState(0);
  return (
    <Screen title="#957 touches during present (Android)" onBack={onBack}>
      <Pressable accessibilityLabel="behind" onPress={() => setTaps((n) => n + 1)} style={{ backgroundColor: '#fecaca', padding: 24 }}>
        <Text>BEHIND THE SHEET. Taps: {taps}</Text>
      </Pressable>
      <Text>Tap "Present", then right away tap the red box. While the sheet slides up, the tap reaches the red box (taps +1).</Text>
      <Text>Easier: focus the input first. The present then waits for the keyboard to close, and taps in that time also reach the red box.</Text>
      <TextInput testID="input" placeholder="Optional: focus me first" style={[styles.input, { margin: 0 }]} />
      <Btn title="Present" onPress={() => sheet.current?.present()} />
      <TrueSheet ref={sheet} detents={[0.4]}>
        <Text style={{ padding: 24 }}>Sheet</Text>
      </TrueSheet>
    </Screen>
  );
}
