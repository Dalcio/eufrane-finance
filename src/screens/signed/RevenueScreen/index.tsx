import {ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';

export function RevenueScreen({navigation}: SignedScreensProps<'Revenue'>) {
  return (
    <ScreenContainer>
      <Text>Revenue Screen</Text>
    </ScreenContainer>
  );
}
