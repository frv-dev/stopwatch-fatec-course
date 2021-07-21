import React, { forwardRef, useImperativeHandle, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

const Laps = forwardRef(function (props, ref) {
  const [laps, setLaps] = useState([]);
  const [lap, setLap] = useState(1);

  useImperativeHandle(ref, function () {
    return {
      lap: function (timer) {
        const miliseconds = String(timer.miliseconds).padStart(2, '0');
        const seconds = String(timer.seconds).padStart(2, '0');
        const minutes = String(timer.minutes).padStart(2, '0');
        const hours = String(timer.hours).padStart(2, '0');

        setLaps(laps => [{ lap, time: `${hours}:${minutes}:${seconds}:${miliseconds}` }, ...laps]);
        setLap(lap => lap + 1);
      },
      clean: function () {
        setLaps([]);
        setLap(1);
      },
    }
  });

  return (
    <>
      <Text style={styles.text}>Volta | Tempo</Text>
      <Text style={styles.text}>-----------------------</Text>
      <ScrollView>
        {
          laps.map(lapItem => (
            <Text key={lapItem.lap} style={styles.text}>{`${lapItem.lap} - ${lapItem.time}`}</Text>
          ))
        }
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  }
});

export default Laps;
