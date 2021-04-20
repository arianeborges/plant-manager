import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';

export function Button() {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
      <Icon name="chevron-right" size={32} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 56,
    borderRadius: 16,
  },
  icon: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: colors.white,
  },
});
