import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useColorScheme from 'hooks/useColorScheme';
import {Pressable} from 'react-native';
import Colors from 'constants/Colors';
import {SignedParamList, SignedScreensProps} from './types';
import {
  BudgetScreen,
  ExpendituresScreen,
  HomeScreen,
  RevenueScreen,
} from 'screens/signed';
import {TabBarMenu} from './TabBarMenu';

const BottomTab = createBottomTabNavigator<SignedParamList>();

export default function SignedNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={(props) => <TabBarMenu {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}: SignedScreensProps<'Home'>) => ({
          title: 'Home',
          headerShown: true,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={24}
                color={Colors[colorScheme].text}
                style={{marginRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Revenue"
        component={RevenueScreen}
        options={{title: 'Receitas'}}
      />
      <BottomTab.Screen
        name="Expenditures"
        component={ExpendituresScreen}
        options={{title: 'Gastos'}}
      />
      <BottomTab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{title: 'Orçamento'}}
      />
    </BottomTab.Navigator>
  );
}
