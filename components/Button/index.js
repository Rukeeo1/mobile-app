import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native';

import { VeryBoldText } from './Text';
import { pear, lightGrey } from '../config/colors';

const Touchable =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const Button = ({
  backgroundColor = pear,
  color = '#000',
  title,
  disabled = false,
  loading = false,
  style = {},
  coverStyle = {},
  onPress,
  hasBorder = false,
  children,
  ...props
}) => {
  return (
    <Touchable
      useForeground={true}
      disabled={disabled || loading}
      background={TouchableNativeFeedback.Ripple(lightGrey, false)}
      onPress={onPress}
      style={{
        width: '100%',
        ...coverStyle,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 50,
          marginTop: 15,
          overflow: 'hidden',
          ...style,
          backgroundColor: disabled ? lightGrey : backgroundColor,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          borderColor: lightGrey,
          borderWidth: hasBorder ? 1 : 0,
          ...style,
        }}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={color} size="small" animating />
        ) : children ? (
          children
        ) : (
          <VeryBoldText
            style={{
              color: disabled ? '#606570' : color,
            }}
          >
            {title}
          </VeryBoldText>
        )}
      </View>
    </Touchable>
  );
};

export default Button;
