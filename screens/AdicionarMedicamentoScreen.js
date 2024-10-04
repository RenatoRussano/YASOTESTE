import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdicionarMedicamentoScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (route.params?.item) {
      const { nome, dosagem, quantidade, observacoes } = route.params.item;
      setNome(nome);
      setDosagem(dosagem);
      setQuantidade(quantidade);
      setObservacoes(observacoes);
    }
  }, [route.params?.item]);

  const salvarMedicamento = () => {
    if (nome && dosagem && quantidade) {
      const newItem = {
        id: route.params?.item?.id || null,
        nome,
        dosagem,
        quantidade,
        observacoes,
      };
      navigation.navigate('Medicamentos', { newItem, isMedicamento: true });
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
        <Text style={styles.sectionTitle}>adicionar um novo medicamento</Text>

        <Text style={styles.inputLabel}>Nome do Remédio</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Remédio"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.inputLabel}>Dosagem</Text>
        <TextInput
          style={styles.input}
          placeholder="Dosagem"
          value={dosagem}
          onChangeText={setDosagem}
        />

        <Text style={styles.inputLabel}>Quantidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <Text style={styles.inputLabel}>Observações</Text>
        <TextInput
          style={styles.input}
          placeholder="Observações"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarMedicamento}>
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
