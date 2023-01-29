import {Box, ListItem, ListItemHeader, Text} from 'components';
import useStore from 'store';

export function SavingListView() {
  const {savings} = useStore();
  const remove = useStore((s) => s.removeSaving);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="m" content="Lista de poupanças" />
      {(savings?.length && (
        <Box mt="m" width="100%">
          <ListItemHeader left="Descrição" right="Valor" />
          {savings.map(({source, value, id}) => (
            <ListItem
              left={source}
              right={value}
              key={id}
              onRemove={() => remove({id})}
            />
          ))}
        </Box>
      )) || (
        <Box alignItems="center" justifyContent="center" flexGrow={1}>
          <Text content="Não existe nenhuma poupança" />
        </Box>
      )}
    </Box>
  );
}
