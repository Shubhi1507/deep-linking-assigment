import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ProfileScreen({}) {
  return (
    <View style={styles.container}>
      <Text>Second Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
