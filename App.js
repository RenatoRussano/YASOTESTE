import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileProvider } from './context/ProfileContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MedicamentosScreen from './screens/MedicamentosScreen';
import ConsultasScreen from './screens/ConsultasScreen';
import ExamesScreen from './screens/ExamesScreen';
import VacinasScreen from './screens/VacinasScreen';
import AdicionarMedicamentoScreen from './screens/AdicionarMedicamentoScreen';
import AdicionarAlergiaScreen from './screens/AdicionarAlergiaScreen';
import PerfilScreen from './screens/PerfilScreen';
import AdicionarExameScreen from './screens/AdicionarExameScreen';
import AdicionarConsultaScreen from './screens/AdicionarConsultaScreen';
import AdicionarVacinaScreen from './screens/AdicionarVacinaScreen';
import EmergenciaScreen from './screens/EmergenciaScreen'; 
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Medicamentos" component={MedicamentosScreen} />
          <Stack.Screen name="AdicionarMedicamento" component={AdicionarMedicamentoScreen} />
          <Stack.Screen name="AdicionarAlergia" component={AdicionarAlergiaScreen} />
          <Stack.Screen name="Consultas" component={ConsultasScreen} />
          <Stack.Screen name="AdicionarConsulta" component={AdicionarConsultaScreen} />
          <Stack.Screen name="Exames" component={ExamesScreen} />
          <Stack.Screen name="AdicionarExame" component={AdicionarExameScreen} />
          <Stack.Screen name="Vacinas" component={VacinasScreen} />
          <Stack.Screen name="AdicionarVacina" component={AdicionarVacinaScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="Emergencia" component={EmergenciaScreen} /> 
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}
