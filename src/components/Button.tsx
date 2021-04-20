import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Text,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});
