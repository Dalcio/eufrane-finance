import {ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';

export function BudgetScreen({navigation}: SignedScreensProps<'Budget'>) {
  return (
    <ScreenContainer>
      <Text>Budget Screen</Text>
    </ScreenContainer>
  );
}
