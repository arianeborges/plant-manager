import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
  const navigation = useNavigation();

  function handlePlantSelect() {
    navigation.navigate('PlantSelect');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}> 😀 </Text>

      <Text style={styles.title}>Ready</Text>

      <Text style={styles.subtitle}>
        Now let&apos;s start taking care of your plants very carefully.
      </Text>

      <View style={styles.footer}>
        <Button title="Let's go" onPress={handlePlantSelect} />
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
