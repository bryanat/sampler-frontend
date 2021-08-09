/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

/**
 * aka these links are react ROUTES that determine the url route path names
 * example: 'chat' will create the url path name {domain}/groupchat
 * these url routes will be used by the express routing api for fetch()ing data
 */ 

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Time: {
            screens: {
              TimeScreen: 'Time',
            },
          },
          Dev: {
            screens: {
              DevScreen: 'Dev',
            },
          },
          Chat: {
            screens: {
              GroupchatOutput: 'Groupchat',
            }
          },
          Wishlist: {
            screens: {
              WishlistOutput: 'Wishlist',
            }
          }
        },
      },
      NotFound: '*',
    },
  },
};
