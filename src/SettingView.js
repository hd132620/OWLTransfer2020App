import React, {Component} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingMain from './component/SettingMain';
import SettingHeader from './component/SettingHeader';
import SettingFooter from './component/SettingFooter';
export default class SettingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Modal
        visible={this.props.display}
        animationType="slide"
        onRequestClose={this.display}>
        <View style={styles.settingContainer}>
          <View style={styles.settingHeaderContainer}>
            <Text style={styles.settingText}>설정</Text>
            <TouchableOpacity
              style={styles.dismissBtn}
              onPress={() => this.props.closeDisplay()}>
              <Icon name={'ios-close'} size={35} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.mainContainer}>
          <SettingHeader />
          <SettingMain />
          <SettingFooter />
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  settingContainer: {
    backgroundColor: '#a1d7ff',
  },
  settingHeaderContainer: {
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: 22,
    justifyContent: 'flex-end',
    //borderWidth: 1,
  },
  settingText: {
    textAlign: 'center',
    fontSize: 25,
    //borderWidth: 1,
  },
  dismissBtn: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainer: {},
});
