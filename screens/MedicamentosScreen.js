import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function MedicamentosScreen({ navigation, route }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [alergias, setAlergias] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedMedicamentos = await AsyncStorage.getItem('@medicamentos');
        const storedAlergias = await AsyncStorage.getItem('@alergias');
        if (storedMedicamentos) setMedicamentos(JSON.parse(storedMedicamentos));
        if (storedAlergias) setAlergias(JSON.parse(storedAlergias));
      } catch (e) {
        console.error("Falha ao carregar dados do AsyncStorage", e);
      }
    };
    loadData();
  }, []);

  const saveData = async (updatedMedicamentos, updatedAlergias) => {
    try {
      await AsyncStorage.setItem('@medicamentos', JSON.stringify(updatedMedicamentos));
      await AsyncStorage.setItem('@alergias', JSON.stringify(updatedAlergias));
    } catch (e) {
      console.error("Falha ao salvar dados no AsyncStorage", e);
    }
  };

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleEdit = (item, isMedicamento) => {
    if (isMedicamento) {
      navigation.navigate('AdicionarMedicamento', { item });
    } else {
      navigation.navigate('AdicionarAlergia', { item });
    }
  };

  const handleDelete = (id, isMedicamento) => {
    if (isMedicamento) {
      const updatedMedicamentos = medicamentos.filter(item => item.id !== id);
      setMedicamentos(updatedMedicamentos);
      saveData(updatedMedicamentos, alergias);
    } else {
      const updatedAlergias = alergias.filter(item => item.id !== id);
      setAlergias(updatedAlergias);
      saveData(medicamentos, updatedAlergias);
    }
  };

  const handleSave = useCallback((newItem, isMedicamento) => {
    if (isMedicamento) {
      setMedicamentos((prevMedicamentos) => {
        const updatedMedicamentos = newItem.id
          ? prevMedicamentos.map(item => item.id === newItem.id ? newItem : item)
          : [...prevMedicamentos, { ...newItem, id: prevMedicamentos.length + 1 }];
        saveData(updatedMedicamentos, alergias);
        return updatedMedicamentos;
      });
    } else {
      setAlergias((prevAlergias) => {
        const updatedAlergias = newItem.id
          ? prevAlergias.map(item => item.id === newItem.id ? newItem : item)
          : [...prevAlergias, { ...newItem, id: prevAlergias.length + 1 }];
        saveData(medicamentos, updatedAlergias);
        return updatedAlergias;
      });
    }
  }, [alergias, medicamentos]);

  useEffect(() => {
    if (route.params?.newItem && !route.params?.handled) {
      handleSave(route.params.newItem, route.params.isMedicamento);
      navigation.setParams({ handled: true });
    }
  }, [route.params?.newItem, route.params?.isMedicamento, handleSave]);

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
        <Text style={styles.sectionTitle}>medicamentos controlados e/ou contínuos</Text>
        <View style={styles.divider} />
        
        {medicamentos.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.nome}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item, true)} style={styles.actionButton}>
                  <Ionicons name="pencil" size={16} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id, true)} style={styles.actionButton}>
                  <Ionicons name="trash" size={16} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.actionButton}>
                  <Ionicons name={expandedItem === item.id ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            {expandedItem === item.id && (
              <Text style={styles.itemContent}>
                {`Dosagem: ${item.dosagem}\nQuantidade: ${item.quantidade}\nObservações: ${item.observacoes}`}
              </Text>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>alergias</Text>
        <View style={styles.divider} />

        {alergias.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.nome}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item, false)} style={styles.actionButton}>
                  <Ionicons name="pencil" size={16} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id, false)} style={styles.actionButton}>
                  <Ionicons name="trash" size={16} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.actionButton}>
                  <Ionicons name={expandedItem === item.id ? "chevron-up" : "chevron-down"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            {expandedItem === item.id && (
              <Text style={styles.itemContent}>
                {`Tipo: ${item.tipo}\nObservações: ${item.observacoes}`}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Você quer adicionar um medicamento ou uma alergia?</Text>
          <TouchableOpacity
            style={[styles.modalButton, styles.buttonMedicamento]}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('AdicionarMedicamento');
            }}
          >
            <Text style={styles.textStyle}>Medicamento</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.buttonAlergia]}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('AdicionarAlergia');
            }}
          >
            <Text style={styles.textStyle}>Alergia</Text>
          </TouchableOpacity>
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
  itemContent: {
    marginTop: 10,
    color: '#555555',
    fontSize: 12,
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 200,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonMedicamento: {
    backgroundColor: 'purple',
  },
  buttonAlergia: {
    backgroundColor: 'purple',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
