import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import { styles } from "../../../utils/stylesheet.jsx";

export default function BranchLoginMenuItem({ route }) {
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
                <TouchableOpacity style={styles.menu_overlay} onPress={() => toggleModal("menu", false)} />
                <View style={styles.menu_menu}>
                    <Menu.Item
                        style={{
                            backgroundColor: route.name === "UserLogin" ? "#D0D0D7" : "#fff",
                            borderRadius: 5
                        }}
                        leadingIcon="login"
                        title="User Login"
                        onPress={() => {
                            navigation.navigate('UserLogin');
                            toggleModal("menu", false);
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};