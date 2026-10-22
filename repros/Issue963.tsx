// Android: TrueSheetOverlay clips its children, so shadows are cut.
import { TrueSheetOverlay } from '@lodev09/react-native-true-sheet';
import { Text, View } from 'react-native';
import { Screen } from './ui';

function Pill({ label }: { label: string }) {
  return (
    <View style={{ height: 56, marginHorizontal: 16 }}>
      <View style={{ flex: 1, borderRadius: 28, backgroundColor: '#fff', justifyContent: 'center', paddingHorizontal: 20, boxShadow: '0 6px 20px rgba(0,0,0,0.5)' }}>
        <Text>{label}</Text>
      </View>
    </View>
  );
}

export default function Issue963({ onBack }: { onBack: () => void }) {
  return (
    <Screen title="#963 overlay clips shadows (Android)" onBack={onBack}>
      <Text>Top pill: plain view, full shadow. Bottom pill: same view in a TrueSheetOverlay, shadow cut at the top and bottom edges.</Text>
      <Pill label="Plain view" />
      <TrueSheetOverlay>
        <View style={{ position: 'absolute', bottom: 120, left: 0, right: 0 }}>
          <Pill label="In TrueSheetOverlay" />
        </View>
      </TrueSheetOverlay>
    </Screen>
  );
}
