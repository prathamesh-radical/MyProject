import React, { useContext, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import formatDate, { disableOtherDays } from "../../../utils/formatData.jsx";
import { styles } from "../../../utils/stylesheet.jsx";
import CustomCalendar from "../CustomCalendar.jsx";

export default function ModalPopup({ visible, handleClose }) {
    const { requestsData, date, setDate, data, userData, selectedYear, setSelectedYear } = useContext(MyContext);
    const { handleUserRequest } = useFunctions();
    const [displayedMonth, setDisplayedMonth] = useState(new Date());
    const days = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    const filteredRequests = requestsData.filter(
        (request) =>
            request.event_id === parseInt(data?.event_id, 10) &&
            request.user_id === parseInt(userData?.userId, 10)
    );
    const shiftedRequests = filteredRequests.map((request) => {
        const newDate = new Date(request.date);
        newDate.setDate(newDate.getDate() + 1);
        return {
            ...request,
            date: newDate.toISOString().split("T")[0],
        };
    });
    const otherDisabelDays = disableOtherDays(days, data);

    useEffect(() => {
        if (visible) {
            setSelectedYear(new Date().getFullYear());
            const disabledDates = otherDisabelDays;
            const today = new Date().toISOString().split("T")[0];

            if (!disabledDates[today]) {
                setDate(null);
            } else {
                setDate(null);
            }
        }
    }, [visible, data]);

    const handleDateSelect = (day) => {
        const disabledDates = otherDisabelDays;
        const isDisabled = disabledDates[day.dateString]?.disabled;

        if (isDisabled) {
            return;
        }

        const selectedDate = new Date(day.dateString);
        setDate(selectedDate);
    };

    const handleModalClose = () => {
        setDate(null);
        handleClose("datePicker", false);
    };

    if (!data) return null;

    return (
        <View style={styles.modal_container}>
            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
                onRequestClose={() => handleClose("datePicker", false)}
            >
                <View style={styles.modal_overlay}>
                    <View style={styles.modal_subcontainer}>
                        <Text style={styles.modal_title}>{data.event_name} Calendar</Text>
                        <CustomCalendar
                            displayedMonth={displayedMonth}
                            setDisplayedMonth={setDisplayedMonth}
                            selectedYear={selectedYear}
                            date={date}
                            onDayPress={handleDateSelect}
                            otherDisabelDays={otherDisabelDays}
                            shiftedRequests={shiftedRequests}
                        />
                        <Text style={styles.selected_date}>
                            Selected Date:{" "}
                            <Text style={{ fontWeight: "100" }}>
                                {date && date.toDateString() !== new Date().toDateString()
                                    ? formatDate(date)
                                    : "No date selected."}
                            </Text>
                        </Text>
                        <View style={styles.modal_buttonContainer}>
                            <TouchableOpacity style={styles.modal_cancelbutton} onPress={handleModalClose}>
                                <Text style={styles.modal_cancelbuttonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modal_yesbutton} onPress={handleUserRequest}>
                                <Text style={styles.modal_yesbuttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}