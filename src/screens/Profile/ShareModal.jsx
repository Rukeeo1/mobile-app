import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';

import constants from '../../constants';

const { colors } = constants;

export const ShareModal = ({ showBottomSheet, setShowShare }) => {
  return (
    <BottomSheet
      visible={showBottomSheet}
      onBackdropPress={() => setShowShare(false)}
    >
      <View style={styles.bottomSheetItemWrapper}>
        <View style={styles.optionsContainer}>
          <View style={styles.optionItem}>
            <Text>Share to...</Text>
          </View>
          <View style={styles.optionItem}>
            <Text>Edit Post</Text>
          </View>
          <View style={styles.optionItem}>
            <Text style={{ color: colors.red, fontWeight: '500' }}>
              Delete Post
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cancelBottomSheet}
          onPress={setShowShare}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        {/* <View style={styles.deleteConfirmation}>
          <Text>Are you sure you want to delete your post</Text>
        </View>
        <View style={styles.deleteConfirmationOptions}>
          <TouchableOpacity
            style={{ ...styles.cancelBottomSheet, ...{ flex: 1 } }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.cancelBottomSheet,
              ...{
                flex: 1,
                marginLeft: 5,
              },
            }}
          >
            <Text style={{ color: colors.red, fontWeight: '500' }}>Delete</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerStyle: {
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  main: {
    paddingHorizontal: '5%',
    paddingTop: '5%',
    flex: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: '5%',
    paddingTop: 20,
    flexDirection: 'row',
  },
  searchInputContainer: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    borderRadius: 20,
    height: 46,
    paddingLeft: 15,
    paddingRight: 25,
    flex: 1,
  },
  image: {
    height: 41,
    width: 41,
    borderRadius: 20.5,
  },
  followItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  followItemText: {
    fontWeight: '500',
    marginLeft: 14,
  },
  cancelContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: colors.greyDark,
    fontWeight: '300',
  },
  // remove the following styling later...
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
});

export default ShareModal;
