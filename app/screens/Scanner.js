import React, {useContext} from 'react';
import {View, StyleSheet, Text, PermissionsAndroid} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {UserContext} from '../../App';
import { colors } from '../styles/variables';

const Scanner = ({navigation}) => {
  const [app, setApp] = useContext(UserContext);
  // const [hasPermission, setHasPermission] = React.useState('authorized');
  const hasPermission = true;
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });


  
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={1}
        />
        {barcodes.map((barcode, idx) => (
          idx === 0 &&
          <View style={styles.result}>
            <Text key={idx} style={styles.barcodeTextURL}>
              {app.username + ' is ' + barcode.displayValue}
            </Text>
          </View>
        ))}
      </>
    )
  );
};

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  result: {
    backgroundColor: 'rgba(6, 184, 157, 0.5)',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
export default Scanner;
