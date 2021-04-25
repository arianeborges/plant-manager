import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import {
  Jost_400Regular,
  Jost_600SemiBold,
  useFonts,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // you can see all the notifications
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      },
    );

    return () => subscription.remove();

    // async function notifications() {
    //   // see all notifications
    //   // const data = Notifications.getAllScheduledNotificationsAsync();
    //   // console.log(data);

    //   // cancel all notifications
    //   await Notifications.cancelAllScheduledNotificationsAsync();
    // }
    // notifications();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Routes />
    </>
  );
}
