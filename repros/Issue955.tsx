// iOS: an absolute footer mounted after present stays behind the keyboard.
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Btn, Screen, styles } from './ui';

export default function Issue955({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const [showFooter, setShowFooter] = useState(false);
  return (
    <Screen title="#955 late footer + keyboard (iOS)" onBack={onBack}>
      <Text>1. Present. 2. Tap "Show footer". 3. Focus the input. The footer stays behind the keyboard.</Text>
      <Text>Control: tap "Present with footer" instead. The footer rises above the keyboard.</Text>
      <Btn title="Present" onPress={() => { setShowFooter(false); sheet.current?.present(); }} />
      <Btn title="Present with footer" onPress={() => { setShowFooter(true); sheet.current?.present(); }} />
      <TrueSheet
        ref={sheet}
        detents={['auto']}
        footerOptions={{ position: 'absolute' }}
        footer={showFooter ? <View style={styles.footer}><Text>FOOTER</Text></View> : undefined}
      >
        <View style={{ paddingTop: 24, paddingBottom: 80 }}>
          <Btn title="Show footer" onPress={() => setShowFooter(true)} />
          <TextInput testID="input" placeholder="Focus me" style={styles.input} />
        </View>
      </TrueSheet>
    </Screen>
  );
}
