import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import Button from '../components/Button';

export default function CameraScreen({ navigation, route }) {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
    const [cameraProps, setCameraProps] = useState({
        zoom: 0,
        facing: 'back',
        flash: 'off',
        animateShutter: false,
        enableTorch: false
    });
    const [image, setImage] = useState(null);
    const [ocrResult, setOcrResult] = useState(''); // Estado para armazenar o resultado do OCR

    const cameraRef = useRef(null);

    // Função para chamar a API OCR
    const handleOcr = async (imageUri) => {
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg'
        });
        formData.append('apikey', 'K88769991188957');
        formData.append('language', 'por'); // Para reconhecer português

        try {
            const response = await axios.post('https://api.ocr.space/parse/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.ParsedResults) {
                const parsedText = response.data.ParsedResults[0].ParsedText;
                setOcrResult(parsedText); // Atualiza o estado local com o texto do OCR
            } else {
                setOcrResult('No text recognized');
            }
        } catch (error) {
            console.error('Error during the OCR request:', error);
            setOcrResult('An error occurred while processing the image.');
        }
    };

    if (!cameraPermission || !mediaLibraryPermissionResponse) {
        // Permissions are still loading.
        return <View />;
    }

    if (!cameraPermission.granted || mediaLibraryPermissionResponse.status !== 'granted') {
        // Permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text>We need camera and gallery permissions to continue.</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    requestCameraPermission();
                    requestMediaLibraryPermission();
                }}>
                    <Text style={styles.buttonText}>Grant Permissions</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Função para capturar a imagem e processar o OCR
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const picture = await cameraRef.current.takePictureAsync();
                setImage(picture.uri); // Atualiza o estado com a URI da imagem capturada
                handleOcr(picture.uri); // Chama a função de OCR após capturar a imagem
            } catch (err) {
                console.log('Error while taking the picture: ', err);
            }
        }
    };

    // Função para salvar a imagem e retornar à tela anterior
const savePictureAndGoBack = async () => {
  if (image) {
    try {
      // Salva a imagem na galeria
      const asset = await MediaLibrary.createAssetAsync(image);
      Alert.alert('Photo saved!', image);

      // Verifica se a função onImageTaken foi passada via rota e retorna com a imagem e o resultado do OCR
      if (route.params?.onImageTaken) {
        route.params.onImageTaken(image, ocrResult); // Passa a URI da imagem e o resultado do OCR
      }
      
      // Navega de volta à tela anterior
      navigation.goBack();
    } catch (err) {
      console.log('Error while saving the picture: ', err);
    }
  }
};

    return (
        <View style={styles.container}>
            {/* Se uma imagem foi capturada, exibe a imagem e o resultado do OCR */}
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.camera} />
                    <Text style={styles.ocrResult}>OCR Result: {ocrResult}</Text>
                    <View style={styles.bottomControlsContainer}>
                        <Button
                            icon='check'
                            onPress={savePictureAndGoBack} // Chama a função de salvar e voltar
                        />
                        <Button
                            icon='flip-camera-android'
                            onPress={() => setImage(null)} // Reseta a tela para capturar uma nova imagem
                        />
                    </View>
                </>
            ) : (
                <>
                    {/* Exibe a câmera se nenhuma imagem foi capturada */}
                    <CameraView
                        style={styles.camera}
                        zoom={cameraProps.zoom}
                        facing={cameraProps.facing}
                        flash={cameraProps.flash}
                        animateShutter={cameraProps.animateShutter}
                        enableTorch={cameraProps.enableTorch}
                        ref={cameraRef}
                    />
                    <View style={styles.bottomControlsContainer}>
                        <Button
                            icon='camera'
                            size={60}
                            style={{ height: 60 }}
                            onPress={takePicture}
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    bottomControlsContainer: {
        height: 100,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    ocrResult: {
        margin: 20,
        fontSize: 16,
        color: '#333',
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
