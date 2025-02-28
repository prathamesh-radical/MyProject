import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../../../utils/stylesheet.jsx";
import RenderHeader from "../RenderHeader.jsx";

export default function DateRangePickerModal({
    animationValue, selectedYear, displayedMonth, setDisplayedMonth, markedDates, handleDayPress, toggleModal, handleConfirm,
}) {
    const animatedStyle = {
        opacity: animationValue,
        transform: [
            {
                scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        ],
    };

    const currentMonthYear = new Date(selectedYear, new Date().getMonth(), 1);
    const formattedCurrentMonthYear = `${currentMonthYear.getFullYear()}-${(
        currentMonthYear.getMonth() + 1
    ).toString().padStart(2, "0")}-01`;
    const year = formattedCurrentMonthYear.split("-")[0];

    return (
        <Animated.View style={[styles.picker_modalContainer, animatedStyle]}>
            <View style={styles.picker_modalContent}>
                <Calendar
                    key={`${selectedYear}-${displayedMonth.toISOString()}`}
                    current={displayedMonth.toISOString().split("T")[0]}
                    markingType="period"
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                    enableSwipeMonths={true}
                    style={styles.picker_calendar}
                    hideArrows={true}
                    renderHeader={() => (
                        <RenderHeader
                            formattedYear={year}
                            displayedMonth={displayedMonth}
                            setDisplayedMonth={setDisplayedMonth}
                            style={{ right: 5 }}
                        />
                    )}
                />
                <View style={styles.picker_modalButtons}>
                    <TouchableOpacity
                        onPress={() => toggleModal("dateRangePicker", false)}
                        style={styles.picker_button}
                    >
                        <Text style={styles.picker_buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        style={[styles.picker_button, styles.picker_confirmButton]}
                    >
                        <Text style={styles.picker_buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}