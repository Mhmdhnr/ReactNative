import React from 'react';
import {Text, View, Button, PermissionsAndroid} from 'react-native'

const Home = ({navigation, route}) => {
  const requestCameraPermission = async () => {
    try {
      console.log("requesting");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate("Scanner")
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <Text>Hello from Home ,{route.params.name.firstName}</Text>
      <Button title={"Scan"} onPress={requestCameraPermission}></Button>
    </View>
  );
}

export default Home;