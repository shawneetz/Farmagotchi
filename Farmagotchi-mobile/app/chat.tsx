import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useChatStore, useTaskStore, useFinanceStore } from '../lib/stores';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const resetChat = useChatStore((state) => state.resetChat);

  const tasks = useTaskStore((state) => state.tasks);
  const transactions = useFinanceStore((state) => state.transactions);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const getStubResponse = () => {
    const dailyTasks = tasks.filter((t) => t.category === 'daily');
    const allTasksDone = dailyTasks.every((t) => t.isCompleted);
    const netProfit = transactions.reduce(
      (acc, curr) => (curr.type === 'income' ? acc + curr.cost : acc - curr.cost),
      0
    );

    const responses = [
      "I'm feeling great today! The soil moisture is perfect.",
      'Thanks for chatting! I love being your Mango tree.',
      "Did you know Mangoes are known as the 'king of fruits'?",
    ];

    if (!allTasksDone) {
      responses.push("I'm feeling a bit neglected. Have you checked my daily tasks yet?");
    } else {
      responses.push('I feel so well-cared for! Thanks for completing all my tasks.');
    }

    if (netProfit > 10000) {
      responses.push("We're doing so well financially! I'm proud of our progress.");
    } else if (netProfit < 0) {
      responses.push("Money is a bit tight lately, but I'll keep growing my best!");
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = inputText.trim();
    addMessage({ role: 'user', content: userMessage });
    setInputText('');

    // Trigger stub AI response
    setIsTyping(true);
    setTimeout(() => {
      const response = getStubResponse();
      addMessage({ role: 'assistant', content: response });
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isUser = item.role === 'user';
    return (
      <View
        className={`mb-4 flex-row ${isUser ? 'justify-end' : 'items-end justify-start'}`}
        key={item.id}>
        {!isUser && (
          <View className="mr-2 h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
            <Image
              source={require('../assets/tree.png')}
              style={{ width: '140%', height: '140%', marginTop: -4 }}
              contentFit="contain"
            />
          </View>
        )}
        <View
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            isUser ? 'rounded-tr-none bg-[#71ac17]' : 'rounded-tl-none bg-neutral-100'
          }`}>
          <Text className={`font-geist text-sm ${isUser ? 'text-white' : 'text-[#28292f]'}`}>
            {item.content}
          </Text>
          <Text
            className={`mt-1 font-geist text-[10px] ${
              isUser ? 'text-white/70' : 'text-neutral-400'
            }`}>
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-neutral-100 px-4 py-4">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-50">
            <Feather name="chevron-left" size={24} color="#28292f" />
          </Pressable>
          <View>
            <Text className="font-geist text-lg font-bold text-[#28292f]">Mango tree</Text>
            <Text className="font-geist text-xs text-[#71ac17]">Online • Your Pet</Text>
          </View>
        </View>
        <Pressable
          onPress={resetChat}
          className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-50">
          <MaterialCommunityIcons name="refresh" size={22} color="#71ac17" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isTyping ? (
              <View className="mb-4 flex-row items-end justify-start">
                <View className="mr-2 h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                  <Image
                    source={require('../assets/tree.png')}
                    style={{ width: '140%', height: '140%', marginTop: -4 }}
                    contentFit="contain"
                  />
                </View>
                <View className="rounded-2xl rounded-tl-none bg-neutral-100 px-4 py-3">
                  <Text className="font-geist text-sm italic text-neutral-400">Typing...</Text>
                </View>
              </View>
            ) : null
          }
        />

        {/* Input Area */}
        <View
          className="border-t border-neutral-100 bg-white px-4 py-4"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <View className="flex-row items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-2">
            <TextInput
              className="flex-1 font-geist text-sm text-[#28292f]"
              placeholder="Ask your crop anything..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <Pressable
              onPress={handleSend}
              disabled={inputText.trim() === '' || isTyping}
              className={`h-10 w-10 items-center justify-center rounded-full ${
                inputText.trim() === '' || isTyping ? 'opacity-30' : 'bg-[#71ac17]'
              }`}>
              <Feather name="send" size={18} color="white" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
