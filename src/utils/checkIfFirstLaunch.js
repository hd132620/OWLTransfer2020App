import store from 'react-native-simple-store';

const HAS_LAUNCHED = 'hasLaunched';

function setAppLaunched() {
  store.update(HAS_LAUNCHED, {permission: 'true'});
}

export default async function checkIfFirstLaunch() {
  // eslint-disable-next-line no-unused-vars
  let _retrieveData;
  let value;

  try {
    console.log('what');
    // await AsyncStorage.removeItem(HAS_LAUNCHED);
    store.get(HAS_LAUNCHED).then(res => {
      console.log(res.permission);
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  if (value === null) {
    setAppLaunched();
    console.log('CheckIfFirstLaunch : Null => true');
    return true;
  }
  console.log('CheckIfFirstLaunch : Not Null => false');
  return false;
}
