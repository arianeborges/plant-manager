import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😀',
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handlePlantSelect() {
    navigation.navigate(nextScreen);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}> {emojis[icon]} </Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.footer}>
        <Button title={buttonTitle} onPress={handlePlantSelect} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 30,
    paddingHorizontal: 54,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 30,
    marginTop: 32,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
    paddingVertical: 16,
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50,
  },
});
