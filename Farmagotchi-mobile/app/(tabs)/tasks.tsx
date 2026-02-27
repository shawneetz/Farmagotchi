import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTaskStore, TaskCategory, Task } from '../../lib/stores';

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const { tasks, addTask, editTask, removeTask, toggleTaskCompletion, resetAllTasks } =
    useTaskStore();

  const [isModalVisible, setModalVisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<TaskCategory>('daily');

  const dailyTasks = tasks.filter((t) => t.category === 'daily');
  const weeklyTasks = tasks.filter((t) => t.category === 'weekly');
  const miscTasks = tasks.filter((t) => t.category === 'miscellaneous');

  const openModal = (task?: Task) => {
    if (task) {
      setEditingTaskId(task.id);
      setTaskTitle(task.title);
      setTaskCategory(task.category);
    } else {
      setEditingTaskId(null);
      setTaskTitle('');
      setTaskCategory('daily');
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskCategory('daily');
  };

  const handleSave = () => {
    if (!taskTitle.trim()) return;

    if (editingTaskId) {
      editTask(editingTaskId, { title: taskTitle.trim(), category: taskCategory });
    } else {
      addTask({
        title: taskTitle.trim(),
        category: taskCategory,
        isCompleted: false,
        happinessReward: 10, // Default reward
      });
    }
    closeModal();
  };

  const renderTask = (task: Task) => (
    <View
      key={task.id}
      className="mb-3 flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <Pressable
        onPress={() => toggleTaskCompletion(task.id)}
        className="flex-1 flex-row items-center pr-4">
        <Feather
          name={task.isCompleted ? 'check-circle' : 'circle'}
          size={24}
          color={task.isCompleted ? '#71AC17' : '#979AAA'}
        />
        <Text
          className={`ml-3 flex-1 font-geist text-base ${
            task.isCompleted ? 'text-neutral-500 line-through' : 'text-neutral-900'
          }`}
          numberOfLines={2}>
          {task.title}
        </Text>
      </Pressable>

      <View className="flex-row items-center gap-4">
        <Pressable onPress={() => openModal(task)}>
          <Feather name="edit-2" size={20} color="#7B7F8E" />
        </Pressable>
        <Pressable onPress={() => removeTask(task.id)}>
          <Feather name="trash-2" size={20} color="#C85A5A" />
        </Pressable>
      </View>
    </View>
  );

  const renderCategory = (title: string, categoryTasks: Task[]) => {
    if (categoryTasks.length === 0) return null;
    return (
      <View className="mb-6">
        <View className="mb-3 self-start rounded-lg bg-primary-100 px-3 py-1">
          <Text className="font-geist text-sm text-primary-900">{title}</Text>
        </View>
        {categoryTasks.map(renderTask)}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-neutral-100" style={{ paddingTop: insets.top, paddingBottom: 100 }}>
      <View className="flex-row items-center justify-between px-4 py-4">
        <Text className="font-geist text-3xl text-neutral-900">Tasks</Text>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={resetAllTasks} className="rounded-full bg-neutral-200 p-2 shadow-sm">
            <Feather name="rotate-ccw" size={20} color="#1D1E20" />
          </Pressable>
          <Pressable
            onPress={() => openModal()}
            className="rounded-full bg-primary-500 p-2 shadow-sm">
            <Feather name="plus" size={24} color="#1D1E20" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {renderCategory('Daily', dailyTasks)}
        {renderCategory('Weekly', weeklyTasks)}
        {renderCategory('Miscellaneous', miscTasks)}

        {tasks.length === 0 && (
          <View className="mt-10 items-center justify-center">
            <Feather name="check-circle" size={64} color="#E0E1E6" />
            <Text className="mt-4 font-geist text-lg text-neutral-500">All caught up!</Text>
          </View>
        )}
      </ScrollView>

      {/* Add/Edit Task Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-[32px] bg-white p-6 pb-12">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="font-geist text-xl font-bold text-neutral-900">
                {editingTaskId ? 'Edit Task' : 'New Task'}
              </Text>
              <Pressable onPress={closeModal}>
                <Feather name="x" size={24} color="#1D1E20" />
              </Pressable>
            </View>

            <Text className="mb-2 font-geist text-sm font-medium text-neutral-700">Task Title</Text>
            <TextInput
              className="mb-6 rounded-xl border border-neutral-200 bg-neutral-100 p-4 font-geist text-base text-neutral-900"
              placeholder="e.g. Water the crops"
              placeholderTextColor="#979AAA"
              value={taskTitle}
              onChangeText={setTaskTitle}
              autoFocus
            />

            <Text className="mb-2 font-geist text-sm font-medium text-neutral-700">Category</Text>
            <View className="mb-8 flex-row flex-wrap gap-2">
              {(['daily', 'weekly', 'miscellaneous'] as TaskCategory[]).map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setTaskCategory(cat)}
                  className={`rounded-full px-4 py-2 ${
                    taskCategory === cat
                      ? 'bg-primary-500'
                      : 'border border-neutral-200 bg-neutral-100'
                  }`}>
                  <Text
                    className={`font-geist text-sm font-medium ${
                      taskCategory === cat ? 'text-neutral-900' : 'text-neutral-600'
                    } capitalize`}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={handleSave}
              className={`items-center justify-center rounded-2xl py-4 ${
                taskTitle.trim() ? 'bg-primary-500' : 'bg-neutral-200'
              }`}
              disabled={!taskTitle.trim()}>
              <Text
                className={`font-geist text-lg font-bold ${
                  taskTitle.trim() ? 'text-neutral-900' : 'text-neutral-500'
                }`}>
                Save Task
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
