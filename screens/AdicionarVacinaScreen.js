import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdicionarVacinaScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [dataImportante, setDataImportante] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [comprovante, setComprovante] = useState(null);

  useEffect(() => {
    if (route.params?.item) {
      const { nome, responsavel, dataImportante, data, hora, comprovante } = route.params.item;
      setNome(nome);
      setResponsavel(responsavel);
      setDataImportante(dataImportante);
      setData(data);
      setHora(hora);
      setComprovante(comprovante);
    }
  }, [route.params?.item]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setComprovante(result.uri);
    }
  };

  const salvarVacina = () => {
    if (nome && data && hora) {
      const newItem = {
        id: route.params?.item?.id || Date.now(),
        nome,
        responsavel,
        dataImportante,
        data,
        hora,
        comprovante,
      };
      navigation.navigate('Vacinas', { newItem });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={20} color="purple" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>adicionar uma nova vacina</Text>

        <Text style={styles.inputLabel}>nome da vacina</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da vacina"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.inputLabel}>nome do responsável pela vacina</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do responsável"
          value={responsavel}
          onChangeText={setResponsavel}
        />

        <Text style={styles.inputLabel}>algum outro dado importante aqui</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o dado importante"
          value={dataImportante}
          onChangeText={setDataImportante}
        />

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>data</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={data}
              onChangeText={setData}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>hora</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={hora}
              onChangeText={setHora}
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>foto do comprovante</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {comprovante ? (
            <Image source={{ uri: comprovante }} style={styles.image} />
          ) : (
            <Ionicons name="camera" size={50} color="gray" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={salvarVacina}>
          <Text style={styles.saveButtonText}>salvar</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -10, 
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
    marginTop: 20, 
  },
  inputLabel: {
    fontSize: 14,
    color: 'purple',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  imageContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
