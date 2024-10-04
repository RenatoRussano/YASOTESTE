import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VacinasScreen({ navigation }) {
  const [vacinas, setVacinas] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedVacinas = await AsyncStorage.getItem('@vacinas');
        if (storedVacinas) setVacinas(JSON.parse(storedVacinas));
      } catch (e) {
        console.error("Falha ao carregar dados do AsyncStorage", e);
      }
    };
    loadData();
  }, []);

  const saveData = async (updatedVacinas) => {
    try {
      await AsyncStorage.setItem('@vacinas', JSON.stringify(updatedVacinas));
    } catch (e) {
      console.error("Falha ao salvar dados", e);
    }
  };

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleEdit = (item) => {
    navigation.navigate('AdicionarVacina', { item });
  };

  const handleDelete = (id) => {
    const updatedVacinas = vacinas.filter(item => item.id !== id);
    setVacinas(updatedVacinas);
    saveData(updatedVacinas);
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
        <Text style={styles.sectionTitle}>Protocolo de Vacinas</Text>
        <View style={styles.divider} />
        {vacinas.map((item) => (
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
                  {`Nome: ${item.nome}\nData: ${item.data}\nResponsável: ${item.responsavel}\nLocal: ${item.local}`}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AdicionarVacina')}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>

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
  itemContentContainer: {
    marginTop: 10,
  },
  itemContent: {
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
});
