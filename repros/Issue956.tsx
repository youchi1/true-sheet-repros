// Android: no onDismissAttempt for a header or footer drag while the scrollable is scrolled down.
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Btn, Screen, rows, styles } from './ui';

export default function Issue956({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [attempts, setAttempts] = useState(0);
  return (
    <Screen title="#956 dismiss attempt from header (Android)" onBack={onBack}>
      <Text>1. Present. 2. Drag down on the yellow header: attempts +1.</Text>
      <Text>3. Scroll the list down a little. 4. Drag down on the header again: attempts stay the same.</Text>
      <Btn title="Present" onPress={() => sheet.current?.present()} />
      <TrueSheet
        ref={sheet}
        detents={[0.8]}
        dismissible={false}
        onDismissAttempt={() => setAttempts((n) => n + 1)}
        scrollableRef={scrollRef}
        header={
          <View style={[styles.header, { gap: 12 }]}>
            <Text>HEADER: drag me down. Attempts: {attempts}</Text>
            <Btn title="Close" onPress={() => sheet.current?.dismiss()} />
          </View>
        }
      >
        <ScrollView ref={scrollRef}>
          {rows.map((i) => <Text key={i} style={styles.row}>Row {i}</Text>)}
        </ScrollView>
      </TrueSheet>
    </Screen>
  );
}
