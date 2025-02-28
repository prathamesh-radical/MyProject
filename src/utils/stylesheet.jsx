import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    //Searchbar
    searchBar: {
        width: "102%",
        height: 45,
        borderRadius: 10,
        borderColor: "#aaa",
        borderWidth: 2,
        backgroundColor: "#E7F0FF",
        position: "relative",
        right: 10
    },
    date_input: {
        width: '82%',
        height: 45,
        borderWidth: 2,
        borderColor: '#aaa',
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 20,
        color: "#000",
    },

    //toggleCalendar
    toggleCalendar: {
        backgroundColor: "#2563EB",
        bottom: 6,
        borderRadius: 8,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    //ButtonContainer
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },

    // StatusBar
    status_container: {
        backgroundColor: '#ECF0F1',
    },

    //Wrapper
    wrap_container: {
        flex: 1,
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#fff",
    },

    //Appbar
    appbar_container: {
        backgroundColor: '#2563EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
    },

    // BottomBar
    b_bottom: {
        backgroundColor: '#2563EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
    },
    bottom_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_activetab: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    b_tab_name: {
        color: "#fff",
    },

    //Menu
    menu_container: {
        position: "relative",
    },
    menu_overlay: {
        flex: 1,
        backgroundColor: "transparent",
    },
    menu_menu: {
        position: "absolute",
        top: 50,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menu_submenu: {
        borderRadius: 8,
        paddingHorizontal: 20,
    },
    menu_submenuItem: {
        paddingVertical: 12,
    },

    //Modal
    modal_container: {
        padding: 16,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: "90%",
        maxWidth: 500,
    },
    modal_overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal_subcontainer: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        width: "95%",
        paddingHorizontal: 20,
        marginVertical: "35%",
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_title: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 15,
    },
    selected_date: {
        textAlign: "center",
        marginVertical: 15,
        fontWeight: "bold",
    },
    modal_image: {
        width: '100%',
        height: 150,
        marginBottom: 10,
    },
    modal_buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    modal_cancelbutton: {
        backgroundColor: "#D1D5DB",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    modal_yesbutton: {
        backgroundColor: "#22C55E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    modal_cancelbuttonText: {
        fontSize: 15,
        fontWeight: '500',
    },
    modal_yesbuttonText: {
        fontSize: 15,
        fontWeight: '500',
        color: "#fff",
    },
    modal_closebutton: {
        position: "absolute",
        top: 15,
        right: 13,
        backgroundColor: "red",
        borderRadius: 50,
    },
    md_th: {
        fontSize: 14,
        padding: 8,
        color: "#555",
        borderColor: "#000",
        borderWidth: 1,
        flex: 0.5,
    },
    side_by_side_container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        width: "100%"
    },
    column: {
        flexDirection: "column",
    },
    row: {
        flexDirection: "column",
    },
    md_td: {
        fontSize: 14,
        padding: 8,
        paddingLeft: 20,
        color: "#555",
        borderColor: "#000",
        borderWidth: 1,
        flex: 1,
        textAlign: "left",
        flexWrap: "wrap",
        overflow: "hidden",
        minWidth: 0,
        maxWidth: "100%",
        alignContent: "center"
    },

    //More
    more_menu: {
        position: "absolute",
        top: "33%",
        right: "10%",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    // loader
    load_backdrop: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: "100%",
        height: "100%",
    },
    load_Container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#1c1c1c',
    },
    load_loader: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    load_dot: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    load_Text: {
        marginTop: 20,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    //home
    home_container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        gap: 30,
    },
    home_button: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    home_buttonText: {
        color: '#3B82F6',
        fontSize: 18,
        fontWeight: 'bold',
    },

    //Login
    login_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    login_subcontainer: {
        width: "100%",
        paddingHorizontal: 10,
    },
    login_title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3478f6',
        marginBottom: 24,
        textAlign: "center"
    },
    login_label: {
        display: "flex",
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    login_heading: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 20,
    },
    login_input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 16,
        fontSize: 16,
    },
    login_button: {
        flexDirection: "row",
        gap: 16,
        width: '100%',
        height: 50,
        backgroundColor: '#3478f6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input_container: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        gap: 10,
    },
    icon: {
        position: "absolute",
        top: 13,
        left: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    eye_icon: {
        position: "absolute",
        top: 13,
        right: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    drop_container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
    },

    //BranchEvent
    b_event_container: {
        padding: 16,
        alignItems: 'center',
    },
    b_event_card: {
        backgroundColor: '#E7F0FF',
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    b_event_image: {
        width: '100%',
        height: 200,
        marginBottom: 5,
    },
    b_event_content: {
        padding: 16,
    },
    b_event_title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    b_event_description: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },
    b_event_info: {
        fontSize: 14,
        color: '#333',
        marginVertical: 2,
    },
    b_event_label: {
        fontWeight: 'bold',
    },
    b_event_button: {
        backgroundColor: '#007BFF',
        borderRadius: 4,
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        gap: 5,
    },
    b_event_buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    //Users Request
    ur_container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    ur_border: {
        borderWidth: 1,
        borderColor: "#ccc",
    },
    ur_header: {
        backgroundColor: "#E7F0FF",
        borderColor: "#ccc",
        borderWidth: 1,
        width: "100%",
    },
    ur_headerText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    ur_row: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        marginLeft: 5,
        width: "100%",
        backgroundColor: "#fff",
    },
    ur_text: {
        textAlign: "center",
        marginVertical: 12,
    },
    ur_actions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        gap: 10,
        marginLeft: 20,
    },
    ur_acceptButton: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 4,
    },
    ur_rejectButton: {
        backgroundColor: "#F44336",
        padding: 8,
        borderRadius: 4,
    },
    ur_buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    ur_badge: {
        paddingHorizontal: 10,
        position: "relative",
        bottom: 8,
        left: 40
    },

    //Attendence
    att_badge: {
        height: "70%",
        paddingHorizontal: 15,
        position: "relative",
        bottom: 7,
        textAlign: "center",
        borderRadius: 50
    },

    // Dashboard
    dashboard_container: {
        position: "relative",
        top: "8%",
        height: "100%",
        padding: 20,
        marginBottom: 50,
    },

    //Date Range Picker
    picker_label: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker_input: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 16,
        textAlign: "center",
    },
    picker_close: {
        backgroundColor: "#ccc",
        position: "absolute",
        top: "42%",
        right: "0%",
        fontWeight: "900"
    },
    picker_modalContainer: {
        position: "absolute",
        top: "100%",
        zIndex: 9999,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2%",
    },
    picker_modalContent: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        height: 450,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
    },
    picker_calendar: {
        width: 280,
    },
    picker_customHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    picker_arrow_left: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "absolute",
        top: 13,
        right: 110,
        zIndex: 9999,
        padding: 6,
    },
    picker_arrow_right: {
        position: "absolute",
        top: 13,
        left: 110,
        zIndex: 9999,
        padding: 6,
    },
    picker_modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingTop: 10,
    },
    picker_button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#ddd",
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    picker_confirmButton: {
        backgroundColor: "#2563EB",
    },
    picker_buttonText: {
        color: "white",
        fontSize: 16,
    },

    //Score Card
    card_mainContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        marginTop: 20,
        gap: 20,
        height: "100%",
        zIndex: -1,
    },
    card_Container: {
        marginVertical: 0,
    },
    card_cards: {
        padding: 10,
        borderRadius: 10,
        color: "#fff",
    },
    card_Content: {
        paddingVertical: 10,
        gap: 10,
        color: "#fff",
    },
    card_Title: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: 10,
        color: "#fff",
    },
    card_number: {
        fontSize: 30,
        color: "#fff",
    },
    card_details: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        color: "#fff",
    },

    //Render header
    render_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 15,
        marginVertical: 10,
    },
});