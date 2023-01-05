import {Box, ListItem, ListItemHeader, Text} from 'components';
import useStore from 'store';

export function RevenueListView() {
  const revenues = useStore((s) => s.revenues);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="m" content="Lista de receitas" />
      {(revenues?.length && (
        <Box mt="m" width="100%">
          <ListItemHeader left="Descrição" right="Valor" />
          {revenues.map(({source, value, id}) => (
            <ListItem left={source} right={value} key={id} />
          ))}
        </Box>
      )) || (
        <Box alignItems="center" justifyContent="center" flexGrow={1}>
          <Text content="Não existe nenhuma receita" />
        </Box>
      )}
    </Box>
  );
}
