import React from 'react'
import { Text as NativeText } from 'react-native'

import { textColor } from '../../config/colors'

const textStyles = {
  fontSize: 14,
  lineHeight: 14 * 1.5,
  color: textColor,
}

const Text = ({ style, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'Avenir-Regular',
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export default Text

export const LightText = ({ style, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'Avenir-Light',
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export const BoldText = ({ style, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'Avenir-Medium',
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export const VeryBoldText = ({ style, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'Avenir-Bold',
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}