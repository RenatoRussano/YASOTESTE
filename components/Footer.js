import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.footerContainer}>
      <View style={styles.line} />
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconItem} onPress={() => navigation.navigate('Medicamentos')}>
          <Image
            source={{ uri: 'https://i.ibb.co/h22GhSw/medicamentos.png' }} 
            style={styles.icon}
          />
          <Text style={styles.iconText}>medicamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => navigation.navigate('Consultas')}>
          <Image
            source={{ uri: 'https://i.ibb.co/ThQ7SDh/consultas.png' }} 
            style={styles.icon}
          />
          <Text style={styles.iconText}>consultas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => navigation.navigate('Home')}>
          <Image
            source={{ uri: 'https://i.ibb.co/TqKkVrY/home.png' }} 
            style={styles.iconHome}
          />
          <Text style={styles.iconText}>home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => navigation.navigate('Exames')}>
          <Image
            source={{ uri: 'https://i.ibb.co/KNb2tMS/exames.png' }} 
            style={styles.icon}
          />
          <Text style={styles.iconText}>exames</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => navigation.navigate('Vacinas')}>
          <Image
            source={{ uri: 'https://i.ibb.co/XpGyjg3/vacinas.png' }} 
            style={styles.icon}
          />
          <Text style={styles.iconText}>vacinas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9', 
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    paddingVertical: 3,
    paddingHorizontal: 20, 
  },
  iconItem: {
    alignItems: 'center',
    flex: 1, 
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  iconHome: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  iconText: {
    color: '#7E7E7E',
    fontSize: 10,
    textAlign: 'center',
  },
});
