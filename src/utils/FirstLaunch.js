import React from 'react';
import {View, Text, Alert} from 'react-native';
import Toolbar from '../Toolbar';
import checkIfFirstLaunch from './checkIfFirstLaunch';
import firebaseAPI from './firebaseSetting';

import {AsyncStorage} from '@react-native-community/async-storage';

export default class FirstLaunch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
      notifications: false,
    };
  }

  async UNSAFE_componentWillMount() {
    // const isFirstLaunch = await checkIfFirstLaunch();
    const isFirstLaunch = true;
    console.log(`isFirstLaunch : ${isFirstLaunch}`);
    isFirstLaunch
      ? Alert.alert(
          '알림 설정',
          '알림을 켜시겠습니까?',
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed');
                this.setState({notifications: false});
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                console.log(`OK Pressed`);
                this.setState({notifications: true});
                Alert.alert('OK Pressed');
              },
            },
          ],
          {cancelable: true},
        )
      : console.log('Has launched before');
    this.setState({isFirstLaunch, hasCheckedAsyncStorage: true});
  }

  render() {
    const {hasCheckedAsyncStorage, isFirstLaunch, notifications} = this.state;

    if (!hasCheckedAsyncStorage) {
      return null;
    }

    return isFirstLaunch ? (
      <View>
        <Text>First Launch</Text>
        <Toolbar notifications={this.state.notifications} />
      </View>
    ) : (
      <View>
        <Text>Has launched before</Text>
        <Toolbar notifications={this.state.notifications} />
      </View>
    );
  }
}
