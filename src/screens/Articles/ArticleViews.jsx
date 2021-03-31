import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

import { SafeArea } from '../../components';

import constants from '../../constants/';

const { colors } = constants;

const ArticleViews = ({ navigation }) => {
  const dummyItems = [
    {
      title: 'Your Beginners Guide',
      body: '5 Things to remember when learning to grow you own',
    },
    {
      title: 'Jargon Buster',
      body:
        'Get up to speed, with some of the most common gardening jargon explained',
    },
    {
      title: 'Getting started with Grow It ',
      body:
        'Get up to speed, with some of the most common gardening jargon explained',
    },
  ];

  const renderArticleCard = ({ item, index }) => (
    <View>
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/4622253/pexels-photo-4622253.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        }}
        style={{
          width: '100%',
          height: Dimensions.get('screen').height * 0.2,
          marginVertical: 10,
        }}
      />
      <View style={{ paddingHorizontal: '5%' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
          }}
        >
          {item.title}
        </Text>
        <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.body}</Text>
      </View>
    </View>
  );
  return (
    <SafeArea>
      <LinearGradient
        colors={[colors.blue, colors.purshBlue]}
        style={styles.container}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexGrow: 1,
          }}
        >
          <AntDesign
            name='left'
            size={24}
            color={colors.white}
            style={{ marginTop: 30, marginLeft: 10 }}
            onPress={() => navigation.navigate('Crop-Card')}
          />
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* <View> */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: '100',
              textAlign: 'center',
              marginTop: '10%',
            }}
          >
            Grow It guides and articles
          </Text>
          {dummyItems.map((item, index) => renderArticleCard({ item, index }))}
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
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    width: Dimensions.get('screen').width * 0.8,
    paddingBottom: 50,
  },
});

export default ArticleViews;
