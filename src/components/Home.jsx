import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import useFunctions from "../hooks/useFunctions";
import { styles } from "../utils/stylesheet";

export default function Home() {
    const { CommonFrontWrapper } = useFunctions();
    const navigation = useNavigation();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonFrontWrapper(null, route);
            return;
        }, [])
    );

    return (
        <LinearGradient
            colors={['#3B82F6', '#A855F7']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.home_container}
        >
            <Text style={{ textAlign: "center", fontSize: 25, color: "#fff", }}>Welcome to Mukteshwari!</Text>
            <Text style={{ textAlign: "center", color: "#fff" }}>
                Manage your events efficiently with our intuitive branch dashboard. Join now to get started!
            </Text>
            <TouchableOpacity style={styles.home_button} onPress={() => navigation.navigate('BranchLogin')}>
                <Text style={styles.home_buttonText}>
                    <Icon source="view-dashboard" color="#3B82F6" size={24} /> Get Branch Dashboard
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};