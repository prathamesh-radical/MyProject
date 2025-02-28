import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { View } from "react-native";
import { MyContext } from "../../context/ContextProvider.jsx";
import useFunctions from "../../hooks/useFunctions.jsx";
import EventCard from "../ui/EventCard.jsx";

export default function UserEventDetails() {
    const { eventsData } = useContext(MyContext);
    const { CommonUserWrapper } = useFunctions();
    const route = useRoute();
    const { eventName, eventId } = route.params;
    const filteredEvent = eventsData.find(
        (item) =>
            item.event_id === parseInt(eventId, 10) &&
            item.event_name === eventName
    );

    useFocusEffect(
        useCallback(() => {
            CommonUserWrapper(route, eventName);
            return;
        }, [])
    );

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, }}>
            <EventCard event={filteredEvent} route={route.name} />
        </View>
    );
};