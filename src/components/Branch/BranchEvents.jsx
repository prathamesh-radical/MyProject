import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { ScrollView } from "react-native";
import { MyContext } from "../../context/ContextProvider";
import useFunctions from "../../hooks/useFunctions";
import { styles } from "../../utils/stylesheet";
import EventCard from "../ui/EventCard";

export default function BranchEvents() {
    const { eventsData: data } = useContext(MyContext);
    const { CommonBranchWrapper } = useFunctions();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, "Events");
            return;
        }, [])
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.b_event_container}>
            {data.map((event, index) => (
                <EventCard key={index} event={event} route={route.name} />
            ))}
        </ScrollView>
    );
};