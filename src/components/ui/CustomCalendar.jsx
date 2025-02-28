import React from "react";
import { Calendar } from "react-native-calendars";
import RenderHeader from "./RenderHeader";

export default function CustomCalendar({
    displayedMonth, setDisplayedMonth, selectedYear, date, onDayPress, otherDisabelDays, shiftedRequests,
}) {
    const currentMonthYear = new Date(selectedYear, new Date().getMonth(), 1);
    const formattedCurrentMonthYear = `${currentMonthYear.getFullYear()}-${(currentMonthYear.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-01`;
    const year = formattedCurrentMonthYear.split("-")[0];

    return (
        <Calendar
            key={`${selectedYear}-${displayedMonth.toISOString()}`}
            current={displayedMonth.toISOString().split("T")[0]}
            markedDates={{
                ...otherDisabelDays,
                ...shiftedRequests.reduce((acc, request) => {
                    let statusColor = "#9CA3AF";

                    if (request.status === "Accepted") statusColor = "#22C55E";
                    else if (request.status === "Rejected") statusColor = "#DC2626";
                    else if (request.status === "Pending") statusColor = "#F59E0B";

                    acc[request.date] = {
                        selected: true,
                        selectedColor: statusColor,
                        disableTouchEvent: true,
                    };
                    return acc;
                }, {}),
                [date ? date.toISOString().split("T")[0] : undefined]: {
                    selected: true,
                    selectedColor: "#2563EB",
                },
            }}
            markingType={"simple"}
            onDayPress={onDayPress}
            enableSwipeMonths={true}
            style={{ borderColor: "#000", borderWidth: 1, borderRadius: 8 }}
            hideArrows={true}
            renderHeader={() => (
                <RenderHeader
                    formattedYear={year}
                    displayedMonth={displayedMonth}
                    setDisplayedMonth={setDisplayedMonth}
                />
            )}
        />
    );
}