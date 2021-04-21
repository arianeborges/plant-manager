import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Header } from '../components/Header';
import { RoomButton } from '../components/RoomButton';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface RoomProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [rooms, setRooms] = useState<RoomProps[]>([]);

  useEffect(() => {
    async function fetchRoom() {
      const { data } = await api.get('plants_environments');
      setRooms(data);
    }
    fetchRoom();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>In which room </Text>
        <Text style={styles.subtitle}>do you want to place your plant?</Text>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.roomList}
          data={rooms}
          renderItem={({ item }) => (
            <>
              <RoomButton title={item.title} active />
            </>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20,
  },
  roomList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
});
