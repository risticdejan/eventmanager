import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Background from '../../../components/Background';
import {theme} from '../../../core/theme';
import {useSelector} from 'react-redux';

export default function AuthLoadingScreen({navigation}) {
  const isAuth = useSelector(state => !!state.auth.token);

  useEffect(() => {
    if (isAuth) {
      navigation.reset({
        routes: [{name: 'HomeScreen'}],
      });
    } else {
      navigation.reset({
        routes: [{name: 'LoginScreen'}],
      });
    }
  }, [isAuth, navigation]);

  return (
    <Background>
      <ActivityIndicator
        size="large"
        animating={true}
        color={theme.colors.primary}
      />
    </Background>
  );
}
