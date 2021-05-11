/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import AdvertisePage from '../screens/AdvertisePage';
import findDiaperPage from '../screens/findDiaperPage';
import { NetworkContext } from '../reactContext';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({route}: any) {
  // const colorScheme = useColorScheme();

  // console.log(route.params);

  // const [userData, setUserData] = React.useState({});

  const userData = route.params;

  ////setUserData(route.params);

  return (
    <NetworkContext.Provider value={userData}>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ activeTintColor: Colors['default'].tint }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreenNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Anuncios"
          component={findDiaperPage}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="shopping-basket" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Chat"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Anunciar"
          component={AdvertisePage}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="bullhorn" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </NetworkContext.Provider>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
  return <Icon size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function HomeScreenNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}
