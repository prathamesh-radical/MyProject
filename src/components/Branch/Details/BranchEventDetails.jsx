import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import AttendanceDashboard from "./Dashboard/AttendanceDashboard.jsx";
import AttendanceRegistration from "./Registration/AttendanceRegistration.jsx";
import PendingRequest from "./Request/PendingRequest.jsx";

const Tab = createBottomTabNavigator();

export default function BranchEventDetails() {
    const { eventsData } = useContext(MyContext);
    const { CommonBranchWrapper } = useFunctions();
    const route = useRoute();
    const { eventName, eventId, branchId } = route.params;
    const filteredEvent = eventsData.find(
        (item) =>
            item.event_id === parseInt(eventId, 10) &&
            item.event_name === eventName
    );

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, eventName);
            return;
        }, [])
    );

    useEffect(() => {
        CommonBranchWrapper(route, eventName);
    }, [route, eventName]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    top: 0,
                    backgroundColor: "#fff",
                    height: 60,
                },
                tabBarActiveTintColor: "#2563EB",
                tabBarInactiveTintColor: "#6B7280",
                tabBarButton: (props) => {
                    const focused = props.accessibilityState?.selected;
                    return (
                        <TouchableOpacity
                            {...props}
                            style={[
                                props.style,
                                {
                                    borderBottomWidth: focused ? 2 : 0,
                                    borderBottomColor: focused ? "#2563EB" : "transparent",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                            ]}
                        />
                    );
                },
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            fontSize: 15,
                            color: focused ? "#2563EB" : "#6B7280",
                            paddingBottom: 0,
                            textAlign: "center",
                        }}
                    >
                        {route.name}
                    </Text>
                ),
                tabBarIconStyle: { display: "none" },
            })}
        >
            <Tab.Screen name="Attendance Dashboard">
                {() => (
                    <AttendanceDashboard routeDetails={route} eventName={eventName} />
                )}
            </Tab.Screen>
            <Tab.Screen name="Attendance Registration">
                {() => (
                    <AttendanceRegistration eventName={eventName} filteredEvent={filteredEvent} />
                )}
            </Tab.Screen>
            <Tab.Screen name="Pending Request">
                {() => (
                    <PendingRequest routeDetails={route} eventName={eventName} />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};