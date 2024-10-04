import React, { useContext, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileContext } from '../context/ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export default function EmergenciaScreen({ navigation }) {
  const { userName, profileImage } = useContext(ProfileContext);
  const viewRef = useRef();

  const handleShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      await Sharing.shareAsync(uri, {
        dialogTitle: 'Compartilhar via WhatsApp',
      });
    } catch (error) {
      Alert.alert(
        'Erro ao compartilhar',
        'Não foi possível compartilhar a tela.'
      );
    }
  };

  return (
    <LinearGradient
      colors={['#8f56bc', '#feaefe']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container} ref={viewRef}>
        <Image source={require('../assets/yaso1.png')} style={styles.logo} />
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View>
              <Text style={styles.name}>{userName}</Text>
              <Text style={styles.subtitle}>Climeni Romeu</Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>convênio</Text>
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>008 41 365 978 203 456</Text>
                <Text style={styles.cardDate}>amil S750</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardSubtitle}>apartamento</Text>
                <Text style={styles.cardSmallText}>14 / 06 / 2025</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>SUS</Text>
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>18 93300 1613</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.barcodePlaceholder} />
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>dados gerais</Text>
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>AB +</Text>
                <Text style={styles.observationsTitle}>Observações:</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.observationsText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>medicamentos alérgicos</Text>
            <View style={styles.infoCard}>
              <View style={styles.cardContent}>
                <Text style={styles.allergyText}>NAPROXENO</Text>
                <Ionicons name="chevron-down" size={16} color="gray" />
              </View>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.cardContent}>
                <Text style={styles.allergyText}>DICLOFENACO</Text>
                <Ionicons name="chevron-down" size={16} color="gray" />
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.label}>contato de emergência</Text>
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Cintia Romeu</Text>
                <Text style={styles.cardSubtitle}>Mãe Biológica</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.emergencyPhone}>+55 (11) 9 8579 0567</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    color: '#4e2a84',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#4e2a84',
  },
  shareButton: {
    marginLeft: 'auto',
    backgroundColor: '#6030A0',
    padding: 10,
    borderRadius: 50,
  },
  infoSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#4e2a84',
    marginBottom: 5,
  },
  infoCard: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#8864b8',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#8864b8',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardContent: {
    backgroundColor: '#b098d0',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  observationsTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  observationsText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  allergyText: {
    fontSize: 14,
    color: '#4e2a84',
  },
  barcodePlaceholder: {
    height: 20,
    backgroundColor: '#b098d0',
    borderRadius: 4,
    marginTop: 5,
    width: '100%',
  },
  emergencyPhone: {
    fontSize: 14,
    color: '#4e2a84',
  },
  backButton: {
    backgroundColor: '#6030A0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
