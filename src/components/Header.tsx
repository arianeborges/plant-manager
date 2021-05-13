import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image, Platform, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import * as ImagePicker from 'expo-image-picker';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

export function Header() {
  const [userName, setUserName] = useState<string>();
  const [image, setImage] = useState<string>();

  async function loadStorageUserName() {
    const avatar = await AsyncStorage.getItem('@plantmanager:avatar');
    const user = await AsyncStorage.getItem('@plantmanager:user');

    setUserName(user || '');
    setImage(avatar  || '');
  }

  useEffect(() => {
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    loadStorageUserName();
  }, []);

  const handleUpdateAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      await AsyncStorage.setItem('@plantmanager:avatar', result.uri);
    }
  };


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetings}>Hello,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <TouchableOpacity onPress={handleUpdateAvatar}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Icon name="photo-camera" style={styles.icon} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greetings: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  icon: {
    fontSize: 32,
    color: colors.gray
  }
});
