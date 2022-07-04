/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RecoilRoot } from 'recoil';
import Add from './screens/AddScreen';
import Home from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';

export type RootStackParams = {
  Home: undefined;
  Add: undefined;
  Update: {
    id: number;
    title: string,
    index: number,
  };
}
const stack = createNativeStackNavigator<RootStackParams>()
const App = () => {

  return (
    <RecoilRoot>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name='Home' component={Home}/>
          <stack.Screen name='Add' component={Add}/>
          <stack.Screen 
            name='Update' 
            component={UpdateScreen}/>
        </stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
