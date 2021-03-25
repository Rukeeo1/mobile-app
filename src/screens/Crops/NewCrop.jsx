import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from "react-native"



const NeCrop = () => {
    return (
        <View style={{flex: 1, backgroundColor: 'dodgerblue'}}>
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View>
                            <View>selected</View>
                            <View>arrow</View>
                        </View>
                        <View>
                            <Text>options</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
