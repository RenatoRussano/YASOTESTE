import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function ConsultasScreen({ navigation, route }) {
  const [consultas, setConsultas] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedConsultas = await AsyncStorage.getItem('@consultas');
        if (storedConsultas) setConsultas(JSON.parse(storedConsultas));
      } catch (e) {
        console.error("Falha ao carregar dados do AsyncStorage", e);
      }
    };
    loadData();
  }, []);

  const saveData = async (updatedConsultas) => {
    try {
      await AsyncStorage.setItem('@consultas', JSON.stringify(updatedConsultas));
    } catch (e) {
      console.error("Falha ao salvar dados", e);
    }
  };

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleEdit = (item) => {
    navigation.navigate('AdicionarConsulta', { item });
  };

  const handleSave = useCallback((newItem) => {
    setConsultas((prevConsultas) => {
      const updatedConsultas = newItem.id
        ? prevConsultas.map(item => item.id === newItem.id ? newItem : item)
        : [...prevConsultas, { ...newItem, id: Date.now() }]; // Usando Date.now() para IDs únicos
      saveData(updatedConsultas);
      return updatedConsultas;
    });
  }, [consultas]);

  useEffect(() => {
    if (route.params?.newItem && !route.params?.handled) {
      handleSave(route.params.newItem);
      navigation.setParams({ handled: true });
    }
  }, [route.params?.newItem, handleSave]);

  const handleDelete = (id) => {
    const updatedConsultas = consultas.filter(item => item.id !== id);
    setConsultas(updatedConsultas);
    saveData(updatedConsultas);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={20} color="purple" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Consultas</Text>
        <View style={styles.divider} />
        <View>
          <Text style={styles.sectionTitleDown}>
            Caso precise encontrar uma consulta antiga ou atual, use o campo de pesquisa ou de filtro.
          </Text>
        </View>
        {consultas.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.nome}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                  <Ionicons name="pencil" size={16} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                  <Ionicons name="trash" size={16} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.actionButton}>
                  <Ionicons name={expandedItem === item.id ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            {expandedItem === item.id && (
              <View style={styles.itemContentContainer}>
                <Text style={styles.itemContent}>
                  {`Categoria: ${item.categoria}\nConsultório: ${item.consultorio}\nData: ${item.data}\nHora: ${item.hora}\nEndereço: ${item.endereco}\nContato: ${item.contato}\nObservações: ${item.observacoes}`}
                </Text>
                {item.imagem && (
                  <TouchableOpacity onPress={() => setSelectedImage(item.imagem)}>
                    <Image source={{ uri: item.imagem }} style={styles.thumbnail} />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AdicionarConsulta')}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close-circle" size={30} color="white" />
          </TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} />}
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '300', 
    color: 'purple',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitleDown: {
    fontSize: 16,
    fontWeight: '300', 
    color: 'purple',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 15,
  },
  itemContainer: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    color: 'purple',
    fontWeight: 'bold',
    flex: 1,
  },
  itemContentContainer: {
    marginTop: 10,
  },
  itemContent: {
    color: '#555555',
    fontSize: 12,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    backgroundColor: 'purple',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});
