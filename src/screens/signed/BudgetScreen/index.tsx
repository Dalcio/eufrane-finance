import {StyleSheet} from 'react-native';
import {Box, Text} from 'components';
import {SignedScreensProps} from 'navigation/types';

export function BudgetScreen({navigation}: SignedScreensProps<'Budget'>) {
  return (
    <Box >
      <Text>Budget Screen</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
