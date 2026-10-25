// Short auto sheet with an absolute footer: while the keyboard is open, the band the sheet keeps
// above the keyboard shows between the content and the footer, not below the footer.
import { TrueSheet, type TrueSheetProps } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Btn, Screen, styles } from './ui';

const VARIANTS: { label: string; props: Partial<TrueSheetProps> }[] = [
  { label: 'Bug: defaults', props: {} },
  { label: 'insetAdjustment="never"', props: { insetAdjustment: 'never' } },
  { label: 'footer keyboardOffset 28', props: { footerOptions: { position: 'absolute', keyboardOffset: 28 } } },
  { label: 'contentInsetAdjustment "never"', props: { scrollableOptions: { contentInsetAdjustment: 'never' } } },
  { label: 'footer avoidKeyboard false', props: { footerOptions: { position: 'absolute', avoidKeyboard: false } } },
];

export default function ShortFooter({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [variant, setVariant] = useState(0);
  const present = (index: number) => {
    setVariant(index);
    requestAnimationFrame(() => sheet.current?.present());
  };
  return (
    <Screen title="Short sheet + absolute footer + keyboard" onBack={onBack}>
      <Text>1. Present "Bug". 2. Focus the input.</Text>
      <Text>Bug: a red band (the sheet background) opens between the white content and the green footer. Closed keyboard: no band.</Text>
      {VARIANTS.map((v, i) => (
        <Btn key={v.label} title={v.label} onPress={() => present(i)} />
      ))}
      <TrueSheet
        key={variant}
        ref={sheet}
        detents={['auto']}
        backgroundColor="#fca5a5"
        scrollableRef={scrollRef}
        footerOptions={{ position: 'absolute' }}
        footer={
          <View style={styles.footer}>
            <Text>FOOTER</Text>
          </View>
        }
        {...VARIANTS[variant].props}
      >
        <ScrollView ref={scrollRef} style={{ backgroundColor: '#fff' }}>
          <TextInput testID="input" placeholder="Focus me" style={styles.input} />
          <Text style={styles.row}>End of content</Text>
        </ScrollView>
      </TrueSheet>
    </Screen>
  );
}
