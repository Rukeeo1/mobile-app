import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  AntDesign,
  Entypo,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';

import { SafeArea, GradientButton as Button } from '../../components';

import globe from '../../assets/globe.png';

import constants from '../../constants';

const { colors } = constants;

const CropJournalLists = ({navigation}) => {
  return (
    <SafeArea>
      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          height: 60,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          bottom: 85,
          left: 20,
          position: 'absolute',
          zIndex: 423,
        }}
      >
        <AntDesign name='plus' size={24} color={colors.blue} onPress={() => navigation.navigate('Create-Journal')} />
      </TouchableOpacity>
      <LinearGradient
        style={styles.container}
        colors={[colors.purshBlue, colors.blue]}
      >
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            width: Dimensions.get('screen').width * 0.1,
            overflow: 'visible',
          }}
        >
          <AntDesign
            name='left'
            size={24}
            color={colors.white}
            style={{ marginTop: 30, marginLeft: 0 }}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              height: 100,
              justifyContent: 'flex-end',
              transform: [{ rotate: '-90deg' }],
            }}
          >
            <Text
              style={{
                height: 50,

                overflow: 'visible',
                // marginBottom: 100,
              }}
            >
              Add to Crop Journal
            </Text>
          </View>
        </View>
        {/* </View> */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <JournalCard uri='https://images.pexels.com/photos/1030913/pexels-photo-1030913.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' />
          <JournalCard uri='https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' />
          <JournalCard uri='https://images.pexels.com/photos/4503732/pexels-photo-4503732.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' />
          <View style={{ height: 50, backgroundColor: colors.white }} />
        </ScrollView>
      </LinearGradient>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    width: Dimensions.get('screen').width * 0.8,
    paddingBottom: 50,
    overflow: 'visible',
  },
});

const JournalCard = ({ uri }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <View style={{ alignItems: 'flex-end', paddingHorizontal: '5%' }}>
        <Button
          title='Jul 2020'
          coverStyle={{ width: 120 }}
          gradient={[colors.purshBlue, colors.blue]}
        />
      </View>
      <Image
        source={{
          uri,
        }}
        style={{ height: 300, marginTop: '3%' }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}
      >
        <Text style={{ color: colors.grey, fontStyle: 'italic' }}>
          23 July 2020
        </Text>
        <AntDesign name='ellipsis1' size={24} color={colors.grey} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: '4%',
          marginTop: 5,
        }}
      >
        <Image source={globe} style={{ height: 17, width: 17 }} />
        <Text style={{ width: '92%', marginLeft: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>Garden_of_Riley</Text>{' '}
          <Text>First handful of tomatoes!! Well worth the wait!</Text>
        </Text>
        <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 10 }}>
          Tomatoes - ‘Sungold’
        </Text>
      </View>
    </View>
  );
};

export default CropJournalLists;
