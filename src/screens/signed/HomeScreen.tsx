import {ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';

export function HomeScreen({navigation}: SignedScreensProps<'Home'>) {
  return (
    <ScreenContainer>
      <Text>Home Screen</Text>
    </ScreenContainer>
  );
}
