import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";

import { getCropSearchResults } from "../../redux/actions/cropActions";
import ManageCropContext from "../../context/ManageCropsContext";

import { GradientButton, Input } from "../../components/";
import { FilterItemDropDown } from "./FilterItemDropDown";

import constants from "../../constants";

const { colors, months } = constants;

const CropSearch = ({ navigation, route }) => {
  const manageCropContext = useContext(ManageCropContext);

  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    months[manageCropContext?.data.growInMonthIndex]
  );
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [hideMonthFilter, setHideMonthFilter] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);
  const { searchResults } = useSelector((state) => state.crops);

  let _menu = null;

  const clearFilter = () => {
    setSelectedLevel(null);
    setSelectedMonth(null);
    setSelectedLevel(null);
    setSelectedCategory(null);
    setSelectedCycle(null);
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value !== "" && selectedMonth)
      dispatch(getCropSearchResults(value, selectedMonth));
  };

  useEffect(() => {
    dispatch(getCropSearchResults("", selectedMonth));
  }, [selectedMonth]);

  const getFilterCount = () => {
    let count = 0;

    if (selectedMonth) count++;
    if (selectedLevel) count++;
    if (selectedCategory) count++;
    if (selectedCycle) count++;

    return count;
  };

  const filtered = (searchResults?.crops ?? [])
    .filter((crop) =>
      !selectedMonth
        ? crop?.name?.toLowerCase()?.includes(search?.toLowerCase())
        : true
    )
    .filter((crop) =>
      selectedLevel ? crop?.grow_level == selectedLevel : true
    )
    .filter((crop) =>
      selectedCategory ? crop?.category == selectedCategory : true
    )
    .filter((crop) =>
      selectedCycle ? crop?.life_cycle == selectedCycle : true
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <SafeAreaView> */}
      <ScrollView>
        <View>
          <LinearGradient
            style={[styles.searchContainer]}
            colors={[colors.green, colors.greenDeep]}
          >
            <View style={styles.searchCover}>
              <View style={[styles.searchForm]}>
                <Input
                  placeholder="Search crops"
                  containerStyle={styles.searchInputContainer}
                  inputStyle={{ marginTop: -10, paddingRight: 10, flex: 1 }}
                  onChangeText={(text) => handleSearch(text)}
                ></Input>
                <EvilIcons name="search" size={24} color={colors.blue} />
              </View>
              <Text
                style={[styles.cancelText]}
                onPress={() => navigation.goBack()}
              >
                Cancel
              </Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <GradientButton
                gradient={[colors.red, colors.redDeep]}
                onPress={() => setFilterModal(true)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    flex: 1,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Filter
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    {getFilterCount() > 0 ? getFilterCount() : ""}
                  </Text>
                </View>
              </GradientButton>
              {/* <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  width: '100%',
                  flex: 1,
                }}
                contentContainerStyle={{
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={clearFilter}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    marginHorizontal: 20,
                    marginTop: -15,
                    height: 80,
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontWeight: '500',
                      textDecorationLine: 'underline',
                    }}
                  >
                    Clear filters
                  </Text>
                </TouchableOpacity>
                <FilterItemDropDown
                  items={months}
                  activeItem={selectedMonth ?? 'Select Month'}
                  onSelect={setSelectedMonth}
                  placeholder='Month to grow'
                  style={{
                    marginTop: 10,
                  }}
                />
                <FilterItemDropDown
                  items={['Beginner', 'Intermediate', 'Advanced']}
                  activeItem={selectedLevel ?? 'Select level'}
                  onSelect={setSelectedLevel}
                  placeholder='Grow level'
                />
                <FilterItemDropDown
                  items={['Fruit', 'Vegetable', 'Herb', 'Microgreen', 'Flower']}
                  activeItem={selectedCategory ?? 'Select category'}
                  onSelect={setSelectedCategory}
                  placeholder='Category'
                />
                <FilterItemDropDown
                  items={['Annual', 'Biennial', 'Perennial', 'Tender Perennial']}
                  activeItem={selectedCycle ?? 'Select cycle'}
                  onSelect={setSelectedCycle}
                  placeholder='Life Cycle'
                />
              </ScrollView> */}
            </View>
          </LinearGradient>
        </View>
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.green}
            animating
            style={{ paddingVertical: 10 }}
          />
        )}
        {filtered?.length < 1 ? (
          <View style={{ marginTop: 30 }}>
            {search !== "" && (
              <>
                <Text style={{ textAlign: "center" }}>No matches found</Text>

                <View style={{ marginTop: 50 }}>
                  <Text style={{ textAlign: "center" }}>
                    Looks like you are getting adventurous!
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    Create a new crop below
                  </Text>
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={[styles.cropSection]}>
            {filtered.map((crop) => {
              // let input_string = crop?.name;
              // let left_text = input_string.substring(0, input_string.indexOf("_CoverPhoto")) ;
              // let parts = left_text.split("/");
              // let cropNameModified = crop?.name === 'string' ? parts[parts.length - 1] : crop?.name;
              return (
                <TouchableOpacity
                  key={crop?.id}
                  activeOpacity={0.9}
                  style={[styles.cropCardContainer]}
                  onPress={() =>
                    navigation.navigate("Crop-selection", {
                      cropName: crop?.name,
                      growLevel: crop?.grow_level,
                      sowTip: crop?.sow_tip,
                      cropId: crop?.id,
                    })
                  }
                >
                  <View style={[styles.cropDetails]}>
                    <Image
                      style={[styles.cropAvatar]}
                      source={{ uri: crop?.thumbnail_url }}
                    />
                    <View style={[styles.cropText]}>
                      <Text style={[styles.cropName]}>{crop?.name}</Text>
                      <Text>{crop?.grow_level}</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color={colors.green} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={[styles.createNewCropBtn]}>
          <GradientButton
            gradient={[colors.green, colors.greenDeep]}
            onPress={() => navigation.navigate("New-crop")}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Text style={[styles.btnText]}>Create new crop</Text>
            </View>
          </GradientButton>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
      <Modal
        animationType="slide"
        visible={filterModal}
        onDismiss={() => setFilterModal(false)}
        onRequestClose={() => setFilterModal(false)}
      >
        <LinearGradient
          style={{ flex: 1 }}
          colors={[colors.green, colors.greenDeep]}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingVertical: 50,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ width: "100%", marginTop: 20 }}>
              <FilterItemDropDown
                items={months}
                activeItem={
                  selectedMonth ? `Grow in ${selectedMonth}` : "Select Month"
                }
                onSelect={setSelectedMonth}
                placeholder="Month to grow"
                showRed={!!selectedMonth}
              />
              <FilterItemDropDown
                items={["Beginner", "Intermediate", "Advanced"]}
                activeItem={selectedLevel ?? "Select level"}
                onSelect={setSelectedLevel}
                placeholder="Grow level"
                showRed={!!selectedLevel}
              />
              <FilterItemDropDown
                items={["Fruit", "Vegetable", "Herb", "Microgreen", "Flower"]}
                activeItem={selectedCategory ?? "Select category"}
                onSelect={setSelectedCategory}
                placeholder="Category"
                showRed={!!selectedCategory}
              />
              <FilterItemDropDown
                items={["Annual", "Biennial", "Perennial", "Tender Perennial"]}
                activeItem={selectedCycle ?? "Select cycle"}
                onSelect={setSelectedCycle}
                placeholder="Life Cycle"
                showRed={!!selectedCycle}
              />
            </View>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  clearFilter();
                  // setFilterModal(false)
                }}
                style={{ alignSelf: "center", marginBottom: 20 }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Clear all filters
                </Text>
              </TouchableOpacity>
              <GradientButton
                gradient={[colors.red, colors.redDeep]}
                onPress={() => setFilterModal(false)}
                title="View crops"
              />
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 30,
    // paddingHorizontal: 25,
  },
  searchCover: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: '100%',
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 50 / 2,
    flex: 1,
  },
  searchInputContainer: {
    // backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    marginRight: 10,
    flex: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelText: {
    color: colors.white,
    marginLeft: 10,
  },
  scrollDate: {
    // padding: 10,
    // paddingRight: '10%'
  },
  clearFilter: {
    color: colors.white,
    textDecorationLine: "underline",
  },
  cropSection: {
    marginVertical: 28,
    padding: 20,
  },
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    borderRadius: 100 / 2,
    height: 70,
    paddingRight: 20,
    marginVertical: 10,
    // shadow iOS
    shadowColor: "grey",
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow android
    elevation: 15,
  },
  cropDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cropAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  cropText: {
    marginLeft: 10,
    flex: 1,
  },
  cropName: {
    fontSize: 16,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
  },
  gradientBtn: {
    marginVertical: 50,
  },
  createNewCropBtn: {
    padding: 20,
    flex: 1,
    // bottom: '-30%',
  },
});

export default CropSearch;
