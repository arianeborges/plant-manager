import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

export default function NoPlants() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have no plants registered here.</Text>
      <Text style={styles.text}>Try to register one in the "New plant" tab. </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.gray,
    lineHeight: 23,
  },
});
