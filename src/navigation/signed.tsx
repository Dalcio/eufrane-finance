import {AntDesign, FontAwesome, MaterialIcons} from '@expo/vector-icons';
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

const BottomTab = createBottomTabNavigator<SignedParamList>();

export default function SignedNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}: SignedScreensProps<'Home'>) => ({
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
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
        options={{
          title: 'Receitas',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Expenditures"
        component={ExpendituresScreen}
        options={{
          title: 'Gastos',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="money-off" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: 'Orçamento',
          tabBarIcon: ({color}) => (
            <AntDesign name="linechart" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}