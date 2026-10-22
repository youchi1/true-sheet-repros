// iOS: TrueSheetOverlay content is not accessible while a dimmed sheet is presented.
import { TrueSheet, TrueSheetOverlay } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Btn, Screen } from './ui';

export default function Issue962({ onBack }: { onBack: () => void }) {
  const sheet = useRef<TrueSheet>(null);
  const [overlayTaps, setOverlayTaps] = useState(0);
  return (
    <Screen title="#962 overlay accessibility (iOS)" onBack={onBack}>
      <Text>1. Present. 2. With VoiceOver (or Accessibility Inspector, or an XCTest query), look for "Overlay button".</Text>
      <Text>It is visible and tappable, but not in the accessibility tree while the dimmed sheet is up.</Text>
      <Btn title="Present" onPress={() => sheet.current?.present()} />
      <TrueSheetOverlay>
        <View style={{ position: 'absolute', top: 120, right: 16 }}>
          <Btn title={`Overlay button (${overlayTaps})`} onPress={() => setOverlayTaps((n) => n + 1)} />
        </View>
      </TrueSheetOverlay>
      <TrueSheet ref={sheet} detents={[0.5]}>
        <View style={{ padding: 24, gap: 12 }}>
          <Text>Sheet</Text>
          <Btn title="Close" onPress={() => sheet.current?.dismiss()} />
        </View>
      </TrueSheet>
    </Screen>
  );
}
