import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import colors from '../styles/colors';

export function PlantSelect() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 54,
    backgroundColor: colors.background,
  },
});
