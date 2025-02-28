import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import useFunctions from "../../../../hooks/useFunctions.jsx";
import formatDate from "../../../../utils/formatData.jsx";
import { styles } from "../../../../utils/stylesheet.jsx";
import DateRangePickerModal from "../../../ui/Modal/DateRangePickerModal.jsx";

export default function DateRangePicker({ filteredEventId }) {
    const {
        modalsVisibility, toggleModal, selectedYear, startDate, endDate, markedDates, setMarkedDates, setEndDate, setStartDate, showToast,
    } = useContext(MyContext);
    const { handleDayPress } = useFunctions();
    const [displayedMonth, setDisplayedMonth] = useState(new Date());
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (modalsVisibility.dateRangePicker) {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animationValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalsVisibility.dateRangePicker]);

    function handleConfirm() {
        if (!startDate || !endDate) {
            showToast({
                type: "error",
                text1: "Oops!",
                text2: "Please select the date range.",
            });
        } else {
            toggleModal("dateRangePicker", false);
        }
    }

    return (
        <View>
            <Text style={styles.picker_label}>Date Filter</Text>
            <TouchableOpacity onPress={() => toggleModal("dateRangePicker", true)}>
                <TextInput
                    style={styles.picker_input}
                    editable={false}
                    value={
                        filteredEventId &&
                            startDate &&
                            endDate &&
                            startDate !== endDate
                            ? `${formatDate(startDate)} → ${formatDate(endDate)}`
                            : "Select Date Range"
                    }
                />
            </TouchableOpacity>
            {filteredEventId && startDate && (
                <IconButton
                    icon="close"
                    iconColor="#000"
                    size={15}
                    mode="contained-tonal"
                    style={styles.picker_close}
                    onPress={() => {
                        setStartDate(null);
                        setEndDate(null);
                        setMarkedDates({});
                    }}
                />
            )}
            {modalsVisibility.dateRangePicker && (
                <DateRangePickerModal
                    animationValue={animationValue}
                    selectedYear={selectedYear}
                    displayedMonth={displayedMonth}
                    setDisplayedMonth={setDisplayedMonth}
                    markedDates={markedDates}
                    handleDayPress={handleDayPress}
                    toggleModal={toggleModal}
                    handleConfirm={handleConfirm}
                />
            )}
        </View>
    );
}