import React, { useContext, useState } from "react";
import { View } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider";

export default function RegisterMenuItem({ id, data, handleStatusUpdate }) {
    const { toggleModal } = useContext(MyContext);
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <IconButton
                        icon="dots-horizontal"
                        iconColor="#fff"
                        onPress={openMenu}
                        mode="contained-tonal"
                        size={20}
                        style={{ backgroundColor: "#2563EB" }}
                    />
                }
                style={{ marginTop: "9%", width: "50%" }}
            >
                <View style={{ paddingHorizontal: "15%", justifyContent: "center", alignSelf: "center" }}>
                    <Menu.Item
                        leadingIcon={({ size }) => (
                            <IconButton icon="check-circle" size={size} iconColor="#fff" />
                        )}
                        title="Accept"
                        onPress={() => {
                            handleStatusUpdate(id, "Accepted");
                            closeMenu();
                        }}
                        titleStyle={{ color: "#fff", marginLeft: "20%" }}
                        style={{ backgroundColor: "green", borderRadius: 5 }}
                    />
                    <Menu.Item
                        leadingIcon={({ size }) => (
                            <IconButton icon="information-outline" size={size} style={{ position: "relative", right: 10 }} />
                        )}
                        title="More Details"
                        onPress={() => {
                            toggleModal("branch", true, data, id);
                            closeMenu();
                        }}
                        titleStyle={{ marginLeft: "15%", position: "relative", right: 10 }}
                    />
                </View>
            </Menu>
        </View>
    );
}