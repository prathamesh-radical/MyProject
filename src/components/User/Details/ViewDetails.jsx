import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import { formatDates, getEventDates } from "../../../utils/formatData.jsx";
import Attendence from "./Attendence/Attendence.jsx";
import Calculation from "./Calculation.jsx";

const Tab = createBottomTabNavigator();

export default function ViewDetails() {
    const { requestsData, eventsData } = useContext(MyContext);
    const { CommonUserWrapper } = useFunctions();
    const route = useRoute();
    const { eventName, eventId, userId } = route.params;
    const filteredEvent = eventsData.find((item) => item.event_id === parseInt(eventId, 10));
    const eventday = filteredEvent?.recurrence_day;
    const eventDates = getEventDates(eventday);
    const dates = formatDates(eventDates);
    const filteredRequests = requestsData.filter(
        (request) =>
            request.event_id === parseInt(eventId, 10) &&
            request.user_id === parseInt(userId, 10)
    );
    const updatedFilteredRequests = filteredRequests.map((request) => {
        return {
            ...request,
            date: new Date(request.date).toISOString().split("T")[0],
        };
    });
    const shiftedRequests = updatedFilteredRequests.map((request) => {
        const newDate = new Date(request.date);
        newDate.setDate(newDate.getDate() + 1);
        return {
            ...request,
            date: newDate.toISOString().split("T")[0],
        };
    });

    const newArray = eventDates.map((date) => {
        const matchingRequest = shiftedRequests.find((request) => request.date === date);

        if (matchingRequest) {
            return {
                date: matchingRequest.date,
                status: matchingRequest.status,
            };
        } else {
            return {
                date: date,
                status: "Not attended",
            };
        }
    });
    const AcceptStatus = requestsData.filter(
        (request) =>
            request.event_id === parseInt(eventId, 10) &&
            request.user_id === parseInt(userId, 10) &&
            request.status === "Accepted"
    );
    const PendingStatus = requestsData.filter(
        (request) =>
            request.event_id === parseInt(eventId, 10) &&
            request.user_id === parseInt(userId, 10) &&
            request.status === "Pending"
    );
    const RejectedStatus = requestsData.filter(
        (request) =>
            request.event_id === parseInt(eventId, 10) &&
            request.user_id === parseInt(userId, 10) &&
            request.status === "Rejected"
    );

    useFocusEffect(
        useCallback(() => {
            CommonUserWrapper(route, eventName);
            return;
        }, [])
    );

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    top: 0,
                    backgroundColor: "#fff",
                    height: 50,
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
                        }}
                    >
                        {route.name}
                    </Text>
                ),
                tabBarIconStyle: { display: "none" },
            })}
        >
            <Tab.Screen name="Event Calculation">
                {() => (
                    <Calculation
                        id={eventId}
                        event={filteredEvent}
                        dates={dates}
                        AcceptStatus={AcceptStatus}
                        PendingStatus={PendingStatus}
                        RejectedStatus={RejectedStatus}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Event Requests">
                {() => (
                    <Attendence days={eventday} requests={newArray} eventDates={dates} />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}