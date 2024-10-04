import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MeuYasoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Meu Yaso</Text>
        <Text style={styles.text}>Detalhes sobre o Yaso e informações adicionais aparecerão aqui.</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
  },
});
