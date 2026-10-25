// iOS: content that almost fits above the keyboard and an absolute footer gets no keyboard inset,
// so its end stays under the footer and cannot scroll into view.
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Btn, Screen, styles } from './ui';

// Filler heights for an iPhone 17 Pro (iOS 26.5). The bug shows while content + footer is up
// to the bottom safe area (34pt) taller than the room above the keyboard.
const FILLERS = [
  { label: 'Bug: 320pt filler', height: 320 },
  { label: 'Control, fits: 280pt filler', height: 280 },
  { label: 'Control, scrolls: 344pt filler', height: 344 },
];

export default function AlmostFits({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [filler, setFiller] = useState(FILLERS[0].height);
  const present = (height: number) => {
    setFiller(height);
    requestAnimationFrame(() => sheet.current?.present());
  };
  return (
    <Screen title="Almost fits above the keyboard (iOS)" onBack={onBack}>
      <Text>1. Present "Bug". 2. Focus the input. 3. Try to scroll to "LAST ROW".</Text>
      <Text>Bug: "LAST ROW" stays under the footer and the content does not scroll.</Text>
      <Text>Controls: with less filler the row fits above the footer; with more, the content scrolls and the row ends above the footer.</Text>
      {FILLERS.map((f) => (
        <Btn key={f.height} title={f.label} onPress={() => present(f.height)} />
      ))}
      <TrueSheet
        ref={sheet}
        detents={[1]}
        style={{ flexGrow: 1 }}
        scrollableRef={scrollRef}
        footerOptions={{ position: 'absolute' }}
        footer={
          <View style={[styles.footer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>FOOTER</Text>
            <Pressable testID="close" onPress={() => sheet.current?.dismiss()}>
              <Text>Close</Text>
            </Pressable>
          </View>
        }
      >
        <ScrollView ref={scrollRef} style={{ flex: 1, backgroundColor: '#fca5a5' }}>
          <TextInput testID="input" placeholder="Focus me" style={styles.input} />
          <View style={{ height: filler, margin: 16, backgroundColor: '#fff' }} />
          <Text testID="last-row" style={[styles.row, { backgroundColor: '#fde68a' }]}>LAST ROW</Text>
        </ScrollView>
      </TrueSheet>
    </Screen>
  );
}
