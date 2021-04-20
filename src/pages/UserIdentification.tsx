import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleConfirm() {
    navigation.navigate('Confirmation');
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <View style={styles.container}>
          <Text style={styles.emoji}> {isFilled ? '😀' : '😄'} </Text>
          <Text style={styles.title}>What should {'\n'} I call you? </Text>
          <TextInput
            style={[
              styles.input,
              (isFocused || isFilled) && { borderColor: colors.green },
            ]}
            placeholder="Tell me your name"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChangeText={handleInputChange}
          />

          <View style={styles.footer}>
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 54,
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
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
