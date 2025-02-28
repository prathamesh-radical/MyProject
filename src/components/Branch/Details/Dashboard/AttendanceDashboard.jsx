import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { ScrollView, Text } from "react-native";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import useFunctions from "../../../../hooks/useFunctions.jsx";
import { styles } from "../../../../utils/stylesheet.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
import FilteredData from "./FilteredData.jsx";
import ScoreCard from "./ScoreCard.jsx";

export default function AttendanceDashboard({ eventName, routeDetails }) {
    const { branchesRequest, branchData, startDate, endDate } = useContext(MyContext);
    const { CommonBranchWrapper } = useFunctions();
    const route = useRoute();
    const dataBranch = branchesRequest?.requests;
    const branchId = branchData.branchId;
    const { eventId } = routeDetails.params;
    const filteredData = dataBranch.filter(
        (item) =>
            item.event_id === parseInt(eventId, 10) &&
            item.branch_id === parseInt(branchId, 10)
    ).map((item) => {
        let newDate = new Date(item.date);
        newDate.setUTCDate(newDate.getUTCDate() + 1);
        return { ...item, date: newDate.toISOString().split("T")[0] };
    });
    const filteredId = dataBranch.filter(
        (item) =>
            item.event_id === parseInt(eventId, 10) &&
            item.branch_id === parseInt(branchId, 10)
    )
    const filteredEventId = filteredId[0]?.event_id;

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, eventName);
        }, [])
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.dashboard_container}>
            <DateRangePicker filteredEventId={filteredEventId} />
            {(!filteredEventId && (startDate && endDate) && (startDate === endDate)) && (
                <Text>No data found for the given date range.</Text>
            )}
            {(filteredEventId && (startDate && endDate) && (startDate !== endDate)) && (
                <FilteredData filteredData={filteredData} />
            )}
            <ScoreCard filteredData={filteredData} routeDetails={routeDetails} />
        </ScrollView>
    );
}