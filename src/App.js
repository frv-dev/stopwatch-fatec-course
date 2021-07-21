import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';

import backgroundImage from '../assets/background/bg-android.jpg';
import Laps from './components/Laps';

export default function App() {
  const [timer, setTimer] = useState({
    miliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const timerRef = useRef();
  const lapRef = useRef();
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  function start() {
    setIsPaused(false);
    setIsStarted(true);

    timerRef.current = setInterval(function () {
      setTimer(function (timer) {
        if (timer.miliseconds === 99 && timer.seconds === 59 && timer.minutes === 59) {
          return {
            miliseconds: 0,
            seconds: 0,
            minutes: 0,
            hours: timer.hours + 1,
          };
        } else if (timer.miliseconds === 99 && timer.seconds === 59) {
          return {
            ...timer,
            miliseconds: 0,
            seconds: 0,
            minutes: timer.minutes + 1,
          };
        } else if (timer.miliseconds == 99) {
          return {
            ...timer,
            miliseconds: 0,
            seconds: timer.seconds + 1,
          };
        } else {
          return {
            ...timer,
            miliseconds: timer.miliseconds + 1
          };
        }
      });
    }, 10);
  }

  function stop() {
    clearInterval(timerRef.current);
    setIsPaused(true);
  }

  function clean() {
    setTimer({
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    });
    setIsStarted(false);
    lapRef.current.clean();
  }

  function showTimer() {
    const miliseconds = String(timer.miliseconds).padStart(2, '0');
    const seconds = String(timer.seconds).padStart(2, '0');
    const minutes = String(timer.minutes).padStart(2, '0');
    const hours = String(timer.hours).padStart(2, '0');

    return timer.hours === 0 ? `${minutes}:${seconds}:${miliseconds}` : `${hours}:${minutes}:${seconds}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ImageBackground source={backgroundImage} resizeMode="stretch" style={styles.backgroundImage}>
        <View style={styles.timerView}>
          <Text style={styles.timerText}>{showTimer()}</Text>
        </View>

        <View style={styles.lapsView}>
          <Laps ref={lapRef} />
        </View>

        <View style={styles.buttonsView}>
          <View style={styles.button}>
            {
              isPaused ?
                <Button title={isStarted ? "CONTINUAR" : "INICIAR"} color="#28A744" onPress={start} /> :
                <Button title="PAUSAR" color="#5AA9FF" onPress={stop} />
            }
          </View>
          {
            isStarted && <View style={styles.button}>
              {
                isPaused ?
                  <Button title="LIMPAR" color="#DC3544" onPress={clean} /> :
                  <Button title="VOLTA" color="#888888" onPress={() => lapRef.current.lap(timer)} />
              }
            </View>
          }
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },

  timerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    color: '#fff',
    fontSize: 72,
  },

  lapsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
