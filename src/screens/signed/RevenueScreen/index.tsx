import {Box, Button, Input, ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';
import useStore from 'store';
import {useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';

export function RevenueScreen({navigation}: SignedScreensProps<'Revenue'>) {
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const addRevenue = useStore((s) => s.addRevenue);
  const isAddingRevenue = useStore((s) => s.isLoading);

  const resetForm = () => {
    setSource('');
    setValue('');
  };

  const seeRevenue = () => {
    navigation.navigate('Modal', {view: 'Revenue'});
  };

  const handleAddRevenue = () => {
    addRevenue({source, value: Number(value), date: new Date()}, resetForm);
  };

  return (
    <ScreenContainer alignItems="center">
      <Text
        variant="subheader"
        textTransform="uppercase"
        content="Entradas (Receitas)"
      />

      <Box my="l">
        <MaterialIcons name="attach-money" size={100} />
      </Box>
      <Box width="100%">
        <Input
          label="Fonte da rececita"
          placeholder="Venda de carro"
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
        my="l"
        label="Adicionar Receita"
        onPress={handleAddRevenue}
        disabled={!source?.length || !value?.length || isAddingRevenue}
        isLoading={isAddingRevenue}
      />
      <Button size="l" label="Histórico de receitas" onPress={seeRevenue} />
    </ScreenContainer>
  );
}
