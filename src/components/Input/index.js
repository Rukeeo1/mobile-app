import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import constants from '../../constants';

const Input = ({
  containerStyle = {},
  value,
  placeholder = '',
  onChangeText = () => {},
  onBlur = () => {},
  labelText = '',
  labelStyle = {},
  inputStyle = {},
  children,
  ...props
}) => {
  return (
    <View style={[containerStyle]}>
      <Text style={{ ...styles.labelText, ...labelStyle }}>{labelText}</Text>
      <TextInput
        placeholder={placeholder}
        style={{ ...styles.input, ...inputStyle }}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
  },
  labelText: {
    fontSize: 18,
    color: constants.colors.black,
    fontWeight: '600',
  },
  input: {
    // marginTop: 10,
    fontSize: 18,
    color: constants.colors.black,
    fontWeight: '100',
  },
});

export default Input;
