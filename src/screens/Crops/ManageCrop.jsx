import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'


const { colors } = constants
const ManageCrops = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title]}>Manage Crops</Text>
          </View>

          <View style={[styles.growCalendarCard]}>
            <Text style={[styles.growText]}>You aren’t growing anything yet!</Text>
            <Text style={[styles.growText]}>
              Add a crop to your <Text>Grow Calendar</Text> today
            </Text>

            <GradientButton gradient={[colors.green, colors.greenDeep]}>
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={[styles.btnText]}>Go to grow Calendar</Text>
                  </View>
                </GradientButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        marginVertical: 100
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    growCalendarCard: {
        backgroundColor: colors.greenTransparent,
        borderRadius: 50/2
    },
    growText: {
        textAlign: 'center',
        color: colors.white,
        marginVertical: 10
    },  
    btnText: {
        color: colors.white,
        fontWeight: 'bold'
    }
})

export default ManageCrops
