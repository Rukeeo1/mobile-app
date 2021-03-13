import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
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
  return (
    <SafeAreaView style={styles.tab}>
      <View style={styles.ellipse}>
        <FontAwesome5 name='ellipsis-h' size={24} color={colors.greenLight} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity style={{ ...styles.tabIconWrapper }}>
          <Feather name='bell' size={24} color={colors.greenLight} />
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.tabIconWrapper }}>
          <Entypo name='plus' size={30} color={colors.greenLight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.tabIconWrapper, ...styles.tabIconActive }}
          onPress={() => navigation.navigate('Following')}
        >
          <Ionicons
            name='md-person-outline'
            size={24}
            color={colors.greenDeep}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.tabIconWrapper }}>
          <Octicons name='globe' size={34} color={colors.greenLight} />
        </TouchableOpacity>
      </View>
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
  },
  tabIconActive: {
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 3,
    left: -10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
  },
});

export default ProfileSideTab;
