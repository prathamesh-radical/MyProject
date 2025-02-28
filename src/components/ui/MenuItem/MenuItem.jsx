import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

export default function MenuItem({ itemId, handleStatusUpdate }) {
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
                style={{ marginTop: "9%" }}
            >
                <Menu.Item
                    leadingIcon={({ size }) => (
                        <IconButton icon="check-circle" size={size} iconColor="green" />
                    )}
                    title="Accept"
                    onPress={() => {
                        handleStatusUpdate(itemId, "Accepted");
                        closeMenu();
                    }}
                    titleStyle={{ color: "green", marginLeft: "20%" }}
                    style={{ width: "100%", gap: 50 }}
                />
                <Menu.Item
                    leadingIcon={({ size }) => (
                        <IconButton icon="close-circle" size={size} iconColor="red" />
                    )}
                    title="Reject"
                    onPress={() => {
                        handleStatusUpdate(itemId, "Rejected");
                        closeMenu();
                    }}
                    titleStyle={{ color: "red", marginLeft: "20%" }}
                    style={{ width: "100%", gap: 50 }}
                />
            </Menu>
        </View>
    );
}