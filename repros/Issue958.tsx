// Android: sheet sits too high over the keyboard by the bottom safe-area inset.
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Btn, Screen, styles } from './ui';

export default function Issue958({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  return (
    <Screen title="#958 gap above keyboard (Android)" onBack={onBack}>
      <Text>1. Present. 2. Focus the input. Between the green bar and the keyboard there is a gap as tall as the navigation bar.</Text>
      <Btn title="Present" onPress={() => sheet.current?.present()} />
      <TrueSheet ref={sheet} detents={['auto']} backgroundColor="#fca5a5">
        <View style={{ backgroundColor: '#fff' }}>
          <TextInput testID="input" placeholder="Focus me" style={styles.input} />
          <View style={{ height: 24, backgroundColor: '#22c55e' }}><Text>bottom of content</Text></View>
        </View>
      </TrueSheet>
    </Screen>
  );
}
