import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { BottomSheet } from 'react-native-btr'

import constants from '../../constants/'

const { colors } = constants

const DeleteModal = ({ showBottomSheet, onClose }) => {
  return (
    <BottomSheet visible={showBottomSheet} onBackdropPress={onClose}>
      <View style={styles.bottomSheetItemWrapper}>
        <View style={styles.optionsContainer}>
          <View style={styles.optionItem}>
            <Text style={{ fontSize: 17 }}>Share to...</Text>
          </View>
          <View style={styles.optionItem}>
            <Text style={{ fontSize: 17 }}>Edit Post</Text>
          </View>
          <View style={styles.optionItem}>
            <Text style={{ fontSize: 17, color: 'red' }}>Delete post</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.cancelBottomSheet}
            onPress={onClose}
          >
            <Text style={{ fontSize: 17 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.cancelBottomSheet}
            onPress={onClose}
          >
            <Text style={{ fontSize: 17, color: 'red' }}>Delete post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

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
})

export default DeleteModal
