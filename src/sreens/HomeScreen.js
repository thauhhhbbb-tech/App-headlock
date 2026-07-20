import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  // State cho các switch
  const [fixRung, setFixRung] = useState(true); // Đã bật FIX RUNG
  const [onOff, setOnOff] = useState(false);

  // State cho menu
  const [menuVisible, setMenuVisible] = useState(false);

  // State cho độ nhạy
  const [sensitivityModalVisible, setSensitivityModalVisible] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [sensitivity, setSensitivity] = useState(0);

  // Hàm tính độ nhạy dựa trên tên máy
  const calculateSensitivity = (name) => {
    if (!name) return 0;
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return Math.min(100, Math.round((sum % 100) + 20)); // Khoảng 20-100
  };

  const handleMachineNameChange = (text) => {
    setMachineName(text);
    setSensitivity(calculateSensitivity(text));
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem('@headlock_key');
    navigation.replace('Key');
  };

  // Các chức năng nút bấm
  const handleRegFiles = () => Alert.alert('REG FILES', 'Đã mở khóa REG FILES.');
  const handleBostRam = () => Alert.alert('BOST RAM', 'Đã kích hoạt BOST RAM.');
  const handleHE = () => Alert.alert('HE', 'Đã bật HE mode.');
  const handleFixRung = () => Alert.alert('FIX RUNG', 'Đã áp dụng FIX RUNG.');
  const handleStartingFiles = () => Alert.alert('STARTING FILES', 'Đã tải STARTING FILES.');

  // Tối ưu
  const handleOptimize = () => Alert.alert('Tối ưu', 'Đã tối ưu hóa hệ thống thành công.');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
          HEADLOCK BY TIENBORAI
        </Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Icon name="menu-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Các nút chức năng */}
      <TouchableOpacity style={styles.button} onPress={handleRegFiles}>
        <Text style={styles.buttonText}>REG FILES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBostRam}>
        <Text style={styles.buttonText}>BOST RAM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleHE}>
        <Text style={styles.buttonText}>HE</Text>
      </TouchableOpacity>

      {/* Switch: Đã bật FIX RUNG */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Đã bật FIX RUNG</Text>
        <Switch
          trackColor={{ false: '#333', true: '#4CD964' }}
          thumbColor={fixRung ? '#FFF' : '#FFF'}
          onValueChange={() => setFixRung(previous => !previous)}
          value={fixRung}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFixRung}>
        <Text style={styles.buttonText}>FIX RUNG</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleStartingFiles}>
        <Text style={styles.buttonText}>STARTING FILES</Text>
      </TouchableOpacity>

      {/* Switch ON/OFF */}
      <View style={[styles.switchContainer, { borderBottomWidth: 0, marginTop: 10 }]}>
        <Text style={[styles.switchLabel, { fontSize: 18, fontWeight: 'bold' }]}>ON</Text>
        <Switch
          trackColor={{ false: '#333', true: '#4CD964' }}
          thumbColor={onOff ? '#FFF' : '#FFF'}
          onValueChange={() => setOnOff(previous => !previous)}
          value={onOff}
        />
        <Text style={[styles.switchLabel, { fontSize: 18, fontWeight: 'bold' }]}>OFF</Text>
      </View>

      {/* ========== MENU TRƯỢT (HAMburger) ========== */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-start' }}>
          <View style={{ backgroundColor: '#1A1A1A', width: '70%', marginLeft: '30%', flex: 1, padding: 20, paddingTop: 50 }}>
            {/* Nút đóng menu */}
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={{ alignSelf: 'flex-end' }}>
              <Icon name="close-outline" size={30} color="#FFF" />
            </TouchableOpacity>

            {/* Độ nhạy */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#2A2A2A', marginTop: 20 }]}
              onPress={() => {
                setMenuVisible(false);
                setSensitivityModalVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Độ nhạy</Text>
            </TouchableOpacity>

            {/* Tối ưu */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#2A2A2A' }]}
              onPress={() => {
                setMenuVisible(false);
                handleOptimize();
              }}
            >
              <Text style={styles.buttonText}>Tối ưu</Text>
            </TouchableOpacity>

            {/* Đăng xuất */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#2A2A2A', borderColor: '#FF4444' }]}
              onPress={() => {
                setMenuVisible(false);
                Alert.alert(
                  'Đăng xuất',
                  'Bạn có chắc chắn muốn đăng xuất?',
                  [
                    { text: 'Hủy', style: 'cancel' },
                    { text: 'Đăng xuất', onPress: handleLogout, style: 'destructive' }
                  ]
                );
              }}
            >
              <Text style={[styles.buttonText, { color: '#FF4444' }]}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========== MODAL ĐỘ NHẠY ========== */}
      <Modal
        transparent={true}
        visible={sensitivityModalVisible}
        animationType="fade"
        onRequestClose={() => setSensitivityModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#1A1A1A', padding: 25, borderRadius: 12 }}>
            <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
              ĐỘ NHẠY
            </Text>

            <TextInput
              style={[styles.input, { marginBottom: 10 }]}
              placeholder="Nhập tên máy"
              placeholderTextColor="#666"
              value={machineName}
              onChangeText={handleMachineNameChange}
            />

            <Text style={{ color: '#FFF', fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
              Độ nhạy: <Text style={{ color: '#4CD964', fontWeight: 'bold' }}>{sensitivity}%</Text>
            </Text>

            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => setSensitivityModalVisible(false)}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
