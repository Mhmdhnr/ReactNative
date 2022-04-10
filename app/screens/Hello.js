import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
const Hello = ({navigation}) => {
  const [name, setName] = React.useState({
    firstName: "User",
    lastName: ""
  });
  
  return (
    <View style={styles.hello}>
      <Text>Hello {name.firstName} From Native</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => {
          setName({firstName: newText});
        }}
        value={name.firstName}
        placeholder={"Enter your first name"}
      />
      <Button touchSoundDisabled={true} title={"Go Home"} onPress={() => {navigation.navigate("Home", {name: name})}}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  hello: {
    alignItems: 'center'
  },
  input: {
    // alignSelf: 'center'
  }
});
export default Hello;
