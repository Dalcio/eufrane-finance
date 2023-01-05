import {Box, Button, Input, ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';
import useStore from 'store';
import {useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';

export function DailyExpenditureScreen({
  navigation,
}: SignedScreensProps<'Expenditures'>) {
  const [date, setDate] = useState<Date>(new Date());
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const addDailyExpenditure = useStore((s) => s.addDailyExpenditure);

  const seeDailyExpenditures = () => {
    navigation.navigate('Modal', {view: 'DailyExpenditures'});
  };

  const handleAddDailyExpenditures = () => {
    addDailyExpenditure({source, value: Number(value), date});
  };

  return (
    <ScreenContainer alignItems="center">
      <Text
        variant="subheader"
        textTransform="uppercase"
        content="Gastos Diários"
      />

      <Box my="l">
        <MaterialIcons name="money-off" size={100} />
      </Box>
      <Box width="100%">
        {/* <DatePi */}
        <Input
          label="Data"
          placeholder="Compra de carro"
          // value={date}
          onChangeText={setSource}
        />
        <Input
          label="Motivo dos gastos"
          placeholder="Compra de carro"
          value={source}
          onChangeText={setSource}
        />
        <Input
          label="Valor"
          placeholder="ex.: 5000000"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
      </Box>
      <Button
        size="l"
        my="l"
        label="Adicionar Gasto"
        onPress={handleAddDailyExpenditures}
        disabled={!source || !value}
      />
      <Button
        size="l"
        label="Ver Gastos Diários"
        onPress={seeDailyExpenditures}
      />
    </ScreenContainer>
  );
}
