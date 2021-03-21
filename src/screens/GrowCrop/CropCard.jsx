import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

import { SafeArea, GradientButton as Button } from '../../components';

import constants from '../../constants';

const { colors } = constants;

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const getMonthStripItemWidth = () => {
  const screenWidth = Dimensions.get('screen').width;
  const itemWidth = (screenWidth * 0.9) / 12;

  return itemWidth;
};

const CropCard = () => {
  const [activeScreen, setActiveScreen] = useState(0);

  const video = React.useRef(null);

  return (
    <SafeArea containerStyle={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          style={styles.top}
          colors={[colors.green, colors.greenDeep]}
        >
          <Text>Tomatoes</Text>
        </LinearGradient>
        <View style={{ paddingHorizontal: '5%' }}>
          <Button title="Sow It!" gradient={[colors.pink, colors.pinkDeep]} />
          <View style={styles.skipStep}>
            <Text>Not starting from seed?</Text>
            <TouchableOpacity>
              <Text style={styles.skipText}>Skip step ></Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>When to sow guide</Text>
            <View style={styles.monthStrip}>
              {months.map((item, index) => (
                <View
                  style={[
                    styles.montStripItem,
                    true && { backgroundColor: colors.blue },
                    index === 0 && {
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    },
                    index === months.length - 1 && {
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    },
                  ]}
                  key={index}
                >
                  <Text style={[{ color: colors.white }]}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.blue,
                  }}
                >
                  Sow Under Cover
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.blue100,
                  }}
                >
                  Sow Direct Outside
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: '7%' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 32,
                fontWeight: '100',
              }}
            >
              How to Sow Seeds
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Not all tomatoes will grow well outside with no protection, having
              said that there are varieties where you can so this is something
              to bear in mind when choosing seeds and thinking about where you
              will grow your tomatoes.
            </Text>
          </View>
          <View style={{ marginTop: '4%' }}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => {}}
            />
          </View>
          <LinearGradient
            colors={[colors.green, colors.greenDeep]}
          ></LinearGradient>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: colors.white, paddingBottom: '10%' },
  top: {
    backgroundColor: 'green',
    height: Dimensions.get('screen').height * 0.3,
  },
  skipStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  skipText: { color: colors.pink, fontSize: 15, fontWeight: 'bold' },
  monthStrip: {
    height: Dimensions.get('screen').height * 0.02,
    backgroundColor: 'red',
    borderRadius: 25,
    flexDirection: 'row',
    marginTop: 5,
  },
  montStripItem: {
    width: getMonthStripItemWidth(),
    alignItems: 'center',
    backgroundColor: colors.grey100,
    height: '100%',
  },
  video: {
    height: 200,
    width: '100%',
  },
});

export default CropCard;
