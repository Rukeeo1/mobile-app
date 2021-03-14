import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {
  FontAwesome5,
  Feather,
  Ionicons,
  Entypo,
  Octicons,
} from '@expo/vector-icons';

import constants from '../../constants/index';

const { colors } = constants;

const ProfileSideTab = ({ navigation }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [roundBackgroundAnimation] = useState(
    new Animated.ValueXY({ x: -10, y: 102 })
  );

  const [iconAnimation] = useState(new Animated.Value(0));


  const containerRef = React.useRef();

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const moveBall = (itemPosition) => {
    const itemsCoordinates = coordinates[itemPosition];

    Animated.spring(roundBackgroundAnimation, {
      toValue: { x: -10, y: itemsCoordinates?.y },
      useNativeDriver: false,
    }).start();
  };

  const sideBarTabItems = [
    {
      name: 'notifications',
      icon: () => <Feather name='bell' size={24} color={colors.greenLight} />,
      ref: React.createRef(),
    },
    {
      name: 'create-post',
      icon: () => <Entypo name='plus' size={30} color={colors.greenLight} />,
      ref: React.createRef(),
    },
    {
      name: 'profile',
      icon: () => (
        <Ionicons name='md-person-outline' size={24} color={colors.greenDeep} />
      ),
      ref: React.createRef(),
    },
    {
      name: 'explore',
      icon: () => <Octicons name='globe' size={34} color={colors.greenLight} />,
      ref: React.createRef(),
    },
  ];

  useEffect(() => {
    const intialCoordinatesDetails = [];
    sideBarTabItems.forEach((item) => {
      item.ref.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          intialCoordinatesDetails.push({
            x,
            y,
            width,
            height,
            item: item.name,
          });
          intialCoordinatesDetails.length === sideBarTabItems.length &&
            setCoordinates(intialCoordinatesDetails);
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.tab}>
      <View style={styles.ellipse}>
        <FontAwesome5 name='ellipsis-h' size={24} color={colors.greenLight} />
      </View>
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        ref={containerRef}
      >
        <Animated.View
          onPress
          style={[styles.tabIconActive, roundBackgroundAnimation.getLayout()]}
        />

        {sideBarTabItems.map((item, index) => (
          // <TouchableOpacity
          //   style={[styles.tabIconWrapper]}
          //   key={index}
          //   ref={item.ref}
          //   onPress={() => moveBall(index)}
          // >
          //   {item.icon()}
          // </TouchableOpacity>
          <AnimatedTouchable
            style={[styles.tabIconWrapper]}
            onPress={() => moveBall(index)}
            ref={item.ref}
            key={index}
          >
            {item.icon()}
          </AnimatedTouchable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    backgroundColor: colors.white,
    width: '80%',
    paddingTop: '10%',
    flex: 1,
    borderTopRightRadius: 40,
  },
  tab: {
    width: 65,
  },
  ellipse: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconWrapper: {
    marginVertical: 42,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 290323,
    elevation: 10,
  }, // 12
  tabIconActive: {
    top: 534,
    zIndex: -9,
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 3,
    left: -10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    height: 60,
    width: 60,
  },
});

export default ProfileSideTab;
