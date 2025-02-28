import React from "react";
import { Appbar } from 'react-native-paper';
import { styles } from "../../utils/stylesheet.jsx";

export default function AppBar({ title, backAction, menuItem, appbarStyle }) {
    return (
        <Appbar.Header elevated={1} style={[styles.appbar_container, {...appbarStyle}]}>
            {backAction}
            <Appbar.Content title={title} color="#fff" />
            {menuItem}
        </Appbar.Header>
    );
};
