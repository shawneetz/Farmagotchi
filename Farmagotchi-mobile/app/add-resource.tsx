import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinanceStore, TransactionType } from 'lib/stores';

export default function AddResourceScreen() {
  const insets = useSafeAreaInsets();
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSave = () => {
    if (!name.trim() || !cost.trim() || isNaN(Number(cost))) return;

    addTransaction({
      name: name.trim(),
      cost: Number(cost),
      type,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#F9FAFA' }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
        }}>
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="-ml-2 p-2">
            <Text className="font-geist text-[16px] text-neutral-500">Cancel</Text>
          </Pressable>
          <Text className="font-geist text-[20px] text-neutral-900">Add Resource</Text>
          <View className="w-10" />
        </View>

        <View className="mb-6 flex-row rounded-xl bg-neutral-200 p-1">
          <Pressable
            onPress={() => setType('expense')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              paddingVertical: 12,
              backgroundColor: type === 'expense' ? 'white' : 'transparent',
            }}>
            <Text style={{
              fontFamily: 'GeistPixel',
              fontSize: 16,
              color: type === 'expense' ? '#F515B6' : '#9ca3af',
            }}>
              Expense
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setType('income')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              paddingVertical: 12,
              backgroundColor: type === 'income' ? 'white' : 'transparent',
            }}>
            <Text style={{
              fontFamily: 'GeistPixel',
              fontSize: 16,
              color: type === 'income' ? '#65F09F' : '#9ca3af',
            }}>
              Income
            </Text>
          </Pressable>
        </View>

        <View className="mb-6">
          <Text className="mb-2 font-geist text-[14px] text-neutral-500">
            Resource Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Seeds, Fertilizer, Carrots"
            className="rounded-xl bg-white p-4 font-geist text-[16px] text-neutral-900 shadow-sm"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View className="mb-8">
          <Text className="mb-2 font-geist text-[14px] text-neutral-500">Amount</Text>
          <View className="flex-row items-center rounded-xl bg-white p-4 shadow-sm">
            <Text className="mr-2 font-geist text-[20px] text-neutral-900">₱</Text>
            <TextInput
              value={cost}
              onChangeText={setCost}
              placeholder="0.00"
              keyboardType="numeric"
              className="flex-1 font-geist text-[20px] text-neutral-900"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!name.trim() || !cost.trim() || isNaN(Number(cost))}
          className={`items-center justify-center rounded-xl py-4 shadow-sm ${
            !name.trim() || !cost.trim() || isNaN(Number(cost))
              ? 'bg-neutral-300'
              : type === 'expense'
                ? 'bg-[#F515B6]'
                : 'bg-[#65F09F]'
          }`}>
          <Text
            className={`font-geist text-[18px] ${
              !name.trim() || !cost.trim() || isNaN(Number(cost))
                ? 'text-neutral-500'
                : 'text-white'
            }`}>
            Save Resource
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
