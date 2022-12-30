import EditScreenInfo from 'components/EditScreenInfo';
import {Box, ScreenContainer, Text} from 'components';

export function ModalScreen() {
  return (
    <ScreenContainer>
      <Text>Modal</Text>
      <Box />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />
    </ScreenContainer>
  );
}
