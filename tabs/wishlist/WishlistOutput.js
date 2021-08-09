import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, Pressable, Animated, SafeAreaView, Button, useWindowDimensions, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

let mockData = [
  {
    id: 'uuid11',
    name: 'Tropical Pool Float',
    image: require('../../assets/images/gift-images-tmp-will-fetch-from-server-in-future/inflatabletropical.jpg'),
  },
  {
    id: 'uuid12',
    name: 'Nerf Super Soaker',
    image: require('../../assets/images/gift-images-tmp-will-fetch-from-server-in-future/nerfss.jpeg'),
  },
  {
    id: 'uuid13',
    name: 'Swimline Water Basketball',
    image: require('../../assets/images/gift-images-tmp-will-fetch-from-server-in-future/waterbasketball.jpg'),
  },
]

// BASICALLY THIS WILL WORK BY YOU SHOULD JUST BE ABLE TO SCROLL DOWN LIKE A FEED AND LIKE/TAG WHAT YOU LIKE/WANT
  // ends up being a giant list like a pinterest board or instagram bookmarks
export default function WishlistOutput() {
  const window = useWindowDimensions()

  const refFade = React.useRef(new Animated.Value(0)).current;

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
  };


  const [ additionalFlatListItem, setAdditionalFlatListItem ] = React.useState('') 

  //Currying function to enable passing itemID parameter 
  const addToWishlist = (itemID) => () => {
    //add item to wishlist (REDIS )
    //show wishlist/gift icon animation
    console.log(`${itemID} button pressed`)
  }

  const renderItem = ( {item} ) => {
    return (
      <View>
        <Pressable onPress={addToWishlist(item.id)} >
          <Image source={item.image} style={{ width: '80%', height: 300, }} />
        </Pressable>  

        <Text style={styles.textStyle}>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.flexContainer}>

      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim
          }
        ]}
      >
        <AntDesign name='gift' size={32} color='#fff' />
        <Text style={styles.fadingText}>Tropical Pool Float added to Wishlist</Text>
      </Animated.View>

      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>

      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={additionalFlatListItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  textStyle: {
    color: '#fff',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: "#2f95dc",
  },
  fadingText: {
    color: '#fff',
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
})
