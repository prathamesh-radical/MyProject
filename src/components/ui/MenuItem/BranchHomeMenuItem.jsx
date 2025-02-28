import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import { styles } from "../../../utils/stylesheet.jsx";
import BranchEvents from "./SubMenuItem/BranchEvents.jsx";

export default function BranchHomeMenuItem({ route, onLogout }) {
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
                    <Menu.Item
                        style={{
                            backgroundColor: route.name === "CreateUser" ? "#D0D0D7" : "#fff",
                            borderRadius: 5
                        }}
                        leadingIcon="account-outline"
                        title="Create User"
                        onPress={() => {
                            navigation.navigate('CreateUser');
                            toggleModal("menu", false);
                        }}
                    />
                    <BranchEvents
                        route={route}
                        visible={modalsVisibility.submenu}
                        handleClose={toggleModal}
                    />
                    <Menu.Item
                        style={{
                            backgroundColor: route.name === "UsersRequest" ? "#D0D0D7" : "#fff",
                            borderRadius: 5
                        }}
                        leadingIcon="account-voice"
                        title="User's requests"
                        onPress={() => {
                            navigation.navigate('UsersRequest');
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
};