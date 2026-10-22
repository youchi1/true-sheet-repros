// Android: scrollable gets extra bottom inset with a header and an absolute footer while the keyboard is open.
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Btn, Screen, rows, styles } from './ui';

export default function Issue959({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  return (
    <Screen title="#959 extra inset, header + footer + keyboard (Android)" onBack={onBack}>
      <Text>1. Present. 2. Focus the input. 3. Scroll to the end. Blank space shows between "Row 49 (last)" and the footer.</Text>
      <Text>Control: without the keyboard, the last row ends right above the footer.</Text>
      <Btn title="Present" onPress={() => sheet.current?.present()} />
      <TrueSheet
        ref={sheet}
        detents={[1]}
        scrollableRef={scrollRef}
        header={<View style={styles.header}><Text>HEADER</Text></View>}
        footerOptions={{ position: 'absolute' }}
        footer={<View style={styles.footer}><Text>FOOTER</Text></View>}
      >
        <ScrollView ref={scrollRef} style={{ backgroundColor: '#fca5a5' }}>
          <TextInput testID="input" placeholder="Focus me" style={styles.input} />
          {rows.map((i) => (
            <Text key={i} style={[styles.row, { backgroundColor: '#fff' }]}>Row {i}{i === rows.length - 1 ? ' (last)' : ''}</Text>
          ))}
        </ScrollView>
      </TrueSheet>
    </Screen>
  );
}
