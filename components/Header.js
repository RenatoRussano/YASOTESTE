import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ProfileContext } from '../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); 

export default function Header() {
  const { userName, profileImage } = useContext(ProfileContext);
  const [greeting, setGreeting] = useState(''); 
  const navigation = useNavigation();

  useEffect(() => {
    determineGreeting();
  }, []);

  const determineGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 4) {
      setGreeting('Boa noite');
    } else if (hour >= 4 && hour < 12) {
      setGreeting('Bom dia');
    } else {
      setGreeting('Boa tarde');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8f56bc', '#feaefe']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} 
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.userInfo} 
            onPress={() => navigation.navigate('Perfil')}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.rightContent}>
            <TouchableOpacity 
              style={styles.notificationIcon}
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>6</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.curvedBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    paddingBottom: 60, 
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  greeting: {
    color: 'white',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  notificationIcon: {
    position: 'relative',
    marginTop: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'purple',
    fontSize: 10,
  },
  curvedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 100, 
    borderTopRightRadius: 100,
  },
});
