import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  function customAction() {
    Alert.alert('Testando', 'Apenas um teste!');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.textWhite}>Open up App.js to start working on your app!</Text>

      <Button title="click-me" onPress={customAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: '#fff',
  },
});
