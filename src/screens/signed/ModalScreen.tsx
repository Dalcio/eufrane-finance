import {Box, Button, ScreenContainer, Text} from 'components';
import {RootStackScreenProps} from 'navigation/types';
import {ExpendituresView} from './ExpendituresScreen/ExpendituresView';
import {HomeModalView} from './HomeScreen/HomeModalView';
import {RevenueListView} from './RevenueScreen/RevenueListView';
import {DailyExpendituresView} from './DailyExpenditureScreen/DailyExpendituresView';

export function ModalScreen({
  navigation: {goBack},
  route: {
    params: {view},
  },
}: RootStackScreenProps<'Modal'>) {
  return (
    <>
      <ScreenContainer>
        {(view === 'Home' && <HomeModalView />) ||
          (view === 'Revenue' && <RevenueListView />) ||
          (view === 'Expenditures' && <ExpendituresView />) ||
          (view === 'DailyExpenditures' && <DailyExpendituresView />) ||
          null}
      </ScreenContainer>
      <Box px="m" pb="m">
        <Button label="Voltar" width="100%" onPress={goBack} />
      </Box>
    </>
  );
}
