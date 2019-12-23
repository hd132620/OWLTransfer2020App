/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

import Toolbar from './Toolbar';

import store from 'react-native-simple-store';

import FirebaseSetting from './utils/firebaseSetting';
import {firebase} from '@react-native-firebase/messaging';

export default class App extends Component {
  ////////////////////////////////
  //
  // 출처 : https://yuddomack.tistory.com/entry/React-Native-Firebase-%ED%91%B8%EC%8B%9C-%EC%95%8C%EB%A6%BCpush-notification-background-listener-2firebase-%EB%A6%AC%EC%8A%A4%EB%84%88-%EA%B5%AC%ED%98%84
  componentDidMount() {
    firebase.messaging().onTokenRefresh(async token => {
      if (token) {
        const mainstore = await store.get('mainstore');
        if (mainstore?.permission) {
          await FirebaseSetting._checkPermission();
        }
      }
    });
  }

  componentWillUnmount() {}

  ////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <>
        {/* <FirstLaunch /> */}
        <Toolbar />
        <View style={styles.contentContainer}>
          <WebView
            source={{
              uri:
                'https://namu.wiki/w/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98%20%EB%A6%AC%EA%B7%B8%202020%20%EC%8B%9C%EC%A6%8C/%EC%98%A4%ED%94%84%EC%8B%9C%EC%A6%8C#s-8',
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
