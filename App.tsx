import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from 'hooks/useCachedResources';
import 'react-native-get-random-values';
import Navigation from 'navigation';
import theme from 'theme';
import {ThemeProvider} from '@shopify/restyle';
import {layout} from 'constants/Layout';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const {width} = layout.window;
  const marginX = width <= 500 ? 0 : (width - 500) / 2;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={{maxWidth: 500, marginHorizontal: marginX}}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
