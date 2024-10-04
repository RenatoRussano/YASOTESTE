import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdicionarExameScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [endereco, setEndereco] = useState('');
  const [relevante1, setRelevante1] = useState('');
  const [relevante2, setRelevante2] = useState('');
  const [relevante3, setRelevante3] = useState('');
  const [relevante4, setRelevante4] = useState('');
  const [relevante5, setRelevante5] = useState('');
  const [relevante6, setRelevante6] = useState('');
  const [relevante7, setRelevante7] = useState('');
  const [relevante8, setRelevante8] = useState('');
  const [relevante9, setRelevante9] = useState('');
  const [relevante10, setRelevante10] = useState('');
  const [uploads1, setUploads1] = useState([]);
  const [uploads2, setUploads2] = useState([]);

  useEffect(() => {
    if (route.params?.item) {
      const {
        nome, tipo, data, hora, endereco,
        relevante1, relevante2, relevante3, relevante4,
        relevante5, relevante6, relevante7, relevante8,
        relevante9, relevante10, uploads1, uploads2
      } = route.params.item;

      setNome(nome);
      setTipo(tipo);
      setData(data);
      setHora(hora);
      setEndereco(endereco);
      setRelevante1(relevante1);
      setRelevante2(relevante2);
      setRelevante3(relevante3);
      setRelevante4(relevante4);
      setRelevante5(relevante5);
      setRelevante6(relevante6);
      setRelevante7(relevante7);
      setRelevante8(relevante8);
      setRelevante9(relevante9);
      setRelevante10(relevante10);
      setUploads1(uploads1 || []);
      setUploads2(uploads2 || []);
    }
  }, [route.params?.item]);


  const pickDocument = async (setUploads) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      multiple: true,
    });

    if (result.type === 'success') {
      const files = Array.isArray(result) ? result : [result];
      setUploads(prevUploads => {
        if (prevUploads.length + files.length <= 5) {
          return [...prevUploads, ...files.map(file => ({
            uri: file.uri,
            name: file.name
          }))];
        } else {
          alert('Você só pode adicionar até 5 arquivos.');
          return prevUploads;
        }
      });
    }
  };

  const renderUploads = ({ item }) => (
    <View style={styles.uploadItem}>
      <Text>{item.name}</Text>
    </View>
  );


  const salvarExame = () => {
    if (nome && tipo && data && hora) {
      const newItem = {
        id: route.params?.item?.id || null,
        nome,
        tipo,
        data,
        hora,
        endereco,
        relevante1,
        relevante2,
        relevante3,
        relevante4,
        relevante5,
        relevante6,
        relevante7,
        relevante8,
        relevante9,
        relevante10,
        uploads1,
        uploads2,
      };
      navigation.navigate('Exames', { newItem, isExame: true });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}>
            <Ionicons name="arrow-back" size={20} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>adicionar um novo exame</Text>

        <Text style={styles.inputLabel}>Nome do exame</Text>
        <TextInput
          style={styles.input}
          placeholder="Ultrassonografia de crânio"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.inputLabel}>Tipo do exame</Text>
        <TextInput
          style={styles.input}
          placeholder="Imagem"
          value={tipo}
          onChangeText={setTipo}
        />

        <Text style={styles.inputLabel}>Data</Text>
        <TextInput
          style={styles.input}
          placeholder="23/09/2024"
          value={data}
          onChangeText={setData}
        />

        <Text style={styles.inputLabel}>Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="06:30"
          value={hora}
          onChangeText={setHora}
        />

        <Text style={styles.inputLabel}>Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Delboni Aureliano - Itaim Bibi"
          value={endereco}
          onChangeText={setEndereco}
          multiline
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante1}
          onChangeText={setRelevante1}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante2}
          onChangeText={setRelevante2}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante3}
          onChangeText={setRelevante3}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante4}
          onChangeText={setRelevante4}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante5}
          onChangeText={setRelevante5}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante6}
          onChangeText={setRelevante6}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante7}
          onChangeText={setRelevante7}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante8}
          onChangeText={setRelevante8}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante9}
          onChangeText={setRelevante9}
        />

        <Text style={styles.inputLabel}>Algum dado relevante sobre o exame</Text>
        <TextInput
          style={styles.input}
          placeholder="e uma resposta aqui"
          value={relevante10}
          onChangeText={setRelevante10}
        />

        <Text style={styles.inputLabel}>Pedido Médico</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(setUploads1)}>
          <Ionicons name="cloud-upload-outline" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Fazer Upload</Text>
        </TouchableOpacity>
        <FlatList
          data={uploads1}
          renderItem={renderUploads}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.inputLabel}>Resultados do Exame</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(setUploads2)}>
          <Ionicons name="cloud-upload-outline" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Fazer Upload</Text>
        </TouchableOpacity>
        <FlatList
          data={uploads2}
          renderItem={renderUploads}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
      />

        <TouchableOpacity style={styles.saveButton} onPress={salvarExame}>
          <Text style={styles.saveButtonText}>Salvar</Text>
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
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  uploadItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
