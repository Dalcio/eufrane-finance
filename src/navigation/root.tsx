import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import SignedNavigator from './signed';
import {AuthNavigator} from './auth.';
import {ModalScreen} from 'screens/signed';
import useStore from 'store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const user = useStore((s) => s.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Signed" component={SignedNavigator} />
          <Stack.Group>
            <Stack.Screen
              name="Modal"
              component={ModalScreen}
              options={{presentation: 'modal'}}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
