import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

const chartSvgXml = `
<svg width="238" height="206" viewBox="0 0 237.898 205.745" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 2">
<path id="Ellipse 3" d="M7.99999 102.873C3.58172 102.873 -0.0371121 99.2837 0.35923 94.8832C1.74235 79.5269 7.09935 64.5988 16.0813 51.2195C25.3879 37.3568 38.2937 25.5926 53.7393 16.8365C57.2479 14.8475 61.6439 16.0581 63.8657 19.4241L84.0193 49.9559C86.671 53.9731 85.1617 59.3727 81.2047 62.1134C75.4046 66.1307 70.4901 71.0547 66.7319 76.6528C62.9376 82.3047 60.4176 88.5011 59.2741 94.9142C58.4986 99.2638 54.9871 102.873 50.5688 102.873L7.99999 102.873Z" fill="#65F09F"/>
<path id="Ellipse 7" d="M151.402 11.4804C152.796 7.55512 156.978 5.33071 160.938 6.62284C169.09 9.28288 176.878 12.7089 184.161 16.8381C188.392 19.2366 189.085 24.9115 185.833 28.527L160.675 56.492C158.009 59.4553 153.59 59.9532 150.053 58.1149C148.38 57.2451 146.659 56.4462 144.897 55.7209C140.573 53.9413 138.015 49.1795 139.58 44.7736L151.402 11.4804Z" fill="#27ABF1"/>
<path id="Ellipse 8" d="M68.6212 19.3675C66.1463 15.2612 67.8107 9.89605 72.3092 8.23765C94.6218 0.011973 119.324 -2.1186 143.083 2.13961C147.669 2.96164 150.286 7.71309 148.829 12.1389L137.805 45.6128C136.498 49.5837 132.355 51.8275 128.212 51.2711C117.928 49.8903 107.401 50.8323 97.6606 54.0063C93.8087 55.2615 89.466 53.9538 87.3748 50.484L68.6212 19.3675Z" fill="#B6EA67"/>
<path id="Ellipse 4" d="M189.26 28.127C191.988 25.2268 196.455 24.7504 199.568 27.2325C202.969 29.9439 206.184 32.8241 209.196 35.8583C212.616 39.3031 211.708 44.9365 207.591 47.5079L173.283 68.9362C170.197 70.8639 166.24 70.2291 163.602 67.7226V67.7226C160.387 64.6683 159.771 59.4756 162.809 56.2459L189.26 28.127Z" fill="#F515B6"/>
<path id="Ellipse 6" d="M211.236 48.5055C214.685 46.4738 219.136 47.2856 221.392 50.5921C230.407 63.8046 235.888 78.5911 237.441 93.8624C237.889 98.2669 234.297 101.9 229.87 101.938L187.303 102.296C182.894 102.334 179.356 98.7683 178.536 94.4358C177.666 89.8402 176.089 85.3666 173.849 81.1347C171.582 76.8522 172.567 71.2856 176.742 68.8262L211.236 48.5055Z" fill="#23E5DB"/>
</g>
</svg>
`;

// Breakdown Item Component - Refactored to NativeWind
const BreakdownItem = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <View className="flex-row items-center justify-between py-1.5">
    <View className="flex-1 pr-1">
      <Text className="text-[#3C3E48] text-[13px] font-['GeistPixel'] leading-4" numberOfLines={2}>
        {label}
      </Text>
    </View>
    <View className="flex-row items-center">
      <View 
        className="w-2 h-2 rounded-full mr-1.5"
        style={{ backgroundColor: color }} 
      />
      <Text className="text-[#7B7F8E] text-[12px] font-['GeistPixel'] ">
        {value}
      </Text>
    </View>
  </View>
);

export default function FinanceScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#F9FAFA]" style={{ paddingTop: insets.top }}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 20 }}
      >
        <Text className="text-center text-[16px] text-[#1D1E20] mt-5 mb-2 font-['GeistPixel']">
          Projected Income this month
        </Text>

        {/* Income Arc Section */}
        <View className="items-center justify-center h-[180px] mb-2.5 relative mt-8">
          <SvgXml xml={chartSvgXml} width={238} height={206} />
          <View className="absolute top-[85px] items-cente -mt-8">
            <Text className="text-[26px] text-black font-['GeistPixel']">₱15000</Text>
            <Text className="text-[14px] text-[#979AAA] -mt-0.5 font-['GeistPixel']">Total Income</Text>
          </View>
        </View>

        {/* Income Breakdown Card */}
        <View className="bg-white rounded-2xl p-4 flex-row mb-6 shadow-sm shadow-[#E0E1E6] elevation-4">
          <View className="flex-1 pr-3">
            <BreakdownItem label="Rice sdfdfdfdfsfsdf" value="₱4500" color="#65F09F" />
            <BreakdownItem label="Carrots" value="₱2500" color="#27ABF1" />
            <BreakdownItem label="Pechay" value="₱2800" color="#23E5DB" />
          </View>
          <View className="w-[1px] bg-[#E0E1E6] my-1" />
          <View className="flex-1 pl-3">
            <BreakdownItem label="Mangoes" value="₱3500" color="#B6EA67" />
            <BreakdownItem label="Eggplant" value="₱1700" color="#F515B6" />
          </View>
        </View>

        <Text className="text-[22px] text-[#1D1E20] mb-4 font-['GeistPixel']">Expenses</Text>

        {/* Expenses Bar */}
        <View className="h-7 w-full flex-row mb-6">
          <View className="flex-[35] bg-[#65F09F] rounded-[6px] -mr-2 z-30" />
          <View className="flex-[28] bg-[#F515B6] rounded-[6px] -mr-2 z-20" />
          <View className="flex-[12] bg-[#27ABF1] rounded-[6px] full -mr-2 z-10" />
          <View className="flex-[25] bg-[#B6EA67] rounded-[6px] full" />
        </View>

        {/* Expenses Breakdown Card */}
        <View className="bg-white rounded-2xl p-4 flex-row shadow-sm shadow-[#E0E1E6] elevation-4">
          <View className="flex-1 pr-3">
            <BreakdownItem label="Fertilizer" value="₱4500" color="#65F09F" />
            <BreakdownItem label="Water" value="₱2500" color="#27ABF1" />
          </View>
          <View className="w-[1px] bg-[#E0E1E6] my-1" />
          <View className="flex-1 pl-3">
            <BreakdownItem label="Machinery" value="₱3500" color="#B6EA67" />
            <BreakdownItem label="Transportation /Gas" value="₱1700" color="#F515B6" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
