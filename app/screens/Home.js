import {colors} from '../styles/variables.js';
import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import {useQuery} from 'react-query';
import {UserContext} from '../../App';

const fetchUser = async () => {
  const res = await fetch(
    'https://mocki.io/v1/f3e9e462-fbcf-4977-898c-1342055f515f',
  );
  return res.json();
};
const Home = ({navigation}) => {
  const [app, setApp] = useContext(UserContext);
  const {data, status} = useQuery('user', fetchUser, {
    onSuccess: data => {
      setApp({username: data[0].name});
    },
  });
  console.log(status);
  console.log(data);

  const requestCameraPermission = async () => {
    try {
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
        setApp({nav: 'scanner'});
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  if (status === 'success') {
    return (
      <View style={styles.total}>
        <Text style={styles.heading}>Hello {data[0].name}</Text>
        <Pressable style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Scan</Text>
        </Pressable>
      </View>
    );
  }
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
};
const styles = StyleSheet.create({
  total: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default Home;
