import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import { styles } from "../../../utils/stylesheet.jsx";
import UserEvents from "./SubMenuItem/UserEvents.jsx";

export default function UserHomeMenuItem({ route, onLogout }) {
    const { MORE_ICON: moreIcon, modalsVisibility, toggleModal } = useContext(MyContext);
    const navigation = useNavigation();

    return (
        <View style={styles.menu_container}>
            <Appbar.Action icon={moreIcon} color="#fff" onPress={() => toggleModal("menu", true)} />
            <Modal
                transparent={true}
                visible={modalsVisibility.menu}
                animationType="fade"
                onRequestClose={() => toggleModal("menu", false)}
            >
                <TouchableOpacity
                    style={styles.menu_overlay}
                    onPress={() => {
                        toggleModal("menu", false);
                        toggleModal("submenu", false);
                    }}
                />
                <View style={styles.menu_menu}>
                    <UserEvents
                        route={route}
                        visible={modalsVisibility.submenu}
                        handleClose={toggleModal}
                    />
                    <Menu.Item
                        style={{
                            backgroundColor: route.name === "AttendedEvents" ? "#D0D0D7" : "#fff",
                            borderRadius: 5
                        }}
                        leadingIcon="history"
                        title="Attended Events"
                        onPress={() => {
                            navigation.navigate("AttendedEvents");
                            toggleModal("menu", false);
                        }}
                    />
                    <Menu.Item
                        style={{
                            backgroundColor: route.name === "RequestedEvents" ? "#D0D0D7" : "#fff",
                            borderRadius: 5
                        }}
                        leadingIcon="calendar-text-outline"
                        title="Requested Events"
                        onPress={() => {
                            navigation.navigate("RequestedEvents");
                            toggleModal("menu", false);
                        }}
                    />
                    <Menu.Item
                        leadingIcon="power"
                        title="Logout"
                        onPress={onLogout}
                    />
                </View>
            </Modal>
        </View>
    );
}
