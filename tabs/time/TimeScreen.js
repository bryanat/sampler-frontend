import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default function TimeScreen({ navigation }) {

  let timeInit = new Date('November 4, 2049') - new Date();
  const [phi, setPhi] = useState(timeInit)

  useEffect(() => {
    const interval = setInterval(() => setPhi(Date.parse('November 4, 2049') - Date.now()), 49);
    return () => {
      clearInterval(interval);
    };
  });

  const [componentVisible, setComponentVisible] = useState(true);
    return (
        <View style={styles.container}>
           { componentVisible && 
            <View style={styles.container}>
              <View style={styles.popupView}>
                <Text style={styles.popupText}>Ignore this page.{'\n'} This is just a personal page I always keep up on my server to reference.</Text>
                <Pressable
                  style={[styles.button, styles.closeButton]}
                  onPress={() => setComponentVisible(!componentVisible)}
                >
                  <Text style={styles.textStyle}>Click to close</Text>
                </Pressable>
              </View>
            </View>
}

    

    
      <Text style={{fontVariant: ['tabular-nums'], color: '#fff'}}>φ {phi}</Text>
      <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  popupView: {
    margin: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#fff",
  },
  closeButton: {
    backgroundColor: "#2f95dc",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  popupText: {
    marginBottom: 16,
    textAlign: "center",
  }
});