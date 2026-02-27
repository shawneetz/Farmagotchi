import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-gifted-charts';
import { useFinanceStore } from 'lib/stores';
import { useRouter } from 'expo-router';

const COLORS = ['#65F09F', '#27ABF1', '#23E5DB', '#B6EA67', '#F515B6'];

// Breakdown Item Component
const BreakdownItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <View className="flex-row items-center justify-between py-1.5">
    <View className="flex-1 pr-1">
      <Text className="font-['GeistPixel'] text-[13px] leading-4 text-[#3C3E48]" numberOfLines={2}>
        {label}
      </Text>
    </View>
    <View className="flex-row items-center">
      <View className="mr-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <Text className="font-['GeistPixel'] text-[12px] text-[#7B7F8E] ">{value}</Text>
    </View>
  </View>
);

export default function FinanceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const transactions = useFinanceStore((state) => state.transactions);

  const incomes = transactions
    .filter((t) => t.type === 'income')
    .sort((a, b) => b.cost - a.cost);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.cost - a.cost);

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.cost, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.cost, 0);

  const pieData = incomes.map((item, index) => ({
    value: item.cost,
    color: COLORS[index % COLORS.length],
  }));

  const renderBreakdown = (items: typeof transactions, isExpense = false) => {
    if (items.length === 0) {
      return (
        <View className="elevation-4 mb-6 flex-row rounded-2xl bg-white p-4 shadow-sm shadow-[#E0E1E6]">
          <Text className="font-['GeistPixel'] text-[13px] text-[#7B7F8E]">No items yet.</Text>
        </View>
      );
    }

    const half = Math.ceil(items.length / 2);
    const left = items.slice(0, half);
    const right = items.slice(half);

    return (
      <View className="elevation-4 mb-6 flex-row rounded-2xl bg-white p-4 shadow-sm shadow-[#E0E1E6]">
        <View className="flex-1 pr-3">
          {left.map((item, index) => (
            <BreakdownItem
              key={item.id}
              label={item.name}
              value={`₱${item.cost}`}
              color={COLORS[index % COLORS.length]}
            />
          ))}
        </View>
        <View className="my-1 w-[1px] bg-[#E0E1E6]" />
        <View className="flex-1 pl-3">
          {right.map((item, index) => (
            <BreakdownItem
              key={item.id}
              label={item.name}
              value={`₱${item.cost}`}
              color={COLORS[(index + half) % COLORS.length]}
            />
          ))}
        </View>
      </View>
    );
  };

  // Render proportional segments for expenses bar
  const renderExpenseBar = () => {
    if (expenses.length === 0 || totalExpenses === 0) return null;

    return (
      <View className="mb-6 h-7 w-full flex-row">
        {expenses.map((expense, index) => (
          <View
            key={expense.id}
            className={`rounded-[6px] ${index !== expenses.length - 1 ? '-mr-2' : ''}`}
            style={{
              flex: expense.cost,
              backgroundColor: COLORS[index % COLORS.length],
              zIndex: 100 - index,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F9FAFA]" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 20 }}>
        <View className="mb-2 mt-8 flex-row items-center justify-between">
          <Text className="font-['GeistPixel'] text-[16px] text-[#1D1E20]">
            Projected Income this month
          </Text>
          <Pressable
            onPress={() => router.push('/add-resource')}
            className="rounded-lg bg-neutral-200 px-3 py-1.5">
            <Text className="font-['GeistPixel'] text-[12px] text-neutral-700">Manage</Text>
          </Pressable>
        </View>

        {/* Income Arc Section */}
        <View className="mb-2 mt-8 items-center justify-center overflow-hidden h-[150px]">
          <PieChart
            donut
            semiCircle
            data={pieData}
            radius={110}
            innerRadius={80}
            backgroundColor="#F9FAFA"
            centerLabelComponent={() => (
              <View className="items-center justify-center -mt-6">
                <Text className="font-['GeistPixel'] text-[26px] text-black">₱{totalIncome}</Text>
                <Text className="-mt-1 font-['GeistPixel'] text-[14px] text-[#979AAA]">
                  Total Income
                </Text>
              </View>
            )}
          />
        </View>

        {/* Income Breakdown Card */}
        {renderBreakdown(incomes)}

        <View className="mb-4 flex-row items-end justify-between">
          <Text className="font-['GeistPixel'] text-[22px] text-[#1D1E20]">Expenses</Text>
          <Text className="font-['GeistPixel'] text-[18px] text-[#7B7F8E] pb-0.5">₱{totalExpenses}</Text>
        </View>

        {/* Expenses Bar */}
        {renderExpenseBar()}

        {/* Expenses Breakdown Card */}
        {renderBreakdown(expenses, true)}
      </ScrollView>
    </View>
  );
}

