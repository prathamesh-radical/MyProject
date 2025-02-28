import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { styles } from "../../utils/stylesheet";
import AppBar from "./Appbar.jsx";
import BottomBar from "./BottomBar.jsx";

export default function Wrapper({ title, backAction, style, children, menuItem, homepath, settingpath, appbarStyle }) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return (
        <View style={styles.wrap_container}>
            <AppBar title={title} backAction={backAction} menuItem={menuItem} appbarStyle={appbarStyle} />
            {children}
            {!isKeyboardVisible && (
                <BottomBar style={style} homepath={homepath} settingpath={settingpath} />
            )}
        </View>
    );
};