import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import constants from '../../constants';

const { colors } = constants;

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
  errorMessage = '',
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
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 18,
    color: constants.colors.black,
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    color: constants.colors.black,
    fontWeight: '100',
  },
  errorMessage: {
    color: colors.red,
    marginTop: 5,
  },
});

export default Input;
