import {View, Text, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export default class SettingFooter extends Component {
  render() {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.developerText}>
          OWLTransfer2020App{'\n'}
          ver. 1.0.0{'\n'}
          개발자: 이은찬(진은파){'\n'}
          Email: rkwk2554@naver.com{'\n'}
          {'\n'}
          Backend 프로젝트 결과물이며 업데이트는 다소 느릴 수 있습니다.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: '#abffe4',
    margin: 10,
    justifyContent: 'center',
  },
  developerText: {
    textAlign: 'center',
  },
});
