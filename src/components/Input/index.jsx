import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import constants from "../../constants";

const { colors } = constants;

const Input = ({
  containerStyle = {},
  value,
  placeholder = "",
  onChangeText = () => {},
  onBlur = () => {},
  labelText = "",
  labelStyle = {},
  inputStyle = {},
  isCenter,
  placeholderText,
  children,
  errorMessage = "",
  ...props
}) => {
  return (
    <View style={[containerStyle]}>
      <Text style={{ ...styles.labelText, ...labelStyle }}>{labelText}</Text>
      <TextInput
        placeholder={placeholder}
        style={{
          ...styles.input,
          textAlign: `${isCenter ? "center" : "left"}`,
          ...inputStyle,
        }}
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
    fontWeight: "600",
  },
  input: {
    fontSize: 18,
    color: constants.colors.black,
    fontWeight: "300",
    // paddingHorizontal: 8,
    paddingBottom: 3,
    flex: 1,
  },
  errorMessage: {
    color: colors.red,
    marginTop: 5,
  },
});

export default Input;
