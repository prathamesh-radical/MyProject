import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { MyContext } from "../../context/ContextProvider.jsx";
import { styles } from "../../utils/stylesheet";

export default function RenderHeader({ formattedYear, displayedMonth, setDisplayedMonth, style }) {
    const { setSelectedYear } = useContext(MyContext);
    const month = displayedMonth.toLocaleString("default", { month: "long" });

    const handleYearChange = (direction) => {
        setSelectedYear(prevYear => {
            const newYear = prevYear + direction;
            setDisplayedMonth(prevMonth => {
                const newMonth = new Date(prevMonth);
                newMonth.setFullYear(newYear);
                return newMonth;
            });
            return newYear;
        });
    };

    function handlePreviousMonth() {
        setDisplayedMonth(prevMonth => {
            const newMonth = new Date(prevMonth);
            newMonth.setMonth(newMonth.getMonth() - 1);
            return newMonth;
        });
    }

    function handleNextMonth() {
        setDisplayedMonth(prevMonth => {
            const newMonth = new Date(prevMonth);
            newMonth.setMonth(newMonth.getMonth() + 1);
            return newMonth;
        });
    }

    return (
        <View style={[styles.render_container, style]}>
            <TouchableOpacity onPress={() => handleYearChange(-1)} style={styles.modal_arrow_left}>
                <Icon source="chevron-double-left" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePreviousMonth}>
                <Icon source="chevron-left" size={25} />
            </TouchableOpacity>
            <Text style={{ fontSize: 17 }}>
                {month} {formattedYear}
            </Text>
            <TouchableOpacity onPress={handleNextMonth}>
                <Icon source="chevron-right" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleYearChange(1)} style={styles.modal_arrow_right}>
                <Icon source="chevron-double-right" size={25} />
            </TouchableOpacity>
        </View>
    );
}