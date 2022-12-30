import {StyleSheet} from 'react-native';
import {Text, View} from 'components/Themed';
import {SignedScreensProps} from 'navigation/types';

export function ExpendituresScreen({
  navigation,
}: SignedScreensProps<'Expenditures'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saidas (Gastos) Screen</Text>
    </View>
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
