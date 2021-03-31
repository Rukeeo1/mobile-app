import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
  Header,
  Input,
  GradientButton as Button,
  SafeArea,
} from '../../components/';

import { Ionicons } from '@expo/vector-icons';

import constants from '../../constants/';

const { colors } = constants;

const CreateJournal = ({ navigation }) => {
  const [journalEntry, setJournalEntry] = useState({
    entry: '',
    isPublic: false,
    journalUri: '',
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setJournalEntry((prevState) => ({
        ...prevState,
        journalUri: result?.uri,
      }));
    }
  };

  return (
    <SafeArea>
      <ScrollView>
        <Header
          title='Journal entry'
          onIconPress={() => navigation.goBack()}
          containerStyle={styles.headerStyle}
        />
        <View style={styles.postInput}>
          <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
            {journalEntry.journalUri ? (
              <Image
                source={{ uri: journalEntry.journalUri }}
                style={{ height: '100%', width: '100%' }}
              />
            ) : (
              <Ionicons
                name='ios-camera-outline'
                size={45}
                color={constants.colors.white}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1, height: 150, flexWrap: 'wrap' }}>
            <Input
              placeholder='Write a journal entry…'
              onChangeText={(text) =>
                setJournalEntry((prevState) => ({
                  ...prevState,
                  entry: text,
                }))
              }
              value={journalEntry.entry}
              numberOfLines={4}
              inputStyle={{ flexWrap: 'wrap' }}
              containerStyle={{ flexWrap: 'wrap' }}
              multiline
            />
          </View>
        </View>
        <View style={styles.switchContainer}>
          <Text>Add to public profile</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.pink }}
            value={journalEntry.isPublic}
            onValueChange={(value) => {
              setJournalEntry((prevState) => ({
                ...prevState,
                isPublic: value,
              }));
            }}
          />
        </View>
        <View style={styles.footer}>
          <Button
            title='Share'
            gradient={[colors.green, colors.greenDeep]}
            onPress={() => navigation.navigate('Crop-Journal')}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  postInput: {
    flexDirection: 'row',
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  imageWrapper: {
    backgroundColor: colors.grey100,
    height: 131,
    width: 131,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  footer: {
    padding: 22,
    justifyContent: 'flex-end',
    marginTop: '35%',
  },
});

export default CreateJournal;
