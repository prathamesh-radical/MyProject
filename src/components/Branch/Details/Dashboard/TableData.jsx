import React, { useContext } from "react";
import { View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import FilterModal from "../../../ui/Modal/FilterModal.jsx";

export default function TableData({ currentItems }) {
    const { modalsVisibility, toggleModal } = useContext(MyContext);

    return (
        <View>
            {currentItems.map((request, index) => (
                <DataTable.Row key={index}>
                    <DataTable.Cell style={{ flex: 1, justifyContent: "center" }} numeric>
                        {index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2, justifyContent: "center" }}>
                        {request.first_name}{" "}{request.last_name}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2, justifyContent: "center" }}>
                        {request.eventName}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                        <IconButton
                            icon="dots-horizontal"
                            iconColor="#fff"
                            style={{ backgroundColor: "#3478f6" }}
                            size={20}
                            onPress={() => {
                                const data = request;
                                const id = index + 1;
                                toggleModal("brancheventdetails", true, data, id);
                            }}
                        />
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
            <FilterModal visible={modalsVisibility.brancheventdetails} handleClose={toggleModal} />
        </View>
    );
};