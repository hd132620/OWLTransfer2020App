import {Alert} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import {firebase} from '@react-native-firebase/messaging';

export async function _checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    // user has permissions
    console.log(enabled);
    await _updateTokenToServer();
  } else {
    // user doesn't have permission
    await _requestPermission();
  }
}

async function _requestPermission() {
  try {
    // User has authorised
    await firebase.messaging().requestPermission();
    await _updateTokenToServer();
  } catch (error) {
    // User has rejected permissions
    Alert.alert("you can't handle push notification");
  }
}

export async function _getPermissionFromServer() {
  const OS = DeviceInfo.getSystemName();
  const ID = DeviceInfo.getUniqueId();
  console.log(`${OS}:${ID}`);

  const header = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    },
    credentials: 'include',
  };
  const url = `https://us-central1-owltransfer2020.cloudfunctions.net/token?value=${OS}:${ID}`;

  // if you want to notification using server,
  // do registry current user token

  await fetch(url, header)
    .then(res => {
      console.log(res.permission);
      return res.permission;
    })
    .catch(err => console.log(err));
}

export async function _updateTokenToServer() {
  const fcmToken = await firebase.messaging().getToken();
  const OS = DeviceInfo.getSystemName();
  const ID = DeviceInfo.getUniqueId();
  console.log(`${OS}:${ID}`);
  console.log(fcmToken);

  const header = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    },
    body: JSON.stringify({
      user_id: `${OS}:${ID}`,
      information: {
        firebase_token: fcmToken,
      },
    }),
    credentials: 'include',
  };
  const url = 'https://us-central1-owltransfer2020.cloudfunctions.net/token';

  // if you want to notification using server,
  // do registry current user token

  await fetch(url, header)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
}

export async function _deleteTokenToServer() {
  const OS = DeviceInfo.getSystemName();
  const ID = DeviceInfo.getUniqueId();
  console.log(`${OS}:${ID}`);

  const header = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    },
    body: JSON.stringify({
      user_id: `${OS}:${ID}`,
    }),
    credentials: 'include',
  };
  const url = 'https://us-central1-owltransfer2020.cloudfunctions.net/token';

  // if you want to notification using server,
  // do registry current user token

  await fetch(url, header)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
}
