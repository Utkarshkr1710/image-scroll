const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 100,
  },
});

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import SoundPlayer from 'react-native-sound-player';

let interval;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      x: 1,
      modalVisible: false,
      top: '#87cefa',
      left: '#cdcdcd',
      right: '#cdcdcd',
      bottom: '#cdcdcd',
    };
  }

  componentDidMount() {
    Image.getSize(
      'https://ai-app.s3.ap-south-1.amazonaws.com/1/out8.jpeg',
      (width, height) => {
        this.setState({
          imageWidth: width,
          imageHeignt: height,
          quadrantSize: Math.round(width / 4),
        });
      },
    );
  }

  onBackPress() {
    clearInterval(interval);
    SoundPlayer.stop();
    this.setState({
      modalVisible: false,
      x: 1,
      left: '#cdcdcd',
      top: '#87cefa',
    });
  }

  onPress() {
    this.setState(
      {
        modalVisible: true,
      },
      () => SoundPlayer.playSoundFile('aaa', 'mp3'),
    );
    interval = setInterval(() => {
      this.scroll(this.state.x);
    }, 50);
  }

  scroll(x) {
    const quadrantSize2 = this.state.quadrantSize * 2;
    const quadrantSize3 = this.state.quadrantSize * 3;
    const quadrantSize4 = this.state.quadrantSize * 4;
    setTimeout(() => {
      this.ScrollView.scrollTo({x: x, animated: true});
    }, 50);

    if (this.state.x === this.state.imageWidth) {
      clearInterval(interval);
      setTimeout(() => {
        this.onBackPress();
      }, 1000);
    } else {
      this.setState({x: this.state.x + 1});
    }
    if (this.state.x <= this.state.quadrantSize && this.state.x >= 1) {
      this.setState({
        top: '#87cefa',
        left: '#cdcdcd',
      });
    } else if (
      this.state.x >= this.state.quadrantSize &&
      this.state.x <= quadrantSize2
    ) {
      this.setState({
        right: '#87cefa',
        top: '#cdcdcd',
      });
    } else if (this.state.x >= quadrantSize2 && this.state.x <= quadrantSize3) {
      this.setState({
        bottom: '#87cefa',
        right: '#cdcdcd',
      });
    } else if (this.state.x >= quadrantSize3 && this.state.x <= quadrantSize4) {
      this.setState({
        left: '#87cefa',
        bottom: '#cdcdcd',
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => alert('Coming soon')}>
            <Image
              style={{
                width: 51,
                height: 51,
              }}
              source={{
                uri:
                  'https://cdn3.iconfinder.com/data/icons/mobile-friendly-ui/100/menu-512.png',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              width: width - 120,
              fontSize: 20,
            }}>
            Application Name
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.onPress()}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: width - 20,
            // marginTop: 20,
          }}>
          <View
            style={{
              width: 0,
              height: 0,
              borderTopWidth: 20,
              borderTopColor: this.state.top,
              borderLeftColor: this.state.left,
              borderLeftWidth: 20,
              borderRightColor: this.state.right,
              borderRightWidth: 20,
              borderBottomColor: this.state.bottom,
              borderBottomWidth: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
        </TouchableOpacity>
        <Image
          style={{
            width: this.state.imageWidth,
            height: this.state.imageHeignt,
            justifyContent: 'center',
            marginTop: 20,
          }}
          source={{
            uri: 'https://ai-app.s3.ap-south-1.amazonaws.com/1/out8.jpeg',
          }}
          resizeMode="cover"
        />
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('aaa');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView
                horizontal={true}
                ref={(ref) => (this.ScrollView = ref)}>
                <Image
                  style={{
                    height: this.state.imageHeignt,
                    width: 1550,
                  }}
                  source={{
                    uri:
                      'https://ai-app.s3.ap-south-1.amazonaws.com/1/out8.jpeg',
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
