import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';

import { Header, Input } from '../../components/';

import constants from '../../constants/';

const { colors } = constants;

const Followers = ({ navigation }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const dummyImage =
    'https://images.unsplash.com/photo-1615224571979-b9271f79998b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80';

  const dummData = [
    {
      url:
        'https://images.pexels.com/photos/1924867/pexels-photo-1924867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      text: 'Garden_of_Riley',
    },
    {
      url:
        'https://images.unsplash.com/photo-1615224571979-b9271f79998b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80',
      text: 'Harriet_loves_to_grow',
    },
    {
      url:
        'https://images.unsplash.com/photo-1615224571979-b9271f79998b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80',
      text: 'Kelly_loves_to_grow_it_too',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title='Followers'
        onIconPress={() => navigation.goBack()}
        containerStyle={styles.headerStyle}
      />
      <View style={styles.searchBarWrapper}>
        <Input
          placeholder='Search'
          containerStyle={styles.searchInputContainer}
          inputStyle={{ marginTop: -10, paddingRight: 10 }}
        >
          <EvilIcons
            name='search'
            size={24}
            color={colors.blue}
            style={{
              right: 10,
              top: '30%',
              position: 'absolute',
            }}
          />
        </Input>
        <TouchableOpacity style={styles.cancelContainer}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.main}>
        <View style={styles.followItem}>
          <Image source={{ uri: dummyImage }} style={styles.image} />
          <Text style={styles.followItemText}>Garden_of_Riley</Text>
        </View>
        {dummData.map((item, index) => (
          <View style={styles.followItem} key={index}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <Text style={styles.followItemText}>{item.text}</Text>
          </View>
        ))}
        <BottomSheet visible={showBottomSheet}>
          <View style={styles.bottomSheetItemWrapper}>
            {/* <View style={styles.optionsContainer}>
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
            <TouchableOpacity style={styles.cancelBottomSheet}>
              <Text>Cancel</Text>
            </TouchableOpacity> */}
            <View style={styles.deleteConfirmation}>
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
                <Text style={{ color: colors.red, fontWeight: '500' }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
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

export default Followers;
