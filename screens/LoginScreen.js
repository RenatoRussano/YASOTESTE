import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      const savedRemember = await AsyncStorage.getItem('remember');

      if (savedRemember === 'true' && savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        setRemember(true);
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do AsyncStorage:', error);
    }
  };

  const handleLogin = async () => {
    try {
      if (remember) {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('remember', remember.toString());
      } else {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('remember');
      }

      if (username === '' && password === '') {
        navigation.navigate('Home');
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao salvar os dados no AsyncStorage:', error);
    }
  };

  const handleEmergency = () => {
    navigation.navigate('Emergencia'); // Navegação para a tela de emergência
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(96,48,160,1)', 'rgba(255,175,255,1)']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View>
        <Image source={require('../assets/yaso1.png')} style={styles.logo} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.backgroundWithButtons}>
        <View style={styles.contentContainer}>
          <TextInput
            style={[styles.input, { marginTop: 50, fontStyle: 'italic', color: '#9A9A9A' }]} // Corrigido fontColor para color
            placeholder="nome"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[styles.input, { fontStyle: 'italic' }]}
            placeholder="senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.rememberAndForgotContainer}>
            <View style={styles.rememberContainer}>
              <TouchableOpacity onPress={() => setRemember(!remember)}>
                <View style={[styles.checkbox, remember ? styles.checked : null]} />
              </TouchableOpacity>
              <Text style={styles.rememberText}>lembrar senha</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={[styles.forgotPasswordText, styles.link]}>esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.enterButton]} onPress={handleLogin}>
          <Text style={styles.enterButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.googleButtonAndApple}>
          <TouchableOpacity style={styles.button}>
            <Icon name="google" size={20} color="white" />
            <Text style={styles.googleAndAppleButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="apple" size={20} color="white" />
            <Text style={styles.googleAndAppleButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonEmergency} onPress={handleEmergency}>
            <Image source={require('../assets/emergencia.png')} style={styles.emergencyIcon} />
            <Text style={styles.textEmergency}>emergência</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundWithButtons: {
    paddingTop: 0,
    marginTop: 70,
    backgroundColor: '#ffff',
    borderRadius: 10,
    width: 360,
    height: 600,
    alignItems: 'center',
    padding: 0,

    shadowOffset: { width: 5, height: 2 },
    shadowColor: '#171717',
    shadowOpacity: 0.5,
    shadowRadius: 3,

    elevation: 3,
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '150%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    marginTop: 40,
    width: 100,
    height: 155,
    aspectRatio: 2,
    marginBottom: 10,
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: '#9A9A9A',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    placeholderTextColor: "#9A9A9A",
    color: '#9A9A9A',
    borderRadius: 10,
    width: 320,
    height: 50,
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  rememberAndForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B2BEBF',
  },
  checked: {
    backgroundColor: '#6030A0',
  },
  rememberText: {
    fontSize: 12,
    color: '#9A9A9A',
    marginLeft: 3,
  },
  enterButton: {
    backgroundColor: '#6030A0',
    paddingVertical: 10,
    borderRadius: 50,
    width: '80%',
    marginTop: 15,
    width: 320,
    height: 50,
  },
  enterButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9A9A9A',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginRight: 10,
  },

  googleAndAppleButtonText: {
    color: '#fff',
    marginLeft: 10,
  },

  googleButtonAndApple: {
    paddingTop: 20,
    flexDirection: 'row',
  },

  buttonEmergency: {
    paddingTop: 60,
    alignItems: 'center',
    flex: 1,
  },

  emergencyIcon: {
    width: 30,
    height: 30,
  },

  textEmergency: {
    fontSize: 12,
    color: '#6030A0',
  },

  forgotPasswordText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  link: {
    color: '#9A9A9A',
  },

  separatorContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9A9A9A',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#9A9A9A',
  },
});
