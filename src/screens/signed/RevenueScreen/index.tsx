import {Box, Button, Input, ScreenContainer, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';
import useStore from 'store';
import {useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {RevenueListView} from './RevenueListView';
import {Savings} from './Savings';
import {SavingListView} from './SavingView';

export function RevenueScreen({navigation}: SignedScreensProps<'Revenue'>) {
  const [source, setSource] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const addRevenue = useStore((s) => s.addRevenue);
  const revenues = useStore((s) => s.revenues);
  const savings = useStore((s) => s.savings);
  const isAddingRevenue = useStore((s) => s.isLoading);

  const resetForm = () => {
    setSource('');
    setValue('');
  };

  const seeRevenue = () => {
    navigation.navigate('Modal', RevenueListView);
  };

  const handleAddRevenue = () => {
    addRevenue({source, value: Number(value)});
    resetForm();
  };

  const goToSavings = () => {
    navigation.navigate('Modal', Savings);
  };

  const seeSavingsListView = () => {
    navigation.navigate('Modal', SavingListView);
  };

  return (
    <ScreenContainer alignItems="center">
      <Text variant="subheader" textTransform="uppercase" content="Receitas" />
      <Box my="l">
        <MaterialIcons name="attach-money" size={50} />
      </Box>
      <Box width="100%">
        <Input
          label="Fonte da rececita"
          placeholder="Venda de carro"
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
        mt="m"
        label="Adicionar Receita"
        bgColor="submit"
        onPress={handleAddRevenue}
        disabled={!source?.length || !value?.length || isAddingRevenue}
        isLoading={isAddingRevenue}
      />
      <Button
        mt="m"
        size="l"
        label="Histórico de receitas"
        onPress={seeRevenue}
        disabled={!revenues.length}
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
          disabled={!revenues.length}
          size="l"
          label="Adicionar Poupança"
          bgColor="submit"
          onPress={goToSavings}
        />
        <Button
          mt="m"
          size="l"
          label="Histórico de poupanças"
          onPress={seeSavingsListView}
          disabled={!savings.length}
        />
      </Box>
    </ScreenContainer>
  );
}
