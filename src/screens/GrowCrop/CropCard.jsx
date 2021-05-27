import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  getCropCycleDetails,
  getCropSteps,
  growCrop,
  harvestCrop,
  plantCrop,
} from '../../redux/actions/';
import ManageCropContext from '../../context/ManageCropsContext';

import ActionSheet from './ActionSheet';
import SideMenuOverlay from './SideMenuOverlay';

import { SafeArea, GradientButton as Button, Text } from '../../components';

import { MyCarousel as StepsCarousel } from './Carousel';
import { EditableTitle } from './Title';
import { SowItContainer } from './SowItContainer';
import { MonthGraph } from './MonthGraph';

import constants from '../../constants';
import { getCropCardData } from '../../utils/index';

import home from '../../assets/home-icon.png';
// import pencil from '../../assets/pencil_circle.png';

import plant from '../../assets/plant.png';
import growingSeed from '../../assets/growing-seed.png';
import harvestIcon from '../../assets/harvest-icon.png';

const { colors, monthsAbr } = constants;

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CropCard = ({ navigation }) => {
  const manageCropContext = useContext(ManageCropContext);
  const { cropToGrowDetails } = manageCropContext?.data;
  const { cropCycleDetails, cropSteps, user } = useSelector((state) => ({
    cropCycleDetails: state.crops.cropCycleDetails[0],
    cropSteps: state.crops.cropSteps,
    user: state?.auth?.user,
  }));
  const dispatch = useDispatch();

  const [activeScreen, setActiveScreen] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const cycleData = getCropCardData(cropCycleDetails, cropSteps, activeScreen);

  useEffect(() => {
    if (cropToGrowDetails?.cropId) {
      dispatch(getCropCycleDetails(cropToGrowDetails?.cropId));
      dispatch(getCropSteps(cropToGrowDetails?.cropId));
    }
    if (cropToGrowDetails.action === 'harvest') {
      setActiveScreen(2);
    }
    if (cropToGrowDetails.action === 'plant') {
      setActiveScreen(1);
    }
  }, [cropToGrowDetails?.cropId]);

  const video = React.useRef(null);

  const images = [growingSeed, plant, harvestIcon];

  const toggleBtmSheet = () => setShowBottomSheet((prevState) => !prevState);

  const sowMonth =
    cropToGrowDetails?.action === 'grow'
      ? monthsAbr[cropToGrowDetails?.monthIndex]
      : cropCycleDetails?.sow_months?.split(',')[0];

  const plantMonth =
    cropToGrowDetails?.action === 'plant'
      ? monthsAbr[cropToGrowDetails?.monthIndex]
      : `${cropCycleDetails?.plant_start_month || ''} - ${
          cropCycleDetails?.plant_end_month || ''
        }`;

  const harvestMonth =
    cropToGrowDetails?.action === 'harvest'
      ? monthsAbr[cropToGrowDetails?.monthIndex]
      : `${cropCycleDetails?.harvest_start_month || ''} - ${
          cropCycleDetails?.harvest_end_month || ''
        }`;

  const cropSeasons = [sowMonth, plantMonth, harvestMonth];

  const handleGrowCrop = async (selectedDate, jobType) => {
    const jobInfo = {
      crop_id: cropToGrowDetails?.cropId,
      user_id: user?.id,
      job_date: new Date(selectedDate),
    };

    setLoadingJobs(true);

    if (jobType === 'Sow') {
      jobInfo.title = 'Sow';
      await dispatch(growCrop(jobInfo, Toast));
    }

    if (jobType === 'Plant') {
      jobInfo.title = 'Plant';
      await dispatch(plantCrop(jobInfo, Toast));
    }

    if (jobType === 'Harvest') {
      jobInfo.title = 'Harvest';
      await dispatch(harvestCrop(jobInfo, Toast));
    }

    setLoadingJobs(false);
  };

  const renderTab = (season, index) => (
    <>
      <View
        style={[
          {
            alignItems: 'center',
            width: screenWidth * 0.28,
            borderTopLeftRadius: screenWidth * 0.2,
            borderTopRightRadius: screenWidth * 0.2,
            justifyContent: 'center',
            height: screenHeight * 0.165,

            marginHorizontal: '6%',
          },
          activeScreen === index && { backgroundColor: colors.white },
        ]}
      >
        <TouchableOpacity onPress={() => setActiveScreen(index)}>
          <LinearGradient
            colors={
              activeScreen === index
                ? [colors.pink, colors.pinkDeep]
                : [colors.green, colors.greenDeep]
            }
            style={{
              height: screenWidth * 0.2,
              width: screenWidth * 0.2,
              borderRadius: (screenWidth * 0.2) / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={images[index]}
              style={{
                height: screenHeight * 0.05,
                width: screenHeight * 0.05,
                resizeMode: 'contain',
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={{
            color: activeScreen === index ? colors.black : colors.white,
            marginTop: '6%',
          }}
        >
          {season}
        </Text>

        <View
          style={[
            {
              height: 20,
              width: 15,
              position: 'absolute',
              bottom: 0,
              left: -15,
            },
            activeScreen === index && { backgroundColor: colors.white },
          ]}
        >
          <View
            style={{
              height: '100%',
              width: '100%',
              borderBottomRightRadius: 20,
              backgroundColor: colors.greenDeep,
            }}
          />
        </View>
        <View
          style={[
            {
              height: 26,
              width: 15,
              position: 'absolute',
              bottom: -0.75,
              right: -15,
            },
            activeScreen === index && { backgroundColor: colors.white },
          ]}
        >
          <View
            colors={[colors.greenDeep, colors.greenDeep]}
            style={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 23,
              backgroundColor: colors.greenDeep,
            }}
          />
        </View>
        <View />
      </View>
    </>
  );

  //small right pink arrow...
  const renderCalenderConfirmIcon = (setSelectedDateItems) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1',
          paddingHorizontal: '5%',
          marginRight: 20,
          marginTop: '2%',
        }}
      >
        <TouchableOpacity
          onPress={setSelectedDateItems}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: colors.pink,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AntDesign name='right' size={29} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeArea containerStyle={{ flex: 1 }}>
      {!showSideMenu && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 989889233,
            bottom: 100,
            right: 30,
          }}
          onPress={() => setShowSideMenu(true)}
        >
          <LinearGradient
            colors={[colors.greenDeep, colors.green]}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={home} />
          </LinearGradient>
        </TouchableOpacity>
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          style={styles.top}
          colors={[colors.green, colors.greenDeep]}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: '10%',
            }}
          >
            {/* <TouchableOpacity onPress={() => toggleBtmSheet()}>
              <Image source={pencil} style={{ height: 37, width: 37 }} />
            </TouchableOpacity> */}
          </View>
          <EditableTitle cropToGrowDetails={cropToGrowDetails} />

          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: '4%',
            }}
          >
            {cropSeasons?.map((season, index) => (
              <React.Fragment key={index}>
                {renderTab(season, index)}
              </React.Fragment>
            ))}
          </View>
        </LinearGradient>
        <View style={{ paddingHorizontal: '5%' }}>
          {activeScreen === 0 && (
            <SowItContainer
              buttonTitle='Sow It!'
              renderIcon={(itemToConfirm) =>
                renderCalenderConfirmIcon(itemToConfirm)
              }
              tip='Enter the date you plan to sow your seeds'
              reminderText='Sown'
              startMonth={cropToGrowDetails.month}
              onSubmitSelected={handleGrowCrop}
              onSubmitSelected={(dateSelected) => {
                handleGrowCrop(dateSelected, 'Sow');
              }}
              submitting={loadingJobs}
            />
          )}
          {activeScreen === 1 && (
            <SowItContainer
              buttonTitle='Plant It!'
              tip='When do you want to plant?'
              renderIcon={(itemToConfirm) =>
                renderCalenderConfirmIcon(itemToConfirm)
              }
              reminderText='Reminder to plant'
              startMonth={cropCycleDetails?.plant_start_month}
              onSubmitSelected={(dateSelected) => {
                handleGrowCrop(dateSelected, 'Plant');
              }}
              submitting={loadingJobs}
            />
          )}
          {activeScreen === 2 && (
            <SowItContainer
              buttonTitle='Harvest it!'
              tip='Enter the date harvest started'
              renderIcon={(itemToConfirm) =>
                renderCalenderConfirmIcon(itemToConfirm)
              }
              reminderText='Harvest started'
              showHoriazontalButtonAfterDateIsSelected
              onPressOfHorizontalBtn={() => navigation.navigate('End-Harvest')}
              startMonth={cropCycleDetails?.harvest_start_month}
              onSubmitSelected={(dateSelected) =>
                handleGrowCrop(dateSelected, 'Harvest')
              }
              submitting={loadingJobs}
            />
          )}
          <View style={styles.skipStep}>
            <Text>Not starting from seed?</Text>
            <TouchableOpacity>
              <Text style={styles.skipText}>Skip step ></Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              zIndex: 28983,
              backgroundColor: colors.white,
            }}
          >
            {activeScreen === 0 && (
              <MonthGraph
                activeMonths={cropCycleDetails?.sow_months?.split(',')}
                title='When to sow guide'
                bottomTextOne='Sow Under Cover'
                bottomTextTwo='Sow Direct Outside'
              />
            )}
            {activeScreen === 1 && (
              <MonthGraph
                activeMonths={[
                  cropCycleDetails?.plant_start_month,
                  cropCycleDetails?.plant_end_month,
                ]}
                title='When to plant guide'
                bottomTextOne='Plant out'
              />
            )}
            {activeScreen === 2 && (
              <MonthGraph
                activeMonths={[
                  cropCycleDetails?.harvest_start_month,
                  cropCycleDetails?.harvest_end_month,
                ]}
                title='When to harvest guide'
                bottomTextOne='Harvest months'
              />
            )}

            <View>
              <Button
                gradient={[colors.purshBlue, colors.blue]}
                title='Add to Journal'
                onPress={() =>
                  navigation.navigate('Crop-Journal', {
                    screen: 'Create-Journal',
                  })
                }
              />
              {/* </Tooltip> */}
            </View>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                marginVertical: 10,
                fontWeight: '100',
              }}
            >
              {cycleData?.title}
            </Text>
            <Text style={{ textAlign: 'center' }}>{cycleData?.summary}</Text>
          </View>
          <View style={{ marginTop: '4%' }}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}
              useNativeControls
              resizeMode='contain'
              isLooping
              onPlaybackStatusUpdate={(status) => {}}
            />
          </View>
          <StepsCarousel steps={cycleData?.steps} />

          <LinearGradient
            style={styles.toolTip}
            colors={[colors.green, colors.greenDeep]}
          >
            <Text style={styles.toolTipTitle}>Tool tip</Text>
            <Text style={styles.toolTipContent}>{cycleData?.tip}</Text>
          </LinearGradient>
          <View style={styles.companionContainer}>
            <Image
              source={{
                uri: cropCycleDetails?.media_url,
              }}
              style={styles.companionContainerImage}
            />
            {cropCycleDetails?.companion_crops && (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.companionContainerTitle}>
                  Companion Plant
                </Text>
                <Text style={styles.companionContainerText}>
                  Basil is great with tomatoes not only for its culinary
                  delights, but it can also help deter some garden pests such as
                  whiteflies.
                </Text>
              </View>
            )}
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Ready. Set. Grow!</Text>
          </View>
        </View>
      </ScrollView>
      <ActionSheet onClose={toggleBtmSheet} showBottomSheet={showBottomSheet} />
      {showSideMenu && (
        <SideMenuOverlay toggleSideMenu={() => setShowSideMenu(false)} />
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: '10%',
    position: 'relative',
  },
  top: {
    backgroundColor: 'green',
    zIndex: 2323,
  },
  skipStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    zIndex: 232,
    backgroundColor: colors.white,
  },
  skipText: { color: colors.pink, fontSize: 15, fontWeight: 'bold' },

  video: {
    height: 200,
    width: '100%',
  },
  toolTip: {
    borderRadius: 8,
    height: 'auto',
    justifyContent: 'center',
    marginTop: '5%',
    paddingHorizontal: '3%',
    paddingVertical: '5%',
  },
  toolTipTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolTipContent: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '300',
    marginTop: '4%',
    fontSize: 16,
  },
  companionContainer: {
    marginTop: '5%',
  },
  companionContainerImage: {
    height: Dimensions.get('screen').height * 0.2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  companionContainerTitle: {
    color: colors.pink,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '4%',
  },
  companionContainerText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '3%',
  },
  footer: {
    marginTop: '6%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 24,
    fontWeight: '200',
  },
});

export default CropCard;
