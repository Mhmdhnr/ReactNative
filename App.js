// import 'react-native-gesture-handler'
import 'react-native-reanimated';
import React, {useState} from 'react';
// import {Node} from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

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

export const UserContext = React.createContext('');

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
  console.log(app.nav);
  return (
    <UserContext.Provider value={[app, setApp]}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Scanner" component={Scanner} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
    /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
    //   <QueryClientProvider client={queryClient}>
    //     <Home></Home>
    //   </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  total: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default App;
