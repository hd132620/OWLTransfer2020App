/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Colors from './Colors';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

const links = [
  {
    title: '앱 정보',
    link: 'https://facebook.github.io/react-native/docs/tutorial',
    description:
      '나무위키 이적정보 문서가 업데이트되면 자동으로 알림을 보내줍니다.',
  },
  {
    title: '알림',
    link: 'https://facebook.github.io/react-native/docs/style',
    description: '메인화면 좌측 상단 아이콘으로 on/off 할 수 있습니다.',
  },
  {
    title: '후원',
    link: 'https://facebook.github.io/react-native/docs/components-and-apis',
    description: '서버 유지보수 비용으로 들어갑니다.',
  },
  {
    title: '개발자',
    link: 'https://facebook.github.io/react-native/docs/components-and-apis',
    description: '이은찬(진은파)',
  },
];

export default class SettingMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        {links.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <View style={styles.separator} />
              <TouchableOpacity
                accessibilityRole={'button'}
                onPress={() => console.log(item.link)}
                style={styles.linkContainer}>
                <Text style={styles.link}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primary,
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.dark,
  },
  separator: {
    backgroundColor: Colors.light,
    height: 1,
  },
});
