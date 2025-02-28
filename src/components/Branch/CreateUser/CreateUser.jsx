import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { BackHandler, ScrollView, View } from "react-native";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import { styles } from "../../../utils/stylesheet.jsx";
import FullDetails from "./FullDetails.jsx";

export default function CreateUser() {
    const {
        userRegisterFormData: formData, branchData, branchesData, handleLoginChange, step, setStep, uniqueCities
    } = useContext(MyContext);
    const { handleUserRegistration, NewUserWrapper } = useFunctions();
    const route = useRoute();
    const [dropdownState, setDropdownState] = useState(() => {
        const autoSelectedBranch = branchesData.find(branch => branch.branch_name === branchData.branchName);
        const autoSelectedCity = autoSelectedBranch ? autoSelectedBranch.branch_city : "There's nothing to show!";

        return {
            open: null,
            value: { city: autoSelectedCity, branch: branchData.branchName },
            items: {
                city: uniqueCities.map(city => ({ label: city, value: city })),
                branch: [{ label: branchData.branchName, value: branchData.branchName }],
            }
        };
    });

    const setOpenDropdown = (name) => {
        setDropdownState(prevState => {
            if (name === "branch" && (!dropdownState.value.city || dropdownState.value.city === "There's nothing to show!")) {
                return {
                    ...prevState,
                    open: name,
                    items: {
                        ...prevState.items,
                        branch: [{ label: "Please select the city", value: null, disabled: true }]
                    }
                };
            }
            return {
                ...prevState,
                open: prevState.open === name ? null : name,
            };
        });
    };

    const setDropdownValue = (name, value) => {
        setDropdownState(prevState => {
            const updatedBranches = name === "city"
                ? branchesData
                    .filter(branch => branch.branch_city === value)
                    .map(branch => ({ label: branch.branch_name, value: branch.branch_name }))
                : prevState.items.branch;

            return {
                ...prevState,
                value: { ...prevState.value, [name]: value },
                items: {
                    ...prevState.items,
                    branch: updatedBranches.length > 0
                        ? updatedBranches
                        : [{ label: "No branches available", value: null, disabled: true }]
                }
            };
        });

        handleLoginChange(name)(value);
    };

    const setDropdownItems = (name, items) => {
        setDropdownState(prevState => ({
            ...prevState,
            items: { ...prevState.items, [name]: items },
        }));
    };

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            NewUserWrapper(route);

            const backAction = () => {
                if (step === 2) {
                    setStep(1);
                    handleLoginChange("phone_number")("");
                    return true;
                }
                return false;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

            return () => backHandler.remove();
        }, [route, step])
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        handleLoginChange("city")(dropdownState.value.city);
        handleLoginChange("branch_name")(dropdownState.value.branch);

        const updatedFormData = {
            ...formData,
            city: dropdownState.value.city,
            branch_name: dropdownState.value.branch
        };

        handleUserRegistration(event, updatedFormData, setDropdownState);
    };

    return (
        <View style={[styles.login_container, { paddingHorizontal: 15 }]}>
            <View style={styles.login_subcontainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled={true}
                >
                    <FullDetails
                        route={route}
                        formData={formData}
                        navigation={navigation}
                        dropdownState={dropdownState}
                        setOpenDropdown={setOpenDropdown}
                        setDropdownValue={setDropdownValue}
                        setDropdownItems={setDropdownItems}
                        handleLoginChange={handleLoginChange}
                        handleSubmit={handleSubmit}
                    />
                </ScrollView>
            </View>
        </View>
    );
}