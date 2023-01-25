import {Box, ListItem, ListItemHeader, Text} from 'components';
import useStore from 'store';

export function dailyExpendituresView() {
  const dailyExpenditures = useStore((s) => s.dailyExpenditures);

  const remove = useStore((s) => s.removeDailyExpenditure);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="m" content="Gastos Diários registados" />
      {(dailyExpenditures?.length && (
        <Box mt="m" width="100%">
          <ListItemHeader left="Motivo" right="Valor" />
          {dailyExpenditures.map(({source, value, id}) => (
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
          <Text content="Não existe registo de gastos diários" />
        </Box>
      )}
    </Box>
  );
}
