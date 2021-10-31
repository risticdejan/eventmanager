import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appbar} from 'react-native-paper';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function CustomNavigationBar(props) {
  return (
    <Appbar.Header>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : props.navigation.openDrawer ? (
        <Appbar.Action icon="menu" onPress={props.navigation.openDrawer} />
      ) : null}
      <Appbar.Content title={props.route.name} />
    </Appbar.Header>
  );
}

export default function HomeStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
