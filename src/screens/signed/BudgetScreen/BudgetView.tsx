import {Box, ListItem, ListItemHeader, Text} from 'components';
import useStore from 'store';

export function BudgetView() {
  const ornaments = useStore((s) => s.ornament);

  const remove = useStore((s) => s.removeOrnament);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="m" content="Orçamentos Registados" />
      {(ornaments?.length && (
        <Box mt="m" width="100%">
          <ListItemHeader left="Motivo" right="Valor" />
          {ornaments.map(({source, value, id}) => (
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
          <Text content="Não existe registo de orçamento" />
        </Box>
      )}
    </Box>
  );
}
