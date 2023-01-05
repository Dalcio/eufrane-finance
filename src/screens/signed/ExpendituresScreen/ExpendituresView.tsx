import {Box, ListItem, ListItemHeader, Text} from 'components';
import useStore from 'store';

export function ExpendituresView() {
  const expenditures = useStore((s) => s.expenditures);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="m" content="Lista de Saídas (Gastos)" />
      {(expenditures?.length && (
        <Box mt="m" width="100%">
          <ListItemHeader left="Motivo" right="Valor" />
          {expenditures.map(({source, value, id}) => (
            <ListItem left={source} right={value} key={id} />
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
