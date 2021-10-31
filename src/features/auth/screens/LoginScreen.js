import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import {emailValidator} from '../../../helpers/emailValidator';
import {passwordValidator} from '../../../helpers/passwordValidator';
import Toast from '../../../components/Toast';
import { useDispatch } from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import * as authAction from '../actions';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  useEffect(() => {
    console.log(error);
    return () => {
      setEmail({value: '', error: ''});
      setPassword({value: '', error: ''});
    };
  }, [error]);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    if (!netInfo.isConnected) {
      setError('Internet konekcija u prekidu');
      return;
    }

    setLoading(true);
    setError(null);

    const action = authAction.login(email.value, password.value);
    try {
      await dispatch(action);
      setError(null);
      setLoading(false);
      navigation.navigate('HomeScreen', {
        screen: 'Home',
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Background>
      {/* <Logo /> */}
      <Header>Dobro došli.</Header>
      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Lozinka"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button loading={loading} mode="contained" onPress={onLoginPressed}>
        Prijavite se
      </Button>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
