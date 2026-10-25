# TrueSheet repros

Minimal Expo app with one screen per issue, on `@lodev09/react-native-true-sheet@4.0.0-beta.31`
(Expo SDK 57, React Native 0.86.3, new architecture).

```sh
bun install            # or npm install
npx expo run:ios       # or npx expo run:android
```

Open the screen for an issue from the list. Each screen shows its steps at the top.

| Issue | Platform | Screen |
|---|---|---|
| [#955](https://github.com/lodev09/react-native-true-sheet/issues/955) late footer stays behind the keyboard | iOS | [repros/Issue955.tsx](repros/Issue955.tsx) |
| [#956](https://github.com/lodev09/react-native-true-sheet/issues/956) no dismiss attempt from a header drag while scrolled | Android | [repros/Issue956.tsx](repros/Issue956.tsx) |
| [#957](https://github.com/lodev09/react-native-true-sheet/issues/957) touches reach views behind a presenting sheet | Android | [repros/Issue957.tsx](repros/Issue957.tsx) |
| [#958](https://github.com/lodev09/react-native-true-sheet/issues/958) gap above the keyboard (bottom inset) | Android | [repros/Issue958.tsx](repros/Issue958.tsx) |
| [#959](https://github.com/lodev09/react-native-true-sheet/issues/959) extra scroll inset with header + absolute footer + keyboard | Android | [repros/Issue959.tsx](repros/Issue959.tsx) |
| [#962](https://github.com/lodev09/react-native-true-sheet/issues/962) overlay content not accessible under a dimmed sheet | iOS | [repros/Issue962.tsx](repros/Issue962.tsx) |
| [#963](https://github.com/lodev09/react-native-true-sheet/issues/963) overlay clips child shadows | Android | [repros/Issue963.tsx](repros/Issue963.tsx) |
| [#975](https://github.com/lodev09/react-native-true-sheet/issues/975) content that almost fits above the keyboard gets no inset, end stays under the footer | iOS | [repros/AlmostFits.tsx](repros/AlmostFits.tsx) |

The #955 to #963 screens were filed on beta.29. Checked on an iPhone 17 Pro simulator (iOS 26.5) and a Pixel 10 Pro emulator (Android 16, gesture navigation).
