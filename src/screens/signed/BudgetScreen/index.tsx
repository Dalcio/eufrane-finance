import {MaterialIcons} from '@expo/vector-icons';
import {Box, Button, Input, ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';
import {useState} from 'react';
import useStore from 'store';
import {DailyExpenditure} from './DailyExpenditure';
import {BudgetView} from './BudgetView';
import {dailyExpendituresView} from './DailyExpendituresView';

export function BudgetScreen({navigation}: SignedScreensProps<'Budget'>) {
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const addOrnament = useStore((s) => s.addOrnament);

  const seeBudget = () => {
    navigation.navigate('Modal', BudgetView);
  };

  const seeDailyExpenditures = () => {
    navigation.navigate('Modal', dailyExpendituresView);
  };

  const goToDailyExpenditures = () => {
    navigation.navigate('Modal', DailyExpenditure);
  };

  const handleAddExpenditures = () => {
    addOrnament({source, value: Number(value)});
  };

  return (
    <ScreenContainer alignItems="center">
      <Text
        variant="subheader"
        textTransform="uppercase"
        content="Orçamento Mensal"
      />

      <Box my="l">
        <MaterialIcons name="money-off" size={100} />
      </Box>
      <Box width="100%">
        <Input
          label="Nome do Orçamento"
          placeholder="motivo do orçamento"
          onChangeText={setSource}
        />
        <Input
          label="Valor"
          placeholder="ex.: 5000000"
          keyboardType="numeric"
          onChangeText={setValue}
        />
      </Box>
      <Button
        size="l"
        mt="l"
        label="Registar Orçamento"
        onPress={handleAddExpenditures}
        disabled={!source?.length || !value?.length}
      />
      <Button
        size="l"
        my="l"
        label="Adicionar Gastos Diários"
        onPress={goToDailyExpenditures}
      />
      <Button
        size="l"
        mt="l"
        label="Histórico de orçamento"
        onPress={seeBudget}
      />
      <Button
        size="l"
        mt="l"
        label="Histórico de gastos diários"
        onPress={seeDailyExpenditures}
      />
    </ScreenContainer>
  );
}
