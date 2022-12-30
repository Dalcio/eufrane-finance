import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet} from 'react-native';
import EditScreenInfo from 'components/EditScreenInfo';
import {Box, Text} from 'components';

export function ModalScreen() {
  return (
    <Box>
      <Text>Modal</Text>
      <Box />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Box>
  );
}
