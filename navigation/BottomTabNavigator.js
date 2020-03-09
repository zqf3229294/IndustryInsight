import * as React from 'react';
import { Button, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ChannelScreen from '../screens/ChannelScreen';
import MessengerScreen from '../screens/MessengerScreen';
import LinksScreen from '../screens/LinksScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
      headerTitle: getHeaderTitle(route),
      headerRight: getRightComp(route),
   });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Channel"
        component={ChannelScreen}
        options={{
          title: 'Channel',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-list" />,
        }}
      />
      <BottomTab.Screen
        name="Messenger"
        component={MessengerScreen}
        options={{
          title: 'Messenger',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-mail" />,
        }}
      />
       <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  // change header title of each table
  switch (routeName) {
    case 'Home':
      return 'Industry Insight';
    case 'Channel':
      return 'Channel';
    case 'Messenger':
      return 'Messenger';
    case 'Profile':
      return 'Profile';
  }
}

function getRightComp(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Home':
      return () => (
              <Button
                // onPress should take to another page
                onPress={() => alert('This is a button!')}
                title="+"
                color="#00cc00"
              />
          );
  }
}
