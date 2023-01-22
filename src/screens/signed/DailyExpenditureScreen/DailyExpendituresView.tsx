import {Box, ListItem, Text} from 'components';
import useStore from 'store';

export function DailyExpendituresView() {
  const dailyExpenditures = useStore((s) => s.dailyExpenditures);

  return (
    <Box alignItems="center" flexGrow={1}>
      <Text variant="subheader" mb="l" content="Lista de Gastos Diários" />
      {(dailyExpenditures?.length && (
        <Box mt="m" width="100%">
          {dailyExpenditures.map(({date, value, id}) => (
            <ListItem left={date.toDateString()} right={value} key={id} />
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
