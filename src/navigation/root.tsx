import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import SignedNavigator from './signed';
import {AuthNavigator} from './auth.';
import {ModalScreen} from 'screens/signed';
import useStore from 'store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const {user} = useStore();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="Signed" component={SignedNavigator} />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
