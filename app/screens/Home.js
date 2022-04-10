import React, {useContext} from 'react';
import {Text, View, Button, PermissionsAndroid} from 'react-native';
import {useQuery} from 'react-query';
import {UserContext} from '../../App';

// const queryClient = new QueryClient();

// const fetchUser = async () => {
//   await fetch('https://jsonplaceholder.typicode.com/users/1').then(res => {
//     return res.json();
//   });
// };
const fetchUser = async () => {
  const res = await fetch('https://mocki.io/v1/f3e9e462-fbcf-4977-898c-1342055f515f');
  return res.json();
};
const Home = ({navigation}) => {
  const [app, setApp] = useContext(UserContext);
  const {data, status} = useQuery('user', fetchUser, {
    onSuccess: data => {
      setApp({username: data[0].name})
    },
  });
  console.log(status);
  console.log(data);

  const requestCameraPermission = async () => {
    try {
      console.log('requesting');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('Scanner');
        // setApp({nav: "scanner"})
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  if (status === 'loading') {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (status === 'error') {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  if (status === 'success') {
    return (
      <View>
        <Text>Hello from Home {data[0].name}</Text>
        <Button title={'Scan'} onPress={requestCameraPermission}></Button>
      </View>
    );
  }
  // </QueryClientProvider>
  // );
};

export default Home;
