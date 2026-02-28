import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { useScanStore } from '../../lib/stores';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();
  const { isAnalyzing, setAnalyzing, addScan } = useScanStore();

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
    if (cameraRef.current && !isAnalyzing) {
      try {
        setAnalyzing(true);
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo?.uri);

        // Simulate AI Analysis delay
        setTimeout(() => {
          const mockScan = {
            plotId: '1', // Default plot for now
            imageUrl: photo?.uri || '',
            healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
            anomalies: Math.random() > 0.7 ? ['Minor leaf spotting', 'Nitrient deficiency'] : [],
            tips: [
              'Maintain consistent watering schedule',
              'Check for pests under leaves',
              'Optimal sunlight exposure detected',
            ],
            happinessImpact: Math.floor(Math.random() * 10) + 5,
          };
          addScan(mockScan);
          setAnalyzing(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to take picture:', error);
        setAnalyzing(false);
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
        <View className="elevation-10 w-full flex-1 items-center rounded-t-[36px] bg-neutral-100 px-4 shadow-lg shadow-[#bcbec8]">
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
                {isAnalyzing && (
                  <View className="absolute inset-0 items-center justify-center bg-black/50">
                    <ActivityIndicator size="large" color="#8EDA1E" />
                    <Text className="mt-2 font-geist text-white">Analyzing...</Text>
                  </View>
                )}
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
