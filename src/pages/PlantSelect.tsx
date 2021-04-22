import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        'plants_environments?_sort=title&_order=asc',
      );
      setEnvironments([
        {
          key: 'all',
          title: 'All',
        },
        ...data,
      ]);
    }
    fetchEnvironment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get('plants?_sort=name&_order=asc');

      setPlants(data);
      setFilteredPlants(data);
      setLoading(false);
    }
    fetchPlants();
  }, []);

  // eslint-disable-next-line consistent-return
  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all') return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment),
    );

    setFilteredPlants(filtered);
  }

  if (loading) return <Load />;

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
          contentContainerStyle={styles.environmentList}
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filteredPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
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
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 30,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
