import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {Button, IconButton} from 'react-native-paper';

const Quantity = ({getValue}) => {
  const [counter, setCount] = useState(1);
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <IconButton
        icon="minus"
        color="#ff007f"
        size={20}
        onPress={() => {
          if (counter !== 1) {
            setCount(counter - 1);
            getValue(counter - 1);
          }
        }}
      />
      <Text>{counter}</Text>
      <IconButton
        icon="plus"
        color="#ff007f"
        size={20}
        onPress={() => {
          if (counter < 5) {
            setCount(counter + 1);
            getValue(counter + 1);
          }
        }}
      />
    </View>
  );
};

export default Quantity;
