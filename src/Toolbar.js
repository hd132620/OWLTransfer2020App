import React, {Component} from 'react';

import SettingView from './SettingView';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// import checkIfFirstLaunch from './utils/checkIfFirstLaunch';
import store from 'react-native-simple-store';

import DeviceInfo from 'react-native-device-info';
import {firebase} from '@react-native-firebase/messaging';

export default class Toolbar extends Component {
  ////////////////////////////////
  // 왼쪽 알림설정
  getIconName() {
    return this.state.isUsingNotifications
      ? this.state.onIconName
      : this.state.offIconName;
  }

  ///////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      isUsingNotifications: false,
      onIconName: 'ios-notifications',
      offIconName: 'ios-notifications-off',
      iconName: '',
      display: false,
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
    };
    this.state.iconName = this.getIconName();
    this.getIconName = this.getIconName.bind(this);
    this.changeNotificationState = this.changeNotificationState.bind(this);
    this.updatePermission = this.updatePermission.bind(this);
  }

  changeNotificationState() {
    Alert.alert(
      '알림 설정',
      this.state.isUsingNotifications
        ? '알림을 끄시겠습니까?'
        : '알림을 켜시겠습니까?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await this.updatePermission();
          },
        },
      ],
      {cancelable: true},
    );
  }

  ///////////////////////////////////
  async updatePermission() {
    if (this.state.isUsingNotifications) {
      // 알림 해제
      await this._deleteTokenToServer().catch(err => {
        console.error(err);
      });
    } else {
      // 알림 설정
      await this._checkPermission().catch(err => {
        console.error(err);
      });
    }
    store.update('mainstore', {permission: !this.state.isUsingNotifications});
    this.setState({
      isUsingNotifications: !this.state.isUsingNotifications,
    });
    this.setState({iconName: this.getIconName()});
  }

  ///////////////////////////////////
  async _checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log(enabled);
      await this._updateTokenToServer();
    } else {
      // user doesn't have permission
      await this._requestPermission();
    }
  }

  async _requestPermission() {
    try {
      // User has authorised
      await firebase.messaging().requestPermission();
      await this._updateTokenToServer();
    } catch (error) {
      // User has rejected permissions
      Alert.alert("you can't handle push notification");
    }
  }

  async _getPermissionFromServer() {
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
        console.log(res.status === 200 ? true : false);
        return res.status === 200 ? true : false;
      })
      .catch(err => console.log(err));
  }

  async _updateTokenToServer() {
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
        ToastAndroid.show(
          '업데이트가 성공적으로 반영되었습니다.',
          ToastAndroid.SHORT,
        );
      })
      .catch(err => console.log(err));
  }

  async _deleteTokenToServer() {
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
        ToastAndroid.show(
          '알림정보를 성공적으로 삭제했습니다.',
          ToastAndroid.SHORT,
        );
      })
      .catch(err => console.log(err));
  }

  ///////////////////////////////////
  async componentDidMount() {
    // const isFirstLaunch = await checkIfFirstLaunch();
    // const isFirstLaunch = true;
    let main_isFirstLaunch;
    const mainstore = await store.get('mainstore');

    if (JSON.parse(JSON.stringify(mainstore)) === null) {
      await store.save('mainstore', {isFirstLaunch: true, permission: false});
      main_isFirstLaunch = true;
      console.log('FirstLaunch');
    } else {
      console.log(JSON.parse(JSON.stringify(mainstore)));
      main_isFirstLaunch = JSON.parse(JSON.stringify(mainstore)).isFirstLaunch;
    }

    if (main_isFirstLaunch) {
      Alert.alert(
        '알림 설정',
        '알림을 켜시겠습니까?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
              store.update('mainstore', {permission: false});
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              console.log('OK Pressed');
              this.updatePermission();
              Alert.alert(
                '이적/영입 정보 업데이트 시 알림수신에 동의하셨습니다.',
              );
            },
          },
        ],
        {cancelable: true},
      );
      await store.update('mainstore', {isFirstLaunch: false});
    } else {
      console.log('Has launched before');
      store
        .get('mainstore')
        .then(res => {
          if (JSON.parse(JSON.stringify(res)) === null) {
            store.save('mainstore', {isFirstLaunch: true, permission: false});
          } else {
            this.setState({
              isUsingNotifications: res.permission,
            });
            this.setState({iconName: this.getIconName()});
          }
        })
        .catch(err => console.error(err));
    }
    if (this.state.isFirstLaunch === false) {
      this.setState({isFirstLaunch: true});
    }
  }

  render() {
    return (
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.ntfButton}
            onPress={this.changeNotificationState}>
            <Icon name={this.state.iconName} size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            2020 오버워치 리그 이적/영입 정보
          </Text>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => this.setState({display: true})}>
            <Icon name="ios-settings" size={30} color="black" />
          </TouchableOpacity>
          <SettingView
            display={this.state.display}
            closeDisplay={() => this.setState({display: false})}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    backgroundColor: '#68afed',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    fontSize: 17,
  },
  ntfButton: {
    marginLeft: 15,
  },
  settingButton: {
    marginRight: 10,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 20,
  },
});
