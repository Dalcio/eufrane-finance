import {Box, ListItem, ListItemHeader, Text} from 'components';
import useStore from 'store';

export function ExpendituresView() {
  const expenditures = useStore((s) => s.expenditures);
  const remove = useStore((s) => s.removeExpenditure);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="m" content="Lista de Saídas (Gastos)" />
      {(expenditures?.length && (
        <Box mt="m" width="100%">
          <ListItemHeader left="Motivo" right="Valor" />
          {expenditures.map(({source, value, id}) => (
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
          <Text content="Não existe registo de gastos" />
        </Box>
      )}
    </Box>
  );
}
