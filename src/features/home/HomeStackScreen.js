import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appbar} from 'react-native-paper';
import HomeScreen2 from './screens/HomeScreen2';
import HomeScreen from './screens/HomeScreen';
import {Button} from 'react-native';

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
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          props.navigation.setParams({
            search: !props.route.params?.search,
          });
        }}
      />
      <Appbar.Action
        icon="filter"
        onPress={() => {
          props.navigation.setParams({
            filter: !props.route.params?.filter,
          });
        }}
      />
    </Appbar.Header>
  );
}

export default function HomeStackScreen({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Home2" component={HomeScreen2} />
    </Stack.Navigator>
  );
}
