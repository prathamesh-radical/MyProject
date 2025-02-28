import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MyContext } from "../../context/ContextProvider.jsx";
import formatDate, { formatTime } from "../../utils/formatData.jsx";
import { styles } from "../../utils/stylesheet.jsx";
import ModalPopup from './Modal/Modal.jsx';

export default function EventCard({ event, route }) {
    const { userData, modalsVisibility, toggleModal } = useContext(MyContext);
    const formattedDate = formatDate(event.start_date);
    const formattedTime = formatTime(event.start_time);
    const panelType = route?.params?.panelType || "User";
    const isBranchPanel = panelType === "Branch";
    const navigation = useNavigation();
    const data = event;

    return (
        <View style={styles.b_event_card}>
            <View style={styles.b_event_content}>
                <Image
                    source={event.event_name === "Guru Gita"
                        ? require("../../../assets/images/guru_gita.jpg")
                        : event.event_name === "Shiv Mahimna"
                            ? require("../../../assets/images/shiv_mahimna.png")
                            : require("../../../assets/images/event.jpg")
                    }
                    style={styles.b_event_image}
                />
                <Text style={styles.b_event_title}>{event.event_name}</Text>
                <Text style={styles.b_event_description}>{event.description}</Text>
                <Text style={styles.b_event_info}>
                    <Text style={styles.b_event_label}>Date: </Text>
                    {event.recurrence_day !== 0
                        ? `Every ${event.recurrence_day} at ${formattedTime}`
                        : `${formattedDate} at ${formattedTime}`}
                </Text>
                <Text style={styles.b_event_info}>
                    <Text style={styles.b_event_label}>Location:</Text> Nagpur
                </Text>
                {!isBranchPanel && (
                    <View style={{
                        flexDirection: route?.name === "AllEvents" ? "row" : "column",
                        gap: route?.name === "AllEvents" ? 15 : 0,
                        justifyContent: "center"
                    }}>
                        <TouchableOpacity
                            style={styles.b_event_button}
                            onPress={() => toggleModal("datePicker", true, data)}
                        >
                            <Ionicons name="add-circle-outline" size={24} color="#fff" />
                            <Text style={styles.b_event_buttonText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.b_event_button, { backgroundColor: "#22C55E" }]}
                            onPress={
                                () => navigation.navigate("ViewDetails", {
                                    eventName: event.event_name,
                                    eventId: event.event_id,
                                    userId: userData?.userId
                                })
                            }
                        >
                            <Ionicons name="eye-outline" size={24} color="#fff" />
                            <Text style={styles.b_event_buttonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <ModalPopup visible={modalsVisibility.datePicker} handleClose={toggleModal} />
        </View>
    );
}