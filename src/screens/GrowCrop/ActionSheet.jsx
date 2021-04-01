import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useNavigation } from '@react-navigation/native';

import constants from '../../constants/';

const { colors } = constants;

const ActionSheet = ({ showBottomSheet, onClose }) => {
  const navigation = useNavigation();
  const actions = [
    {
      title: 'Buy seeds',
      onClick: () => {},
    },
    {
      title: 'Edit name/variety name',
      onClick: () => {},
    },
    {
      title: 'Delete crop',
      onClick: () => navigation.navigate('Delete-Crop'),
      dangerText: true,
    },
    {
      title: 'Killed crop',
      onClick: () => navigation.navigate('Killed-Crop'),
      dangerText: true,
    },
  ];

  const handleClick = (callBack) => () => {
    callBack();
    onClose();
  };
  return (
    <BottomSheet visible={showBottomSheet} onBackdropPress={onClose}>
      <View style={styles.bottomSheetItemWrapper}>
        <View style={styles.optionsContainer}>
          {actions.map((action) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={handleClick(action.onClick)}
              key={action.title}
            >
              <Text
                style={{
                  fontWeight: '500',
                  color: action?.dangerText ? colors.red : colors.black,
                }}
              >
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.cancelBottomSheet}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetItemWrapper: {
    paddingHorizontal: '5%',
  },
  optionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 13,
    borderBottomWidth: 0,
  },
  optionItem: {
    height: 55,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBottomSheet: {
    backgroundColor: colors.white,
    borderRadius: 13,
    height: 60,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteConfirmation: {
    backgroundColor: colors.white,
    borderRadius: 13,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteConfirmationOptions: {
    flexDirection: 'row',
  },
  actionTextNormal: {
    color: colors.black,
  },
  actionTextDanger: {
    color: colors.red,
  },
});

export default ActionSheet;
