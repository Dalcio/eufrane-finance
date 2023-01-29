import {Box, Button, Input, ScreenContainer, Text} from 'components';
import useStore from 'store';
import {useState, useEffect} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

export function Savings() {
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [belongsTo, setBelongsTo] = useState<string>('');

  const addSaving = useStore((s) => s.addSaving);
  const isAdding = useStore((s) => s.isLoading);
  const revenues = useStore((s) => s.revenues);

  const resetForm = () => {
    setSource('');
    setBelongsTo('');
    setValue('');
  };

  const handleAddSaving = () => {
    addSaving({source, value: Number(value), belongsTo}, resetForm);
  };

  useEffect(() => {
    if (revenues?.length) {
      setBelongsTo(revenues[0].id);
    }
  }, [revenues]);

  return (
    <ScreenContainer alignItems="center">
      <Text variant="subheader" textTransform="uppercase" content="Poupanças" />
      <Box my="l">
        <MaterialIcons name="wallet-giftcard" size={50} />
      </Box>
      <Box width="100%">
        <Box minWidth="100%" mt="m">
          <Text mb="m" textTransform="uppercase" content="Onde poupar?" />
          <Picker
            placeholder="Selecione a reiceita alvo"
            selectedValue={belongsTo}
            onValueChange={(itemValue) => setBelongsTo(itemValue)}
            style={{
              minHeight: 56,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
          >
            {revenues?.map(({source, id, value}) => (
              <Picker.Item value={id} label={`${source} - ${value}`} key={id} />
            ))}
          </Picker>
        </Box>
        <Input
          label="Motivo da poupança"
          placeholder="Qualquercoisa"
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
        label="Adicionar Poupança"
        bgColor="submit"
        isLoading={isAdding}
        onPress={handleAddSaving}
        disabled={!source || !value}
      />
    </ScreenContainer>
  );
}
