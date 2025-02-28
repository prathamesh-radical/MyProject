import React, { useContext } from "react";
import { Checkbox, DataTable } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider";
import RegisterMenuItem from "../../../ui/MenuItem/RegisterMenuItem";
import MoreDetails from "../../../ui/Modal/MoreDetails";

export default function TableData({ page, checked, itemsPerPage, currentItems, toggleCheck, handleStatusUpdate }) {
    const { modalsVisibility, toggleModal } = useContext(MyContext);

    return (
        <>
            {currentItems.map((user, i) => {
                const id = (page * itemsPerPage) + i + 1;
                const data = user;
                return (
                    <DataTable.Row key={id} style={{ borderColor: "#ccc", borderWidth: 1 }}>
                        <DataTable.Cell
                            style={{ flex: 1, justifyContent: "center", position: "relative", right: 20 }}
                        >
                            <Checkbox
                                status={checked[user.user_id] ? "checked" : "unchecked"}
                                onPress={() => toggleCheck(user.user_id)}
                            />
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{ flex: 3, justifyContent: "center", position: "relative", right: 30 }}
                        >
                            {user.first_name}{" "}{user.last_name}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{ flex: 2, justifyContent: "center", position: "relative", right: 20 }}
                        >
                            {user.phone_number}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{ flex: 1, justifyContent: "center", position: "relative", left: 4 }}
                        >
                            <RegisterMenuItem data={data} id={id} handleStatusUpdate={handleStatusUpdate} />
                        </DataTable.Cell>
                    </DataTable.Row>
                );
            })}
            <MoreDetails visible={modalsVisibility.branch} handleClose={toggleModal} />
        </>
    );
}