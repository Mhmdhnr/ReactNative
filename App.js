import {colors} from './app/styles/variables';
import 'react-native-reanimated';
import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Hello from './app/screens/Hello';
import Home from './app/screens/Home';
import Scanner from './app/screens/Scanner';

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  const [app, setApp] = useState({
    username: '',
    nav: 'Home',
  });
  const headerOptions = {
  };
  return (
    <UserContext.Provider value={[app, setApp]}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'FrodoPay',
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
             name="Scanner" 
             component={Scanner} 
             options={{
              title: 'QR Scanner',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: colors.primary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
             />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
    /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
  );
};

const styles = StyleSheet.create({
  total: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
});

export const UserContext = React.createContext('');
export default App;
