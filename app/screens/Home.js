import React from 'react';
import {Text} from 'react-native'

const Home = ({navigation, route}) => {
  return (
    <Text>Hello from Home ,{route.params.name.firstName}</Text>
  );
}

export default Home;