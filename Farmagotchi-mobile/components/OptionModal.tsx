import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, G } from 'react-native-svg';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SproutIcon = ({ width = 115, height = 115 }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 9.536V7C14 5.93913 14.4214 4.92172 15.1716 4.17157C15.9217 3.42143 16.9391 3 18 3H19.5C19.6326 3 19.7598 3.05268 19.8536 3.14645C19.9473 3.24021 20 3.36739 20 3.5V5C20 6.06087 19.5786 7.07828 18.8284 7.82843C18.0783 8.57857 17.0609 9 16 9C14.9391 9 13.9217 9.42143 13.1716 10.1716C12.4214 10.9217 12 11.9391 12 13M12 13C12 15 13 16 13 18C13 19.0819 12.6491 20.1345 12 21M12 13C12 12.0714 11.7414 11.1612 11.2533 10.3713C10.7651 9.58146 10.0666 8.94313 9.23607 8.52786C8.40554 8.1126 7.47578 7.93681 6.55097 8.0202C5.62616 8.10359 4.74285 8.44286 4 9C4 9.92856 4.25857 10.8388 4.74675 11.6287C5.23492 12.4185 5.9334 13.0569 6.76393 13.4721C7.59446 13.8874 8.52422 14.0632 9.44903 13.9798C10.3738 13.8964 11.2572 13.5571 12 13ZM5 21H19"
      stroke="#71AC17"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SackIcon = ({ width = 107, height = 107 }) => (
  <Svg width={width} height={height} viewBox="0 0 103 103" fill="none">
    <G opacity="0.5">
      <Path
        d="M83.61 85.6958H23.8118M83.61 85.6958C95.0384 64.092 95.0384 41.2948 83.61 17.3039M83.61 85.6958L87.9068 98.4968H19.515L23.8118 85.6958M23.8118 85.6958C12.4132 64.1219 12.4132 41.3246 23.8118 17.3039M23.8118 17.3039H83.61M23.8118 17.3039L19.515 4.50281H87.9068L83.61 17.3039M55.2775 69.4034C54.2816 70.5339 53.0555 71.4383 51.6814 72.0559C50.3072 72.6735 48.8169 72.99 47.3104 72.9842C45.3918 72.9891 43.5073 72.4779 41.8542 71.5043C40.201 70.5306 38.8402 69.1303 37.9142 67.45C36.9882 65.7697 36.5311 63.8714 36.5908 61.9537C36.6506 60.0361 37.2249 58.1699 38.2537 56.5505C39.2825 54.9311 40.7278 53.6182 42.4383 52.7493C44.1489 51.8804 46.0616 51.4876 47.9761 51.6118C49.8906 51.7361 51.7364 52.373 53.3203 53.4558C54.9041 54.5385 56.1675 56.0273 56.9783 57.7661M36.6129 34.4019H70.8089M70.8089 64.3009C70.8089 69.0224 66.9814 72.8499 62.2599 72.8499C57.5384 72.8499 53.7109 69.0224 53.7109 64.3009C53.7109 59.5794 57.5384 55.7519 62.2599 55.7519C66.9814 55.7519 70.8089 59.5794 70.8089 64.3009Z"
        stroke="#71AC17"
        strokeWidth="8.95181"
        strokeMiterlimit="10"
      />
    </G>
  </Svg>
);

export default function OptionModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const {bottom: bottomInset} = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="absolute inset-0">
        <Pressable className="absolute inset-0 bg-neutral-900/20" onPress={onClose} />

        <Animated.View
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(300)}
          className="absolute w-full items-center rounded-t-[36px] bg-neutral-100 px-4 pb-[21px] pt-2 shadow-[0px_0px_18.6px_0px_#bcbec8]" style={{
            bottom: bottomInset
          }}>
          <Pressable
            className="mb-[10px] items-center justify-center rounded-2xl bg-neutral-200 px-3 py-1"
            onPress={onClose}>
            <MaterialCommunityIcons name="close" size={18} color="#1d1b20" />
          </Pressable>

          <View className="w-full max-w-[380px] flex-row gap-2 self-center">
            {/* Left Button */}
            <Pressable
              className="h-[103px] flex-1 justify-end overflow-hidden rounded-[19px] bg-primary-400 p-4"
              onPress={() => {
                onClose();
                setTimeout(() => router.push('/add-plot'), 300);
              }}>
              <View className="absolute left-[-22px] top-[-6px] opacity-20">
                <SproutIcon />
              </View>
              <Text className="font-geist text-[14px] text-primary-900">New crop field</Text>
            </Pressable>

            {/* Right Button */}
            <Pressable
              className="h-[103px] flex-1 justify-end overflow-hidden rounded-[19px] bg-primary-100 p-4"
              onPress={() => {
                onClose();
                setTimeout(() => router.push('/add-resource'), 300);
              }}>
              <View className="absolute left-[83px] top-[-2px]">
                <SackIcon />
              </View>
              <Text className="font-geist text-[14px] text-primary-900">New Resource</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
