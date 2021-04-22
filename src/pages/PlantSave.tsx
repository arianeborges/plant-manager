import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps, savePlant } from '../libs/storage';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const route = useRoute();
  const { plant } = route.params as Params;
  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  // eslint-disable-next-line consistent-return
  function handleChangeTime(_: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Choose a time in the future! ⏰');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime });

      navigation.navigate('Confirmation', {
        title: 'Everything is alright',
        subtitle:
          'We will always remind you to take care of your little plant with enough love.',
        buttonTitle: 'Thanks!',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch {
      Alert.alert('Could not save the plant! 😥');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.aboutPlant}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>Choose the best time to remember:</Text>

        {showDatePicker && (
          <DateTimePicker
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
            value={selectedDateTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>
              {`Change ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Register Plant" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  aboutPlant: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    marginTop: 10,
    textAlign: 'center',
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 15,
    borderRadius: 20,
    position: 'relative',
    marginTop: -60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.blue,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 13,
  },
  dateTimePickerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24,
  },
});
