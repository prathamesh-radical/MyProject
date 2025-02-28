import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { BackHandler, ScrollView, View } from "react-native";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import UserRegisterBody from "./UserRegisterBody.jsx";

export default function UserRegister() {
    const {
        userRegisterFormData: formData, branchesData, handleLoginChange, step, setStep, uniqueCities, error
    } = useContext(MyContext);
    const { handleUserRegistration, UserRegisterWrapper, handleValidatePhoneNumber } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const [dropdownState, setDropdownState] = useState({
        open: null,
        value: {
            city: "",
            branch: "There's nothing to show!",
        },
        items: {
            city: uniqueCities.map(city => ({ label: city, value: city })),
            branch: branchesData.map(branch => ({ label: branch.branch_name, value: branch.branch_name })),
        }
    });

    const setOpenDropdown = (name) => {
        setDropdownState(prevState => {
            if (name === "branch" &&
                (!dropdownState.value.city || dropdownState.value.city === "There's nothing to show!")
            ) {
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

    useFocusEffect(
        useCallback(() => {
            UserRegisterWrapper(step);

            const backAction = () => {
                if (step > 1) {
                    setStep(prevStep => prevStep - 1);
                    handleLoginChange("phone_number")("");
                    return true;
                }
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
        <View >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
            >
                <UserRegisterBody
                    error={error}
                    formData={formData}
                    dropdownState={dropdownState}
                    setOpenDropdown={setOpenDropdown}
                    setDropdownValue={setDropdownValue}
                    handleLoginChange={handleLoginChange}
                    handleSubmit={handleSubmit}
                    handleValidatePhoneNumber={handleValidatePhoneNumber}
                    step={step}
                />
            </ScrollView>
        </View>
    );
}