import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinanceStore, TransactionType, Transaction } from 'lib/stores';
import { Feather } from '@expo/vector-icons';

export default function AddResourceScreen() {
  const insets = useSafeAreaInsets();
  const {
    transactions,
    addTransaction,
    editTransaction,
    removeTransaction,
    clearTransactions,
  } = useFinanceStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSave = () => {
    if (!name.trim() || !cost.trim() || isNaN(Number(cost))) return;

    if (editingId) {
      editTransaction(editingId, {
        name: name.trim(),
        cost: Number(cost),
        type,
      });
      setEditingId(null);
    } else {
      addTransaction({
        name: name.trim(),
        cost: Number(cost),
        type,
      });
    }

    setName('');
    setCost('');
    setType('expense');
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setName(transaction.name);
    setCost(transaction.cost.toString());
    setType(transaction.type);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Remove Resource', 'Are you sure you want to remove this resource?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeTransaction(id) },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Resources',
      'Are you sure you want to delete all resources? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearTransactions },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#F9FAFA' }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled">
        
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="-ml-2 p-2">
            <Text className="font-geist text-[16px] text-neutral-500">Back</Text>
          </Pressable>
          <Text className="font-geist text-[20px] text-neutral-900">Manage Resources</Text>
          <View className="w-10" />
        </View>

        {/* Input Form */}
        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-neutral-100">
          <Text className="mb-4 font-geist text-[16px] font-bold text-neutral-900">
            {editingId ? 'Edit Resource' : 'Add New Resource'}
          </Text>

          <View className="mb-4 flex-row rounded-xl bg-neutral-200 p-1">
            <Pressable
              onPress={() => setType('expense')}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                paddingVertical: 10,
                backgroundColor: type === 'expense' ? 'white' : 'transparent',
              }}>
              <Text style={{ fontFamily: 'GeistPixel', fontSize: 14, color: type === 'expense' ? '#F515B6' : '#9ca3af' }}>
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
                paddingVertical: 10,
                backgroundColor: type === 'income' ? 'white' : 'transparent',
              }}>
              <Text style={{ fontFamily: 'GeistPixel', fontSize: 14, color: type === 'income' ? '#65F09F' : '#9ca3af' }}>
                Income
              </Text>
            </Pressable>
          </View>

          <View className="mb-4">
            <Text className="mb-1 font-geist text-[13px] text-neutral-500">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Seeds, Fertilizer"
              className="rounded-xl bg-neutral-100 px-4 py-3 font-geist text-[15px] text-neutral-900"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mb-6">
            <Text className="mb-1 font-geist text-[13px] text-neutral-500">Amount</Text>
            <View className="flex-row items-center rounded-xl bg-neutral-100 px-4 py-3">
              <Text className="mr-2 font-geist text-[18px] text-neutral-900">₱</Text>
              <TextInput
                value={cost}
                onChangeText={setCost}
                placeholder="0.00"
                keyboardType="numeric"
                className="flex-1 font-geist text-[16px] text-neutral-900"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View className="flex-row gap-3">
            {editingId && (
              <Pressable
                onPress={() => {
                  setEditingId(null);
                  setName('');
                  setCost('');
                  setType('expense');
                }}
                className="flex-1 items-center justify-center rounded-xl bg-neutral-200 py-3">
                <Text className="font-geist text-[15px] text-neutral-700">Cancel</Text>
              </Pressable>
            )}
            <Pressable
              onPress={handleSave}
              disabled={!name.trim() || !cost.trim() || isNaN(Number(cost))}
              className={`flex-[2] items-center justify-center rounded-xl py-3 ${
                !name.trim() || !cost.trim() || isNaN(Number(cost))
                  ? 'bg-neutral-300'
                  : type === 'expense'
                    ? 'bg-[#F515B6]'
                    : 'bg-[#65F09F]'
              }`}>
              <Text
                className={`font-geist text-[15px] ${
                  !name.trim() || !cost.trim() || isNaN(Number(cost)) ? 'text-neutral-500' : 'text-white'
                }`}>
                {editingId ? 'Update Resource' : 'Add Resource'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* List of Resources */}
        <View className="mt-4 flex-row items-center justify-between mb-4">
          <Text className="font-geist text-[18px] text-neutral-900">Current Resources</Text>
          {transactions.length > 0 && (
            <Pressable onPress={handleClearAll}>
              <Text className="font-geist text-[14px] text-[#F515B6]">Clear All</Text>
            </Pressable>
          )}
        </View>

        {transactions.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="font-geist text-[14px] text-neutral-400">No resources found.</Text>
          </View>
        ) : (
          transactions.map((t) => (
            <View key={t.id} className="mb-3 flex-row items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-neutral-100">
              <View className="flex-1 pr-4">
                <Text className="font-geist text-[15px] font-bold text-neutral-900" numberOfLines={1}>{t.name}</Text>
                <Text className={`font-geist text-[13px] ${t.type === 'income' ? 'text-[#65F09F]' : 'text-[#F515B6]'}`}>
                  {t.type === 'income' ? '+' : '-'} ₱{t.cost.toLocaleString()}
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Pressable onPress={() => handleEdit(t)} className="p-2">
                  <Feather name="edit-2" size={18} color="#7B7F8E" />
                </Pressable>
                <Pressable onPress={() => handleDelete(t.id)} className="p-2">
                  <Feather name="trash-2" size={18} color="#C85A5A" />
                </Pressable>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
