import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";
import NumberVerification from "./NumberVerification.jsx";
import SignUp from "./SignUp.jsx";
import ThanksPage from "./ThanksPage.jsx";

export default function UserRegisterBody({
    error, formData, dropdownState, setOpenDropdown, setDropdownValue, setDropdownItems,
    handleLoginChange, handleSubmit, handleValidatePhoneNumber, step
}) {

    return (
        <View style={styles.container} >
            {/* AppBar */}
            <Appbar.Header style={styles.appBar}>
                <Appbar.Content
                    title={step === 1 ? "Registration" : step === 2 ? "Sign Up" : "Thank You"}
                    titleStyle={[styles.appBarTitle, { paddingTop: 5 }]}

                />
            </Appbar.Header>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Avatar.Icon size={110} icon="account" style={styles.avatar} />
            </View>

            {/* Step Indicator */}
            <View style={styles.stepIndicatorContainer}>
                <StepIndicator
                    currentPosition={step - 1}
                    stepCount={3}
                    customStyles={stepIndicatorStyles}
                    renderStepIndicator={({ position }) => (
                        <Text style={[
                            styles.stepLabel,
                            {
                                color: position < step - 1 ? "#F26F29" : position === step - 1 ? "#ffffff" : "#F26F29",
                                fontWeight: "bold",
                                fontSize: position < step - 1 ? 15 : 14, // Larger for checkmark
                            }
                        ]}>
                            {position < step - 1 ? "✔" : `${position + 1}`}
                        </Text>
                    )}
                />
            </View>

            {/* Page Content */}
            {step === 1 ? (
                <NumberVerification
                    error={error}
                    formData={formData}
                    handleLoginChange={handleLoginChange}
                    handleValidatePhoneNumber={handleValidatePhoneNumber}
                />
            ) : step === 2 ? (
                <SignUp
                    formData={formData}
                    dropdownState={dropdownState}
                    setOpenDropdown={setOpenDropdown}
                    setDropdownValue={setDropdownValue}
                    setDropdownItems={setDropdownItems}
                    handleLoginChange={handleLoginChange}
                    handleSubmit={handleSubmit}
                    handleValidatePhoneNumber={handleValidatePhoneNumber}
                />
            ) : step === 3 ? (
                <ThanksPage />
            ) : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appBar: {
        backgroundColor: "#F26F29",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    appBarTitle: {
        color: "#fff",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 70,

    },
    avatarContainer: {
        alignItems: "center",
        marginTop: -50,
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: "#fff",
        borderWidth: 3,
        borderColor: "#fff",
    },
    stepIndicatorContainer: {
        width: "70%", // Reduced width for a more compact step indicator
        alignSelf: "center", // Keeps it centered
        marginTop: 20, // Adjusted position slightly
        marginBottom: 10,
    },
    stepLabel: {
        fontSize: 14,
        textAlign: "center",
    },
});

const stepIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: "#F26F29",
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: "#F26F29",
    stepStrokeUnFinishedColor: "#F26F29",
    separatorFinishedColor: "#F26F29",
    separatorUnFinishedColor: "#F26F29",
    stepIndicatorFinishedColor: "#ffffff", // White background for completed steps
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#F26F29",
    stepIndicatorLabelFontSize: 14,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: "#ffffff",
    stepIndicatorLabelFinishedColor: "#F26F29", // Orange checkmark
    stepIndicatorLabelUnFinishedColor: "#F26F29",
    labelColor: "#999999",
    currentStepLabelColor: "#F26F29",
};

