import {ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';

export function ExpendituresScreen({
  navigation,
}: SignedScreensProps<'Expenditures'>) {
  return (
    <ScreenContainer>
      <Text>Saidas (Gastos) Screen</Text>
    </ScreenContainer>
  );
}
