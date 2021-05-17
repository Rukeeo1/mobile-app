import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import constants from '../../constants';

const { colors } = constants;

const KeyboardAvoiding = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
