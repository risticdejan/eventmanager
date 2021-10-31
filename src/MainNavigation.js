import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './features/auth/screens/LoginScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStackScreen from './features/home/screens/HomeStackScreen';
import AuthLoadingScreen from './features/auth/screens/AuthLoadingScreen';
import {DrawerContent} from './components/DrawerContent';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function MainNavigation() {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <Stack.Navigator
      initialRouteName="AuthLoadingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
      {isAuth ? (
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigation;
