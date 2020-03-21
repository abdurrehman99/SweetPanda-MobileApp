import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

function Spinner() {
  return (
    <ActivityIndicator
      style={{marginVertical: 60}}
      size={50}
      animating={true}
      color="#ff007f"
    />
  );
}
export default Spinner;
