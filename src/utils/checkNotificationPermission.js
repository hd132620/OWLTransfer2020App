import React from 'react';
import {AsyncStorage} from '@react-native-community/async-storage';

const NOTIFICATION_PERMISSION = 'notificationPermission';

const prefsManager = {
  setValue: (key, value) => {
    AsyncStorage.setItem(key, value);
  },

  getValue: async key => {
    let value = '';
    try {
      value = (await AsyncStorage.getItem(key)) || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return value;
  },
};
export default prefsManager;

export function setPermission(flag) {
  if (flag) {
    AsyncStorage.setItem(NOTIFICATION_PERMISSION, 'true');
  } else {
    AsyncStorage.removeItem(NOTIFICATION_PERMISSION, error => {
      console.error(error);
    });
  }
  console.log(flag);
}

export async function getPermission() {
  // eslint-disable-next-line no-unused-vars
  let _retrieveData;
  let value;
  _retrieveData = async () => {
    try {
      value = await AsyncStorage.getItem(NOTIFICATION_PERMISSION);
      console.log(value);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  if (value === null) {
    return false;
  } else {
    return true;
  }
}
