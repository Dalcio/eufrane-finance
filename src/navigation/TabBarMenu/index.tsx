import {TouchableOpacity} from 'react-native';
import {Box, Text} from 'components/Themed';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {AntDesign, FontAwesome, MaterialIcons} from '@expo/vector-icons';

type IconType = {
  color: string;
};

type RoutesType = {
  [key: string]: {
    Icon: ({color}: IconType) => JSX.Element;
  };
};

const ROUTES: RoutesType = {
  home: {
    Icon: ({color}) => <FontAwesome name="home" size={24} color={color} />,
  },
  revenue: {
    Icon: ({color}: IconType) => (
      <MaterialIcons name="attach-money" size={24} color={color} />
    ),
  },
  expenditures: {
    Icon: ({color}: IconType) => (
      <MaterialIcons name="money-off" size={24} color={color} />
    ),
  },
  dailyexpenditures: {
    Icon: ({color}: IconType) => (
      <MaterialIcons name="money-off" size={24} color={color} />
    ),
  },
  budget: {
    Icon: ({color}: IconType) => (
      <AntDesign name="linechart" size={24} color={color} />
    ),
  },
};

export function TabBarMenu({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      bg="black"
      // p="xs"
      marginVertical="xs"
      width="80%"
      alignSelf="center"
      borderRadius="l"
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const {name} = route;
        const Icon = ROUTES[name.toLowerCase()]?.Icon;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.name}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              borderRadius="m"
              p="s"
              m="xs"
              mt="s"
              bg={(isFocused && 'white') || 'black'}
            >
              {Icon && <Icon color={(isFocused && 'black') || 'white'} />}
              {(isFocused && label && (
                <Text
                  ml="s"
                  color={isFocused ? 'black' : 'white'}
                  variant="buttonLabel"
                >
                  {label}
                </Text>
              )) ||
                null}
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}
