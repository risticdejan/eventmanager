import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
