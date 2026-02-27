import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 items-center justify-center bg-neutral-100 p-4">
        <Text className="mb-4 text-center text-neutral-900" style={{ fontFamily: 'GeistPixel' }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="rounded-xl bg-primary-600 px-6 py-3">
          <Text className="font-bold text-white">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo?.uri);
        // Additional logic for handling the photo can be added here
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    }
  };

  const toggleFlash = () => {
    setTorch((current) => !current);
  };

  return (
    <View className="flex-1 bg-neutral-100" style={{ paddingTop: insets.top }}>
      {/* Background/Base View */}
      <View className="flex-1 items-center justify-center">
        {/* Modal-like Container */}
        <View
          className="w-full flex-1 items-center rounded-t-[36px] bg-neutral-100 px-4"
          style={styles.modalShadow}>
          {/* Header Section */}
          <View className="mt-8 items-center">
            <Text className="text-[24px] text-neutral-900" style={{ fontFamily: 'GeistPixel' }}>
              AI CROP ANALYSIS
            </Text>
            <Text className="mt-1 text-center text-[14px] text-[#575647]">
              Take a picture that visible in the frame
            </Text>
          </View>

          {/* Camera Frame Area */}
          <View className="w-full flex-1 items-center justify-center">
            <View className="rounded-full border-[11px] border-primary-100" style={{ padding: 11 }}>
              <View
                className="overflow-hidden rounded-full border-2 border-primary-600"
                style={{ width: 275, height: 275 }}>
                <CameraView ref={cameraRef} style={{ flex: 1 }} enableTorch={torch} facing="back" />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 pb-32">
            <TouchableOpacity
              onPress={takePicture}
              className="items-center justify-center rounded-xl bg-primary-400"
              style={{ width: 56, height: 56 }}>
              <Image
                source={require('../../assets/lucide/aperture.svg')}
                style={{ width: 24, height: 24 }}
                tintColor="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleFlash}
              className={`items-center justify-center rounded-xl ${torch ? 'bg-primary-200' : 'bg-neutral-200'}`}
              style={{ width: 56, height: 56 }}>
              <Image
                source={require('../../assets/lucide/flashlight.svg')}
                style={{ width: 24, height: 24 }}
                tintColor="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalShadow: {
    shadowColor: '#bcbec8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 18.6,
    elevation: 10,
  },
});
