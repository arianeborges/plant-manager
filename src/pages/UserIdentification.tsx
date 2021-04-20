import React from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}> :) </Text>
      <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
});
