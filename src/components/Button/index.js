import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// todo: cater for props.children in cases where button needs to be wrapped around other components
/**
 * todo:
 * 1. cater for props.children in cases where button needs to be wrapped around other components
 * 2. Takecare of loading indicator
 * 3. Make Provision for Icons (1. might suffice though)
 * 4. Extend button props for other cases...
 * 5. This should be a default export if it's all that's being exported.
 *
 */
export const Button = ({
  title,
  color = '#000',
  coverStyle,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        height: 50,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,

        ...coverStyle,
      }}
    >
      <Text style={{ color, fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
};

//  would combine this button with the one above... rather than have seperate buttons..
export const GradientButton = ({
  children,
  title,
  gradient = ['#000000', '#000000'],
  coverStyle,
  onPress
}) => {
  return (
    <TouchableOpacity style={[styles.defaultBtnContainer, coverStyle]} onPress={onPress}>
      <LinearGradient
        colors={gradient}
        style={{ ...styles.defaultLinearGradient }}
      >
        {children ? children : <Text style={styles.defaultText}>{title}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultBtnContainer: {
    width: '100%',
    height: 50,
    marginTop: 15,
    borderRadius: 25,
  },
  defaultLinearGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'green',
  },
  defaultText: { color: '#ffffff', fontWeight: '600' },
});
