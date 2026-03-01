import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useScanStore } from '../../lib/stores';

const DEMO_IMAGE_URL =
  'https://cdn.shopify.com/s/files/1/0039/6096/3118/files/hapus_tree_height.jpg?v=1739429208';

export default function ScanScreen() {
  const [torch, setTorch] = useState(false);
  const insets = useSafeAreaInsets();
  const { isAnalyzing, setAnalyzing, addScan } = useScanStore();

  const takePicture = async () => {
    if (!isAnalyzing) {
      try {
        setAnalyzing(true);

        // Simulate AI Analysis delay
        setTimeout(() => {
          const mockScan = {
            plotId: '1', // Default plot for now
            imageUrl: DEMO_IMAGE_URL,
            healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
            anomalies: Math.random() > 0.7 ? ['Minor leaf spotting', 'Nutrient deficiency'] : [],
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
        console.error('Failed to process image:', error);
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
              Take a picture of your crop close up for analysis.
            </Text>
          </View>

          {/* Camera Frame Area (Demo Mode) */}
          <View className="w-full flex-1 items-center justify-center">
            <View className="rounded-full border-[11px] border-primary-100" style={{ padding: 11 }}>
              <View
                className="overflow-hidden rounded-full border-2 border-primary-600"
                style={{ width: 275, height: 275 }}>
                <Image
                  source={{ uri: DEMO_IMAGE_URL }}
                  style={{ flex: 1 }}
                  contentFit="cover"
                  transition={1000}
                />
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

