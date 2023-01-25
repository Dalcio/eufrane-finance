import {Box, Button, Input, ScreenContainer, Text} from 'components';
import useStore from 'store';
import {useState, useEffect} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

export function DailyExpenditure() {
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [belongsTo, setBelongsTo] = useState<string>('');

  const addDailyExpenditure = useStore((s) => s.addDailyExpenditure);
  const ornaments = useStore((s) => s.ornament);

  const handleAddDailyExpenditures = () => {
    addDailyExpenditure({source, value: Number(value), belongsTo});
  };

  useEffect(() => {
    if (ornaments?.length) {
      setBelongsTo(ornaments[0].id);
    }
  }, [ornaments]);

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
        <Box minWidth="100%" mt="m">
          <Text mb="m" textTransform="uppercase" content="Selecione oMensal" />
          <Picker
            placeholder="Selecione o orçamento alvo"
            selectedValue={belongsTo}
            onValueChange={(itemValue) => setBelongsTo(itemValue)}
            style={{
              minHeight: 56,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
          >
            {ornaments?.map(({source, id, value}) => (
              <Picker.Item value={id} label={`${source} - ${value}`} key={id} />
            ))}
          </Picker>
        </Box>
        <Input
          label="Motivo dos gastos diário"
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
    </ScreenContainer>
  );
}
