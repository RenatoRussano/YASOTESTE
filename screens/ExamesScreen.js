import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function ExamesScreen({ navigation, route }) {
  const [exames, setExames] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedExames = await AsyncStorage.getItem('@exames');
        if (storedExames) setExames(JSON.parse(storedExames));
      } catch (e) {
        console.error("Falha ao carregar dados do AsyncStorage", e);
      }
    };
    loadData();
  }, []);

  const saveData = async (updatedExames) => {
    try {
      await AsyncStorage.setItem('@exames', JSON.stringify(updatedExames));
    } catch (e) {
      console.error("Falha ao salvar dados", e);
    }
  };

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleEdit = (item) => {
    navigation.navigate('AdicionarExame', { item });
  };

  const handleSave = useCallback((newItem) => {
    setExames((prevExames) => {
      const updatedExames = newItem.id
        ? prevExames.map(item => item.id === newItem.id ? newItem : item)
        : [...prevExames, { ...newItem, id: prevExames.length + 1 }];
      saveData(updatedExames);
      return updatedExames;
    });
  }, [exames]);

  useEffect(() => {
    if (route.params?.newItem && !route.params?.handled) {
      handleSave(route.params.newItem);
      navigation.setParams({ handled: true });
    }
  }, [route.params?.newItem, handleSave]);

  const handleDownload = (uri) => {
    Linking.openURL(uri);
  };

  const handleDelete = (id) => {
    const updatedExames = exames.filter(item => item.id !== id);
    setExames(updatedExames);
    saveData(updatedExames);
  };

  const renderUploads = (uploads) => {
    return uploads.map((uri, index) => (
      <View key={index} style={styles.uploadItem}>
        {uri.endsWith('.pdf') ? (
          <TouchableOpacity onPress={() => handleDownload(uri)}>
            <Text>PDF: {uri.split('/').pop()}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setSelectedImage(uri)}>
            <Image source={{ uri }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      </View>
    ));
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
        <Text style={styles.sectionTitle}>Exames</Text>
        <View style={styles.divider} />
        <View>
          <Text style={styles.sectionTitleDown}>
            Caso precise encontrar um exame antigo ou atual, use o campo de pesquisa ou de filtro.
          </Text>
        </View>
        {exames.map((item) => (
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
                  {`Nome: ${item.nome}\nTipo: ${item.tipo}\nData: ${item.data}\nHora: ${item.hora}\nLocal: ${item.endereco}\nRelevante1: ${item.relevante1}\nRelevante2: ${item.relevante2}\nRelevante3: ${item.relevante3}\nRelevante4: ${item.relevante4}\nRelevante5: ${item.relevante5}\nRelevante6: ${item.relevante6}\nRelevante7: ${item.relevante7}\nRelevante8: ${item.relevante8}\nRelevante9: ${item.relevante9}\nRelevante10: ${item.relevante10}`}
                </Text>
                {item.uploads1 && renderUploads(item.uploads1)}
                {item.uploads2 && renderUploads(item.uploads2)}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AdicionarExame')}>
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
  uploadItem: {
    marginRight: 10,
    alignItems: 'center',
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