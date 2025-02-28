import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import { Icon, Menu, Text } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import { styles } from "../../../../utils/stylesheet.jsx";

export default function BranchEvents({ route, visible, handleClose }) {
    const { eventsData } = useContext(MyContext);
    const navigation = useNavigation();

    return (
        <>
            <Menu.Item
                leadingIcon="calendar-outline"
                contentStyle={{ borderRadius: 5 }}
                title={
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Events</Text>
                        <View style={{ position: 'relative', left: visible ? 75 : 50 }}>
                            <Icon
                                source={visible ? 'chevron-down' : 'chevron-right'}
                                size={24}
                            />
                        </View>
                    </View>
                }
                onPress={() => handleClose("submenu", !visible)}
            />
            {visible && (
                <View style={styles.menu_submenu}>
                    <Menu.Item
                        leadingIcon="calendar-multiple"
                        title="All Events"
                        onPress={() => {
                            navigation.navigate("AllEvents", { panelType: "Branch" });
                            handleClose("submenu", false);
                            handleClose("menu", false);
                        }}
                    />
                    {eventsData.map((event) => (
                        <Menu.Item
                            key={event.event_id}
                            style={{
                                backgroundColor: route?.params?.eventName === event?.event_name ? "#D0D0D7" : "#fff",
                                borderRadius: 5,
                            }}
                            leadingIcon={
                                event.event_name === "Guru Gita"
                                    ? "leaf"
                                    : event.event_name === "Shiv Mahimna"
                                        ? "om"
                                        : "calendar-multiple"
                            }
                            title={event.event_name}
                            onPress={() => {
                                navigation.navigate(
                                    "BranchEventDetails", { eventId: event.event_id, eventName: event.event_name, }
                                );
                                handleClose("submenu", false);
                                handleClose("menu", false);
                            }}
                        />
                    ))}
                    <Menu.Item
                        leadingIcon="calendar-text-outline"
                        title="Other"
                        onPress={() => {
                            navigation.navigate("OtherEvents");
                            handleClose("submenu", false);
                            handleClose("menu", false);
                        }}
                    />
                </View>
            )}
        </>
    );
};