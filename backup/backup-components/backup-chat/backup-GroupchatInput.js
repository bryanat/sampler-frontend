import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Pressable, } from 'react-native';
import { hostname } from '../../constants/hostname';
import { websocket as ws} from '../../constants/websocket-init.js'


//Send a message via Websocket
export default function BACKUPGroupchatInput() {
  
  const [socketTextInput, setSocketTextInput] = useState('');

  function onPressButtonWebSocketSend() {
    //if text input is not empty (to prevent sending message data on empty messages)
    if (socketTextInput != '') {
      ws.send(socketTextInput)
      //clear text input so there is an empty text input box for next message
      setSocketTextInput('')
    }
  }

  return (
    <View style={styles.chatInputStyle}>
      <TextInput onChangeText={setSocketTextInput} style={styles.textInputStyle} value={socketTextInput} placeholder='Type here to send a message' onSubmitEditing={onPressButtonWebSocketSend} />
      <Pressable onPress={onPressButtonWebSocketSend} style={({ pressed }) => [styles.pressableSendTextInput, { opacity : pressed ? 0.2 : 1 }]}>
        <Text style={styles.textInsidePressable}>Send message</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  chatInputStyle: {
    alignItems: 'center',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: '#2f95dc',
    color: '#fff',
    width: '98%',
  },
  pressableSendTextInput: {
    justifyContent: 'flex-end',
    backgroundColor: '#2f95dc',
    alignItems: 'center',
    width: '98%',
    paddingVertical: 8,
    borderRadius: 5,
  },
  textInsidePressable: {
    color: '#fff',
    fontSize: 18,
  },
});
