import React from 'react'
import { Text as NativeText } from 'react-native'

import { textColor } from '../../config/colors'

const textStyles = {
  fontSize: 14,
  lineHeight: 14 * 1.5,
  color: textColor,
  fontFamily: 'Hero-New-Regular',
}

const Text = ({ style, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'Hero-New-Regular',
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
        fontFamily: 'Hero-New-Light',
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
        fontFamily: 'Hero-New-Regular',
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
        fontFamily: 'Hero-New-Regular',
        fontWeight: 'bold',
        ...textStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}
