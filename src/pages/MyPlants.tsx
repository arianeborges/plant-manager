import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, Image, Text, Alert } from 'react-native';
// eslint-disable-next-line import/no-duplicates
import { formatDistance } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { enGB, fi } from 'date-fns/locale';
import { FlatList } from 'react-native-gesture-handler';
import { Header } from '../components/Header';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { Load } from '../components/Load';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import NoPlants from '../components/NoPlants';

export function MyPlants() {
  const [loading, setLoading] = useState(true);
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [nextWatered, setNextWatering] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remove', `Do you want to remove ${plant.name}?`, [
      {
        text: 'No 🙏',
        style: 'cancel',
      },
      {
        text: 'Yes 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants(oldData =>
              oldData.filter(item => item.id !== plant.id),
            );
          } catch (error) {
            Alert.alert('Could not be removed! 😥');
          }
        },
      },
    ]);
  }



  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      if(!plantsStoraged[0] && !myPlants[0]){
          setNextWatering(`No plant to water!`);

          setMyPlants(plantsStoraged);
          setLoading(false);

          return;
      }

      for(let i = 0; i < plantsStoraged.length; i++){
        const nextTime = formatDistance(
          new Date(plantsStoraged[i].dateTimeNotification).getTime(),
          new Date().getTime(),
          {
            locale: enGB,
          },
        );

        setNextWatering(`Water your ${plantsStoraged[i].name} in ${nextTime}`);
        setMyPlants(plantsStoraged);
        setLoading(false);
      }


    }

    loadStorageData();
  }, []);

  // if (loading) return <Load />;

  return loading ? (
    <Load />
  ) : (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Next watering</Text>

        {!myPlants[0] ? ( <NoPlants /> ) : (
          <FlatList
            data={myPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemove={() => {
                  handleRemove(item);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 30 : 30,
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    lineHeight: 23,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
