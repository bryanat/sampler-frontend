import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, useColorScheme, FlatList, Button, } from 'react-native';

import { hostname } from '../../constants/hostname';

import albionFiberData from '../../assets/albion-data-fiber.json';

console.log(albionFiberData)

let MartlockData = {
  t4wood: {
    sell: 37,
    buy: 36
  },
  t4rock: {
    sell: 16,
    buy: 13
  },
  t4ore: {
    sell: 44,
    buy: 41
  },
  t4hide: {
    sell: 83,
    buy: 70
  },
  t4fiber: {
    sell: 56,
    buy: 51
  },
  t4plank: {
    sell: 149,
    buy: 136
  },
  t4stone: {
    sell: 91,
    buy: 80
  },
  t4metal: {
    sell: 143,
    buy: 128
  },
  t4leather: {
    sell: 181,
    buy: 178
  },
  t4cloth: {
    sell: 176,
    buy: 168
  }
}

let MartlockArray = [
  {
    id: '1',
    sell: 37,
    buy: 36
  },
  {
    id: '2',
    sell: 16,
    buy: 13
  },
  {
    id: '3',
    sell: 44,
    buy: 41
  },
  {
    id: '4',
    sell: 83,
    buy: 70
  },
  {
    id: '5',
    sell: 56,
    buy: 51
  },
  {
    id: '6',
    sell: 149,
    buy: 136
  },
  {
    id: '7',
    sell: 91,
    buy: 80
  },
  {
    id: '8',
    sell: 143,
    buy: 128
  },
  {
    id: '9',
    sell: 181,
    buy: 178
  },
  {
    id: '10',
    sell: 176,
    buy: 168
  }
]

let albionWoodData = [
  {
      "item_id": "T1_FARM_CARROT_SEED",
      "city": "Arthurs Rest",
      "quality": 0,
      "sell_price_min": 4000,
      "sell_price_min_date": "2021-07-16T20:05:00",
      "sell_price_max": 4000,
      "sell_price_max_date": "2021-07-16T20:05:00",
      "buy_price_min": 0,
      "buy_price_min_date": "0001-01-01T00:00:00",
      "buy_price_max": 0,
      "buy_price_max_date": "0001-01-01T00:00:00"
  },
  {
      "item_id": "T1_FARM_CARROT_SEED",
      "city": "Black Market",
      "quality": 0,
      "sell_price_min": 0,
      "sell_price_min_date": "0001-01-01T00:00:00",
      "sell_price_max": 0,
      "sell_price_max_date": "0001-01-01T00:00:00",
      "buy_price_min": 0,
      "buy_price_min_date": "0001-01-01T00:00:00",
      "buy_price_max": 0,
      "buy_price_max_date": "0001-01-01T00:00:00"
  }
]

function loopMartlockData(obj) {
  Object.keys(obj).forEach(key => {
    //obj[key] == { sell: 00, buy: 00 }
    let profitPercentage = (((obj[key].sell - obj[key].buy)/obj[key].buy) * 100).toPrecision(3)
    console.log(`${key} ${profitPercentage}%`)
    console.log(key, obj[key])
  })
}

//loopMartlockData(MartlockData)

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function TimeScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const [ whateverState, changeWhateverState ] = useState(null);

  const fetchFromServer = () => {
    fetch(`http://${hostname}:3001/albionitem`, {mode: 'cors'}).then(aPromise => aPromise.json()).then(jsonmessage => console.log(jsonmessage))
    console.log('whatever data variable you want (was chatData)')
  }
  


  const renderItemFunction = ({ item }) => {
    const whateverVariable1 = 'hello';

    let sellDate = Date.parse(item.sell_price_min_date);
    let currentDate = new Date().getTime();
    let updatedXMinutesAgo = Math.floor((currentDate - sellDate)/60000)
    //let currentDate = currentLocalDate.UTC() //UTC date
    //console.log(`${item.item_id}${item.city} ${sellDate}`)
    console.log(`${item.item_id}${item.city} Updated ${updatedXMinutesAgo} minutes ago`)

    //let restructureDate = new Date(sellDate)
    //console.log(restructureDate)
    //let dateDaat = restructureDate.toDateString()
    //let updatedAgo = (currentLocalDate - sellDate)/60000


    return (
      <View style={styles.listView}>
        <Text style={styles.listText}>name: {item.item_id}</Text>
        <Text style={styles.listText}>city: {item.city}</Text>
        <Text style={styles.listText}>sell: {item.sell_price_min}</Text>
        <Text style={styles.listText}>buy: {item.buy_price_max}</Text>
        <Text style={styles.listText}>time: </Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Iteration: Barebones. Next Iteration: Item Images</Text>
      <Button onPress={fetchFromServer} title='fetchFromServer' />
      <FlatList
        data={albionFiberData}
        renderItem={renderItemFunction}
        keyExtractor={item => item.item_id + item.city} 
        style={styles.flatList}
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  picture: {
    width: 400,
    height: 1200,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  listView: {
    flexDirection: 'row'
  },
  listText: {
    color: 'white'
  }
});
