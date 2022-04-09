import * as React from 'react';

import {View, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

const Scanner = ({navigation}) => {
  const [hasPermission, setHasPermission] = React.useState("authorized");
  const devices = useCameraDevices();
  const device = devices.back;
  
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);
  // React.useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     console.log(status)
  //     setHasPermission(status !== 'authorized');
  //     console.log(hasPermission)
  //   })();
  // }, []);

  return (
    device != null &&
    hasPermission &&
    (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={1}
        />
        {barcodes.map((barcode, idx) => (
          <View style={styles.result}>
            <Text key={idx} style={styles.barcodeTextURL}>
              {barcode.displayValue}
            </Text>
          </View>
        ))}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  result: {
    backgroundColor: "dodgerblue"
  }
});
export default Scanner;