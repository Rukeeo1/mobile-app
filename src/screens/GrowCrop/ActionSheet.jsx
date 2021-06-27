import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useNavigation } from '@react-navigation/native';

import { useManageCropContext } from '../../context/ManageCropsContext';

import constants from '../../constants/';

const { colors } = constants;

const ActionSheet = ({ showBottomSheet, onClose }) => {
  const navigation = useNavigation();
  const {
    data: { cropToGrowDetails },
    actions: { cleanContextState },
  } = useManageCropContext();

  console.log(cropToGrowDetails, 'I am rwanda tutsi');

  const handleNavigation = (path, params = {}) => {
    navigation.navigate(path, params);
  };
  const actions = [
    {
      title: 'Buy seeds',
      onClick: () => {},
    },
    {
      title: 'Edit name/variety name',
      onClick: () => {
        navigation.navigate('Crops', {
          screen: 'Crop-selection',
          params: {
            cropName: cropToGrowDetails?.cropName,
            cropId: cropToGrowDetails?.cropId,
          },
        });
      },
    },
  ];

  const onDelete = () => {
    onClose();
    handleNavigation('Delete-Crop');
  };
  const onKill = () => {};

  const handleClick = (callBack) => () => {
    callBack();
    onClose();
  };
  return (
    <BottomSheet visible={showBottomSheet} onBackdropPress={onClose}>
      <View style={styles.bottomSheetItemWrapper}>
        <View style={styles.optionsContainer}>
          {actions.map(
            (
              action //this should be refactored to use <SheetItem />
            ) => (
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
            )
          )}
          {cropToGrowDetails.fromJobs && (
            <SheetItem title='Delete crop' onClick={onDelete} dangerText />
          )}
          {cropToGrowDetails.fromJobs && (
            <SheetItem title='Killed crop' onClick={onKill} dangerText />
          )}
        </View>
        <TouchableOpacity onPress={onClose} style={styles.cancelBottomSheet}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const SheetItem = ({ onClick, dangerText, title }) => {
  return (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={onClick}
      // key={action.title}
    >
      <Text
        style={{
          fontWeight: '500',
          color: dangerText ? colors.red : colors.black,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
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
