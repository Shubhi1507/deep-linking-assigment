import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Linking, Alert} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Tabs from './app/navigation/Tabs';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {ROUTES} from './app/navigation/route.contants';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
