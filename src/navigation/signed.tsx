import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignedParamList} from './types';
import {BudgetScreen, ExpendituresScreen, RevenueScreen} from 'screens/signed';
import {TabBarMenu} from './TabBarMenu';
import {DailyExpenditureScreen} from 'screens/signed/DailyExpenditureScreen';

const BottomTab = createBottomTabNavigator<SignedParamList>();

export default function SignedNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={(props) => <TabBarMenu {...props} />}
    >
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
        name="DailyExpenditures"
        component={DailyExpenditureScreen}
        options={{title: 'Gastos Diários'}}
      />
      <BottomTab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{title: 'Orçamento Geral'}}
      />
    </BottomTab.Navigator>
  );
}
