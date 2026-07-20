import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validKeys } from '../utils/keys';
import styles from '../styles/globalStyles';

export default function KeyScreen({ navigation }) {
  const [key, setKey] = useState('');

  const handleLogin = async () => {
    if (validKeys.includes(key.trim())) {
      await AsyncStorage.setItem('@headlock_key', key.trim());
      navigation.replace('Home');
    } else {
      Alert.alert('Sai key', 'Vui lòng nhập đúng key để tiếp tục.');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>HEADLOCK</Text>
      <Text style={styles.subtitle}>Nhập key để tiếp tục</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập Key"
        placeholderTextColor="#666"
        value={key}
        onChangeText={setKey}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Quên key?', 'Liên hệ admin để lấy lại key.')}>
        <Text style={{ color: '#888', textAlign: 'center', marginTop: 15 }}>
          Quên key?
        </Text>
      </TouchableOpacity>
    </View>
  );
    }
