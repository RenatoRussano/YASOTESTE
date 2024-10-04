import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdicionarAlergiaScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (route.params?.item) {
      const { nome, tipo, observacoes } = route.params.item;
      setNome(nome);
      setTipo(tipo);
      setObservacoes(observacoes);
    }
  }, [route.params?.item]);

  const salvarAlergia = () => {
    if (nome && tipo) {
      const newItem = {
        id: route.params?.item?.id || null,
        nome,
        tipo,
        observacoes,
      };
      navigation.navigate('Medicamentos', { newItem, isMedicamento: false });
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
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>adicionar uma nova alergia</Text>
        
        <Text style={styles.inputLabel}>Nome da Alergia</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Alergia"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.inputLabel}>Tipo</Text>
        <TextInput
          style={styles.input}
          placeholder="Tipo (ex.: medicamento, alimento, outros)"
          value={tipo}
          onChangeText={setTipo}
        />

        <Text style={styles.inputLabel}>Observações</Text>
        <TextInput
          style={styles.input}
          placeholder="Observações"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarAlergia}>
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
    paddingBottom: 100, // Espaço para o footer
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -10, // Remove o espaçamento entre o header e os ícones
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
    marginTop: 20, // Espaço após os ícones
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
