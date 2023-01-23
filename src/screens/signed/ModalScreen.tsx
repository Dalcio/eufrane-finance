import {Box, Button, ScreenContainer, Text} from 'components';
import {RootStackScreenProps} from 'navigation/types';

export function ModalScreen({
  navigation: {goBack},
  route: {params: Children},
}: RootStackScreenProps<'Modal'>) {
  return (
    <>
      <ScreenContainer>{(Children && <Children />) || null}</ScreenContainer>
      <Box px="m" pb="m">
        <Button label="Voltar" width="100%" onPress={goBack} />
      </Box>
    </>
  );
}
