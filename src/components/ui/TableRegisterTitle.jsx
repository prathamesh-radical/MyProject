import React, { useContext } from "react";
import { Text, TextInput, View } from "react-native";
import { Button, DataTable, Icon, IconButton, Searchbar } from "react-native-paper";
import { MyContext } from "../../context/ContextProvider";
import formatDate from "../../utils/formatData.jsx";
import { styles } from "../../utils/stylesheet.jsx";
import CalendarModal from "./Modal/CalendarModal.jsx";

export default function TableRegisterTitle({
    data, searchQuery, setSearchQuery, isAnyChecked, handleBulkStatusUpdate
}) {
    const { modalsVisibility, toggleModal, date, setDate } = useContext(MyContext);

    return (
        <DataTable.Header
            style={{ borderColor: "#ccc", borderWidth: 1, borderBottomWidth: 0, backgroundColor: "#E7F0FF" }}
        >
            <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
                    <TextInput
                        style={styles.date_input}
                        editable={false}
                        value={(date && (date.toDateString() !== new Date().toDateString())) && formatDate(date)}
                        placeholder="No date selected."
                        placeholderTextColor="#000"
                    />
                    {date && (
                        <IconButton
                            icon="close"
                            iconColor="#000"
                            onPress={() => setDate(null)}
                            mode="contained-tonal"
                            size={15}
                            style={{ position: "absolute", right: 60, backgroundColor: "#ccc" }}
                        />
                    )}
                    <IconButton
                        icon="calendar-month-outline"
                        iconColor="#fff"
                        onPress={() => toggleModal("datePicker", true, data)}
                        mode="contained-tonal"
                        size={30}
                        style={styles.toggleCalendar}
                    />
                </View>
                {date && (
                    <>
                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                            <Searchbar
                                mode="bar"
                                placeholder="Search"
                                onChangeText={setSearchQuery}
                                value={searchQuery}
                                style={styles.searchBar}
                                textAlignVertical="center"
                                inputStyle={{ position: "relative", bottom: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 8 }}>
                            <DataTable.Title>
                                <Text style={{ fontSize: 16, color: "#000" }}>All Users</Text>
                            </DataTable.Title>
                            {!isAnyChecked ? (
                                <IconButton
                                    icon="filter"
                                    iconColor="#fff"
                                    onPress={() => console.log("Filter button pressed")}
                                    mode="contained-tonal"
                                    size={20}
                                    style={{ backgroundColor: "#2563EB" }}
                                />
                            ) : (
                                <View style={styles.buttonContainer}>
                                    <Button
                                        icon={() => <Icon source="check-circle" color="#fff" size={20} />}
                                        style={{ backgroundColor: "green" }}
                                        onPress={() => handleBulkStatusUpdate("Accepted")}
                                    >
                                        <Text style={{ color: "#fff" }}>Accept</Text>
                                    </Button>
                                </View>
                            )}
                        </View>
                    </>
                )}
            </View>
            <CalendarModal visible={modalsVisibility.datePicker} handleClose={toggleModal} />
        </DataTable.Header>
    );
}