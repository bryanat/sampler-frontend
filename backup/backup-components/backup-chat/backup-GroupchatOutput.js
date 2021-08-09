import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, ScrollView, } from 'react-native';
import GroupchatInput from './GroupchatInput';
import { hostname } from '../../constants/hostname';
import { websocket as ws} from '../../constants/websocket-init.js';

let chatData = [
  {
    id: 'uuid6', //uuid npm
    time: '02-23-23T09:43', //new Date()
    user: '12.43.2',
    message: 'xxx',
  },
  {
    id: 'uuid2', //uuid npm
    time: '05-23-23T09:43', //new Date()
    user: '::ffff:73.124.137.143',
    message: 'hhh',
  },
  {
    id: 'uuid3', //uuid npm
    time: '08-23-23T09:43', //new Date()
    user: '::ffff:172.58.129.71',
    message: 'ddd',
  },
]


export default function BACKUPGroupchatOutput() {

  const [ incomingMessage, setincomingMessage ] = React.useState('')

  const [ userIPAddress, setUserIPAddress ] = React.useState('')

  //ask the server for clients public ip address with a get request instead of having to import a module 
  //since using a 3rd party module will send a clients public ip through a 3rd party and add to package size
  //devnote: in the future I want to move this function outside of the RN component and use this function to login user else the username will be based on IP address
  async function getPublicIP() {
    //await for the Response object returned from the resolved fetch Promise
    let responseObject = await fetch(`http://${hostname}:3001/publicipaddress`, {mode: 'cors'});
    //await for the Response data returned from the Response object parsed to json (by using the Response.json() method)
    const responseData = await responseObject.json()
    //set the ip address to the userIPAddress state variable
    setUserIPAddress(responseData);
  }

  //below is an alternative way to get (fetch) the clients IP address resolving Promises with .then() instead of the cleaner async await (same function as getPublicIP but getPublicIP is cleaner code)
  //fetch(`http://${hostname}:3001/publicipaddress`, {mode: 'cors'}).then(bufferResponseData => bufferResponseData.json()).then(jsonResponseData => setUserIPAddress(jsonResponseData))

  React.useEffect(() => {
    //only run function to getPublicIP again only if userIPAddress changes
    getPublicIP()
  }, [userIPAddress])

  //get new messages pushed through the websocket
  ws.onmessage = function(message) {
    let data = JSON.parse(message.data)
    //add (push) the new message to the array of messages
    chatData.push(JSON.parse(message.data)) 
    //trigger the extraData prop in FlatList so FlatList re-renders with the new addition message
    setincomingMessage(incomingMessage + 'x') 
  }


  const renderItem = ( {item} ) => {

    function styleLeftOrRight() {
      //if the ip address from the incoming message matches my client ip address (aka its my own message) then style the chat message to the right
      if ( item.user == userIPAddress ) {
        return styles.itemRight
      } else {
        return styles.itemLeft
      }
    }

    return (
      <View style={styleLeftOrRight()}>
        <Text style={styles.textMessage}>{item.message}</Text>
      </View>
    )
  }

  const refFlatList = React.useRef(null);

  return (
    <View style={styles.container}>
        <FlatList
          data={chatData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={incomingMessage}
          ref={refFlatList}
          onContentSizeChange={()=> refFlatList.current.scrollToEnd()}
        />
      <GroupchatInput />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#2f95dc',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  itemLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  textMessage: {
    fontSize: 16,
    color: '#fff',
  },
});
