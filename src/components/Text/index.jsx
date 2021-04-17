import React from 'react';
import { Text as NativeText } from 'react-native';

import constants from '../../constants';

const { colors } = constants;

export const Text = ({ style, children, fontType, ...props }) => {
  const getFontFamily = (type) => {
    switch (type) {
      case 'light':
        return 'Hero-New-Light';
      case 'bold':
        return 'Hero-New-Bold';
      default:
        return 'Hero-New-Regular';
    }
  };

  return (
    <NativeText
      style={{
        fontFamily: getFontFamily(fontType),
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  );
};


const textStyles = {
  fontSize: 14,
  lineHeight: 14 * 1.5,
  color: colors.black,
};


export default Text;
