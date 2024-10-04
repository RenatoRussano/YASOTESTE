import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ProfileContext } from '../context/ProfileContext'; 

export default function PerfilScreen({ navigation }) {
  const { userName, profileImage, updateUserName, updateProfileImage } = useContext(ProfileContext); 
  const [localUserName, setLocalUserName] = useState(userName);
  const [birthDate, setBirthDate] = useState('');
  const [localProfileImage, setLocalProfileImage] = useState(profileImage);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedBirthDate = await AsyncStorage.getItem('birthDate');
      if (savedBirthDate) setBirthDate(savedBirthDate);
    } catch (error) {
      console.error('Erro ao carregar o perfil:', error);
    }
  };

  const handleSave = async () => {
    try {
      updateUserName(localUserName);
      updateProfileImage(localProfileImage);
      await AsyncStorage.setItem('userName', localUserName);
      await AsyncStorage.setItem('birthDate', birthDate);
      if (localProfileImage) await AsyncStorage.setItem('profileImage', localProfileImage);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar o perfil:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={localProfileImage ? { uri: localProfileImage } : require('../assets/marilia.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.changePhotoText}>Alterar foto de perfil</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={localUserName}
          onChangeText={setLocalUserName}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#B3B3B3',
  },
  changePhotoText: {
    color: '#6030A0',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#6030A0',
    paddingVertical: 10,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
