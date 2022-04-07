import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Hello from './app/screens/Hello';
import Home from './app/screens/Home';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let name = "User"
  const getName= (newName) => {
    name = newName;
    console.log(name)
  }
  const Stack = createNativeStackNavigator();
  // navigation.navigate('Hello')
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Hello"
            component={Hello}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen 
            name="Home" 
            component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
      /* <Hello emmitName={getName}/> */
  ) 
};

const styles = StyleSheet.create({
  total: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  }
});

export default App;
