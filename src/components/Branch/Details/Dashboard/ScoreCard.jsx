import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Card, Icon } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import { getScoreData } from "../../../../utils/constant.jsx";
import {
    getCurrentYearDays, getEventDate, getFirstDayOfCurrentMonth, getPreviousMonthDays, getPreviousYearDays
} from "../../../../utils/formatData.jsx";
import { styles } from "../../../../utils/stylesheet.jsx";

export default function ScoreCard({ filteredData, routeDetails }) {
    const { eventsData } = useContext(MyContext);
    const { eventId } = routeDetails.params;
    const filteredEvent = eventsData.filter((item) => item.event_id === parseInt(eventId, 10));
    const eventDay = filteredEvent[0]?.recurrence_day;
    const filteredRequestsCurrentMonth = filteredData.filter(
        (request) => getEventDate(eventDay, getFirstDayOfCurrentMonth()).includes(request.date) && request.status === "Accepted"
    );
    const filteredRequestsPreviousMonth = filteredData.filter(
        (request) => getPreviousMonthDays(eventDay).includes(request.date) && request.status === "Accepted"
    );
    const filteredRequestsThisYear = filteredData.filter(
        (request) => getCurrentYearDays(eventDay).includes(request.date) && request.status === "Accepted"
    );
    const filteredRequestsPreviousYear = filteredData.filter(
        (request) => getPreviousYearDays(eventDay).includes(request.date) && request.status === "Accepted"
    );
    const SCORE_DATA = getScoreData(
        filteredRequestsCurrentMonth, filteredRequestsPreviousMonth, filteredRequestsThisYear, filteredRequestsPreviousYear, eventDay
    );

    return (
        <View style={styles.card_mainContainer}>
            {SCORE_DATA.map((item) => (
                <Card key={item.id} style={styles.card_Container}>
                    <LinearGradient
                        colors={item.bg}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.card_cards}
                    >
                        <Card.Content style={styles.card_Content}>
                            <View style={styles.card_Title}>
                                <Icon source="calendar-clock-outline" size={25} color="#fff" />
                                <Text variant="titleLarge" style={{ color: "#fff" }}>{item.title}</Text>
                            </View>
                            <Text style={styles.card_number}>{item.value}</Text>
                            <View style={styles.card_details}>
                                <Text variant="titleLarge" style={{ color: "#fff" }}>Total events occured</Text>
                                <Text variant="titleLarge" style={{ color: "#fff" }}>{item.completed}</Text>
                            </View>
                        </Card.Content>
                    </LinearGradient>
                </Card>
            ))}
        </View>
    );
};