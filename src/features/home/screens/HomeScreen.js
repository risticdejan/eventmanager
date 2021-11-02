import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Button from '../../../components/Button';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Home2')}
      />
      <Text>test jej</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
