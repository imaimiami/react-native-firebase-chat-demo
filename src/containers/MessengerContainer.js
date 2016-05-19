'use strict';

import React, {
  Component,
} from 'react';
import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
} from 'react-native';

var GiftedMessenger = require('react-native-gifted-messenger');

if (Platform.OS == 'ios') {
  var STATUS_BAR_HEIGHT = 0;
  var CONTAINER_MARGIN = 20;
  var UserName = 'ios';
  var AvatarUrl = 'https://source.unsplash.com/sseiVD2XsOk/100x100';
} else {
  var STATUS_BAR_HEIGHT = 27;
  var CONTAINER_MARGIN = 0;
  var UserName = 'android';
  var AvatarUrl = 'https://source.unsplash.com/2Ts5HnA67k8/100x100';
}

class MessengerContainer extends Component {

  constructor(props) {
    super(props);

    this._messagesRef = new Firebase("https://react-native-chat-sample.firebaseio.com/messages");
    this._messages = [];

    this.state = {
      messages: this._messages,
      typingMessage: ''
    };
  }

  componentDidMount() {
    this._messagesRef.on('child_added', (child) => {
      this.handleReceive({
        text: child.val().text,
        name: child.val().name,
        image: {uri: child.val().avatarUrl || 'https://facebook.github.io/react/img/logo_og.png'},
        position: child.val().name == UserName && 'right' || 'left',
        date: new Date(child.val().date),
        uniqueId: child.key()
      });
    });
  }

  setMessages(messages) {
    this._messages = messages;

    this.setState({
      messages: messages,
    });
  }

  handleSend(message = {}) {
    this._messagesRef.push({
      text: message.text,
      name: UserName,
      avatarUrl: AvatarUrl,
      date: new Date().getTime()
    })
  }

  handleReceive(message = {}) {
    this.setMessages(this._messages.concat(message));
  }

  render() {
    return (
      <View style={{marginTop: CONTAINER_MARGIN}}>
        <GiftedMessenger
          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#007aff',
            },
          }}
          messages={this.state.messages}
          handleSend={this.handleSend.bind(this)}
          maxHeight={Dimensions.get('window').height - STATUS_BAR_HEIGHT - CONTAINER_MARGIN}
        />
      </View>
    );
  }
}


module.exports = MessengerContainer;
