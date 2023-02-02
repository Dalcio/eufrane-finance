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
  const ornament = useStore((s) => s.ornament);
  const dailyExpenditures = useStore((s) => s.dailyExpenditures);
  const isAdding = useStore((s) => s.isLoading);

  const resetForm = () => {
    setValue('');
    setSource('');
  };

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
    addOrnament({source, value: Number(value)}, resetForm);
  };

  return (
    <ScreenContainer alignItems="center">
      <Text
        variant="subheader"
        textTransform="uppercase"
        content="Orçamento Mensal"
      />

      <Box my="l">
        <MaterialIcons name="money-off" size={50} />
      </Box>
      <Box width="100%">
        <Input
          value={source}
          label="Nome do Orçamento"
          placeholder="motivo do orçamento"
          onChangeText={setSource}
        />
        <Input
          value={value}
          label="Valor"
          placeholder="ex.: 5000000"
          keyboardType="numeric"
          onChangeText={setValue}
        />
      </Box>
      <Button
        size="l"
        mt="m"
        label="Registar Orçamento"
        bgColor="submit"
        onPress={handleAddExpenditures}
        disabled={!source?.length || !value?.length}
        isLoading={isAdding}
      />
      <Button
        size="l"
        mt="m"
        label="Histórico de orçamento"
        onPress={seeBudget}
        disabled={!ornament.length}
      />

      <Box
        p="m"
        mt="m"
        borderRadius="m"
        borderWidth={1}
        borderColor="primaryText"
        width="100%"
      >
        <Button
          size="l"
          label="Adicionar Gastos Diários"
          bgColor="submit"
          onPress={goToDailyExpenditures}
          disabled={!ornament.length}
        />
        <Button
          size="l"
          mt="m"
          label="Histórico de gastos diários"
          onPress={seeDailyExpenditures}
          disabled={!dailyExpenditures.length}
        />
      </Box>
    </ScreenContainer>
  );
}
