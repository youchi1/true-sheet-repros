// Short auto sheet with an absolute footer: while the keyboard is open, the band the sheet keeps
// above the keyboard shows between the content and the footer, not below the footer.
import { TrueSheet, type TrueSheetProps } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Btn, Screen, styles } from './ui';

// padFooter: a spacer the height of the footer ends the content (option 1 in #976).
const VARIANTS: { label: string; props: Partial<TrueSheetProps>; padFooter?: boolean }[] = [
  { label: 'Bug: defaults', props: {} },
  { label: 'insetAdjustment="never"', props: { insetAdjustment: 'never' } },
  { label: 'footer keyboardOffset 28', props: { footerOptions: { position: 'absolute', keyboardOffset: 28 } } },
  { label: 'contentInsetAdjustment "never"', props: { scrollableOptions: { contentInsetAdjustment: 'never' } } },
  { label: 'footer avoidKeyboard false', props: { footerOptions: { position: 'absolute', avoidKeyboard: false } } },
  {
    label: '#976 option 1: safe-area + footer pad',
    props: { scrollableOptions: { contentInsetAdjustment: 'safe-area' } },
    padFooter: true,
  },
  { label: '#976 option 3: style flex 1', props: { style: { flex: 1 } } },
];

export default function ShortFooter({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [variant, setVariant] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  // Plain: one background color, as a real form sheet has, so only the extra space shows.
  const [plain, setPlain] = useState(false);
  const present = (index: number) => {
    setVariant(index);
    requestAnimationFrame(() => sheet.current?.present());
  };
  return (
    <Screen title="Short sheet + absolute footer + keyboard" onBack={onBack}>
      <Text>1. Present "Bug". 2. Focus the input.</Text>
      <Text>Bug: a red band (the sheet background) opens between the white content and the green footer. Closed keyboard: no band.</Text>
      <Btn title={plain ? 'Colors: plain (tap for debug)' : 'Colors: debug (tap for plain)'} onPress={() => setPlain(!plain)} />
      {VARIANTS.map((v, i) => (
        <Btn key={v.label} title={v.label} onPress={() => present(i)} />
      ))}
      <TrueSheet
        key={`${variant}-${plain}`}
        ref={sheet}
        detents={['auto']}
        backgroundColor={plain ? '#fff' : '#fca5a5'}
        scrollableRef={scrollRef}
        footerOptions={{ position: 'absolute' }}
        footer={
          plain ? (
            <View style={{ padding: 16 }} onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}>
              <Btn title="Save" onPress={() => {}} />
            </View>
          ) : (
            <View style={styles.footer} onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}>
              <Text>FOOTER</Text>
            </View>
          )
        }
        {...VARIANTS[variant].props}
      >
        <ScrollView ref={scrollRef} style={{ backgroundColor: '#fff' }}>
          <TextInput testID="input" placeholder="Focus me" style={styles.input} />
          <Text style={styles.row}>End of content</Text>
          {VARIANTS[variant].padFooter ? (
            <View style={{ height: footerHeight, backgroundColor: plain ? undefined : '#fde68a' }} />
          ) : null}
        </ScrollView>
      </TrueSheet>
    </Screen>
  );
}
