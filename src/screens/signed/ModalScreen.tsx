import {Box, ScreenContainer, Text} from 'components';
import {RootStackScreenProps} from 'navigation/types';
import {BudgetView} from './BudgetScreen/BudgetView';
import {ExpendituresView} from './ExpendituresScreen/ExpendituresView';
import {HomeModalView} from './HomeScreen/HomeModalView';
import {RevenueListView} from './RevenueScreen/RevenueListView';

export function ModalScreen({
  route: {
    params: {view},
  },
}: RootStackScreenProps<'Modal'>) {
  return (
    <ScreenContainer>
      {(view === 'Home' && <HomeModalView />) ||
        (view === 'Revenue' && <RevenueListView />) ||
        (view === 'Expenditures' && <ExpendituresView />) || <BudgetView />}
    </ScreenContainer>
  );
}
