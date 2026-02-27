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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

// Types for our form data
type PlotFormData = {
  name: string;
  location: string;
  photoUri: string | null;
  initialCosts: string;
  initialProfits: string;
  dailyTasks: string[];
};

const TOTAL_STEPS = 5;

export default function AddPlotScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PlotFormData>({
    name: '',
    location: '',
    photoUri: null,
    initialCosts: '',
    initialProfits: '',
    dailyTasks: [],
  });

  const [newTaskInput, setNewTaskInput] = useState('');

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleSave = () => {
    // Here you would dispatch to a central store
    // e.g. addPlot(formData);
    router.replace('/');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photoUri: result.assets[0].uri });
    }
  };

  const addTask = () => {
    if (newTaskInput.trim()) {
      setFormData({
        ...formData,
        dailyTasks: [...formData.dailyTasks, newTaskInput.trim()],
      });
      setNewTaskInput('');
    }
  };

  const removeTask = (index: number) => {
    setFormData({
      ...formData,
      dailyTasks: formData.dailyTasks.filter((_, i) => i !== index),
    });
  };

  // ---------------------------------------------------------------------------
  // Step Content Renders
  // ---------------------------------------------------------------------------

  const renderStep1 = () => (
    <View className="flex-1 justify-center">
      <Text className="mb-2 font-geist text-2xl text-neutral-900">Name your new crop field</Text>
      <Text className="mb-6 font-geist text-base text-neutral-500">
        Give your new plot a name to identify it.
      </Text>
      <TextInput
        className="rounded-xl bg-white px-4 py-4 font-geist text-lg text-neutral-900 shadow-sm"
        placeholder="e.g. Tomato Patch A"
        placeholderTextColor="#9ca3af"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        autoFocus
      />
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1 justify-center">
      <Text className="mb-2 font-geist text-2xl text-neutral-900">Where is it located?</Text>
      <Text className="mb-6 font-geist text-base text-neutral-500">
        This helps us fetch the most accurate weather data.
      </Text>
      <TextInput
        className="rounded-xl bg-white px-4 py-4 font-geist text-lg text-neutral-900 shadow-sm"
        placeholder="e.g. North Field"
        placeholderTextColor="#9ca3af"
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
        autoFocus
      />
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 justify-center">
      <Text className="mb-2 font-geist text-2xl text-neutral-900">Add a photo of your crop</Text>
      <Text className="mb-6 font-geist text-base text-neutral-500">
        We&apos;ll use this to track its growth and analyze its health later.
      </Text>

      <Pressable
        onPress={pickImage}
        className="h-[200px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
        {formData.photoUri ? (
          <Image
            source={{ uri: formData.photoUri }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : (
          <View className="items-center">
            <MaterialCommunityIcons name="camera-plus" size={48} color="#9ca3af" />
            <Text className="mt-2 font-geist text-neutral-500">Tap to upload a photo</Text>
          </View>
        )}
      </Pressable>
    </View>
  );

  const renderStep4 = () => (
    <View className="flex-1 justify-center">
      <Text className="mb-2 font-geist text-2xl text-neutral-900">Initial Finances</Text>
      <Text className="mb-6 font-geist text-base text-neutral-500">
        Set a baseline for your revenue tracking.
      </Text>

      <View className="mb-4">
        <Text className="mb-2 font-geist text-sm text-neutral-700">Initial Costs (₱)</Text>
        <TextInput
          className="rounded-xl bg-white px-4 py-4 font-geist text-lg text-neutral-900 shadow-sm"
          placeholder="0"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          value={formData.initialCosts}
          onChangeText={(text) => setFormData({ ...formData, initialCosts: text })}
        />
      </View>

      <View>
        <Text className="mb-2 font-geist text-sm text-neutral-700">
          Expected Initial Profit (₱)
        </Text>
        <TextInput
          className="rounded-xl bg-white px-4 py-4 font-geist text-lg text-neutral-900 shadow-sm"
          placeholder="0"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          value={formData.initialProfits}
          onChangeText={(text) => setFormData({ ...formData, initialProfits: text })}
        />
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View className="flex-1 justify-center">
      <Text className="mb-2 font-geist text-2xl text-neutral-900">Daily Tasks</Text>
      <Text className="mb-6 font-geist text-base text-neutral-500">
        What do you need to do every day to take care of this plot?
      </Text>

      <View className="mb-4 flex-row items-center gap-2">
        <TextInput
          className="flex-1 rounded-xl bg-white px-4 py-3 font-geist text-base text-neutral-900 shadow-sm"
          placeholder="e.g. Water plants"
          placeholderTextColor="#9ca3af"
          value={newTaskInput}
          onChangeText={setNewTaskInput}
          onSubmitEditing={addTask}
        />
        <Pressable
          onPress={addTask}
          className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-primary-400">
          <MaterialCommunityIcons name="plus" size={24} color="#1d1b20" />
        </Pressable>
      </View>

      <ScrollView className="max-h-[200px]" showsVerticalScrollIndicator={false}>
        {formData.dailyTasks.map((task, index) => (
          <View
            key={index}
            className="mb-2 flex-row items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
            <Text className="font-geist text-neutral-900">{task}</Text>
            <Pressable onPress={() => removeTask(index)}>
              <MaterialCommunityIcons name="close" size={20} color="#ef4444" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-neutral-100">
      <View
        className="flex-1 px-4"
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}>
        {/* Header / Progress */}
        <View className="mb-8 flex-row items-center">
          <Pressable
            onPress={handleBack}
            className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <MaterialCommunityIcons name="arrow-left" size={20} color="#1d1b20" />
          </Pressable>
          <View className="flex-1 flex-row gap-2">
            {[...Array(TOTAL_STEPS)].map((_, i) => (
              <View
                key={i}
                className={`h-2 flex-1 rounded-full ${step >= i + 1 ? 'bg-primary-400' : 'bg-neutral-200'}`}
              />
            ))}
          </View>
        </View>

        {/* Form Content */}
        <View className="flex-1">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </View>

        {/* Footer Actions */}
        <View className="mt-8 flex-row justify-end ">
          { /* slooooopp */}
          <Pressable
            onPress={handleNext}
            style={{ opacity: step === 1 && !formData.name ? 0.5 : 1 }}
            className='rounded-full overflow-hidden'
            disabled={step === 1 && !formData.name}>
            <LinearGradient
              colors={['#71ac17', '#8eda1e']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="flex-row items-center justify-center px-6 py-3 shadow-sm">
              <Text className="font-geist text-[16px] text-white">
                {step === TOTAL_STEPS ? 'Create Plot' : 'Next'}
              </Text>
              {step < TOTAL_STEPS && (
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color="#ffffff"
                  style={{ marginLeft: 6 }}
                />
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
