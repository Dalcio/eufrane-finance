import {AntDesign} from '@expo/vector-icons';
import {Box, ListItem, ScreenContainer, Text} from 'components';
import {TabContainer} from 'components/Tab';
import {SignedScreensProps} from 'navigation/types';
import useStore from 'store';

export function BudgetScreen({
  navigation: {goBack},
}: SignedScreensProps<'Budget'>) {
  const {expenditures, revenues, budget, balance} = useStore();

  return (
    <ScreenContainer>
      <Text
        content="Orçamento Geral"
        variant="subheader"
        textTransform="uppercase"
        textAlign="center"
      />

      <Box my="l" alignItems="center">
        <AntDesign name="linechart" size={80} />
      </Box>

      <Box mb="l">
        <ListItem left="SALDO ATUAL" right={balance} />
      </Box>

      {((revenues || expenditures) && (
        <TabContainer
          headers={['Receitas', 'Gastos']}
          contents={[revenues ?? [], expenditures ?? []]}
        />
      )) || <></>}

      <Box my="l">
        <Text
          content="Poupança"
          variant="subheader"
          textTransform="uppercase"
          textAlign="center"
        />
        <Box
          borderBottomColor="black"
          borderBottomWidth={1}
          borderStyle="dashed"
          pb="s"
        >
          <Text
            variant="subheader"
            textTransform="uppercase"
            textAlign="center"
          >
            {budget}
          </Text>
        </Box>
      </Box>
    </ScreenContainer>
  );
}
