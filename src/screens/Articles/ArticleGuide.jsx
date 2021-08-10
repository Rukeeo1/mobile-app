import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategories,
  getArticles,
} from "../../redux/actions/articlesActions";

import { SafeArea } from "../../components";
import constants from "../../constants";

const { colors } = constants;
const ArticleGuide = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, refreshing } = useSelector((state) => state.loading);
  const { categories = [] } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <SafeArea>
        <LinearGradient
          style={styles.container}
          colors={[colors.purshBlue, colors.blue]}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: 1,
              width: Dimensions.get("screen").width * 0.1,
              overflow: "visible",
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color={colors.white}
              style={{ marginTop: 30, marginLeft: 0 }}
              onPress={() => navigation.goBack()}
            />
          </View>
          {/* </View> */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading || refreshing}
                onRefresh={() => dispatch(getCategories(true))}
                colors={[colors.green]}
                tintColor={colors.green}
              />
            }
          >
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "100",
                    textAlign: "center",
                    paddingHorizontal: 70,
                    marginTop: "20%",
                    marginBottom: 27,
                  }}
                >
                  Grow It guides and articles
                </Text>
              </View>
              {categories?.map((article) => {
                return (
                  <TouchableOpacity
                    style={{ marginTop: 15 }}
                    key={article?.id}
                    onPress={() => {
                      dispatch(getArticles(article?.id));
                      navigation.navigate("ArticleContent");
                    }}
                  >
                    <View>
                      <Image
                        style={{ height: 181 }}
                        source={{ uri: article?.image_url }}
                      />
                    </View>

                    <View style={{ marginTop: 15 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          textAlign: "center",
                          marginHorizontal: 20,
                        }}
                      >
                        {article?.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                          marginTop: 5,
                          paddingHorizontal: 40,
                        }}
                      >
                        {article?.summary}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ height: 50, backgroundColor: colors.white }} />
          </ScrollView>
        </LinearGradient>
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    overflow: "visible",
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    width: Dimensions.get("screen").width * 0.8,
    paddingBottom: 50,
    overflow: "visible",
  },
});

export default ArticleGuide;
