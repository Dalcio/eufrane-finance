import {AntDesign} from '@expo/vector-icons';
import {Box, ListItem, ScreenContainer, Text} from 'components';
import {TabContainer} from 'components/Tab';
import useStore from 'store';

export function HomeScreen() {
  const {
    expenditures,
    revenues,
    budget,
    balance,
    ornament,
    dailyExpenditures,
    savings,
  } = useStore();

  return (
    <ScreenContainer>
      <Text
        content="Resumo Geral"
        variant="subheader"
        textTransform="uppercase"
        textAlign="center"
        mb="l"
        pb="l"
      />

      {((revenues.length || expenditures.length) && (
        <TabContainer
          headers={['Receitas', 'Gastos']}
          contents={[revenues ?? [], expenditures ?? []]}
        />
      )) || <></>}

      {((ornament.length || savings.length) && (
        <TabContainer
          headers={['Orçamento', 'Poupanças']}
          contents={[ornament ?? [], savings ?? []]}
        />
      )) || <></>}

      {(dailyExpenditures.length && (
        <TabContainer
          headers={['Gastos Diários']}
          contents={[dailyExpenditures ?? []]}
        />
      )) || <></>}

      <Box>
        <Text
          content="Saldo Atual"
          variant="subheader2"
          textTransform="uppercase"
          textAlign="center"
        />
        <Box
          borderBottomColor={budget < 0 ? 'error' : 'black'}
          borderBottomWidth={1}
          borderStyle="dashed"
          pb="s"
        >
          <Text
            variant="subheader"
            textTransform="uppercase"
            textAlign="center"
            color={budget < 0 ? 'error' : 'primaryText'}
          >
            {budget}
          </Text>
        </Box>
      </Box>
    </ScreenContainer>
  );
}
