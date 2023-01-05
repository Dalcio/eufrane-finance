import {Box, Button, Input, ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';
import useStore from 'store';
import {useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';

export function ExpendituresScreen({
  navigation,
}: SignedScreensProps<'Expenditures'>) {
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const addExpenditure = useStore((s) => s.addExpenditure);

  const seeExpenditures = () => {
    navigation.navigate('Modal', {view: 'Expenditures'});
  };

  const goToDailyExpenditures = () => {
    navigation.navigate('DailyExpenditures');
  };

  const handleAddExpenditures = () => {
    addExpenditure({source, value: Number(value), date: new Date()});
  };

  return (
    <ScreenContainer alignItems="center">
      <Text
        variant="subheader"
        textTransform="uppercase"
        content="Saidas (Gastos)"
      />

      <Box my="l">
        <MaterialIcons name="money-off" size={100} />
      </Box>
      <Box width="100%">
        <Input
          label="Motivo dos gastos"
          placeholder="Compra de carro"
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
        mb="m"
        label="Registar Gasto"
        onPress={handleAddExpenditures}
        disabled={!source?.length || !value?.length}
      />
      <Button
        size="l"
        mb="l"
        label="Histórico de despesas"
        onPress={seeExpenditures}
      />
      <Button
        size="l"
        mt="l"
        label="Gastos Diários"
        onPress={goToDailyExpenditures}
      />
    </ScreenContainer>
  );
}
