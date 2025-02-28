import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Appbar } from "react-native-paper";
import BranchHomeMenuItem from "../components/ui/MenuItem/BranchHomeMenuItem.jsx";
import BranchLoginMenuItem from "../components/ui/MenuItem/BranchLoginMenuItem.jsx";
import UserHomeMenuItem from "../components/ui/MenuItem/UserHomeMenuItem.jsx";
import UserLoginMenuItem from "../components/ui/MenuItem/UserLoginMenuItem.jsx";
import { MyContext } from "../context/ContextProvider";
import { BACKEND_URL } from "../utils/constant.jsx";
import { getMarkedRange } from "../utils/formatData.jsx";

export default function useFunctions() {
    const {
        showToast, branchFormData, userLoginFormData, userRegisterFormData, handleSetNull, setWrapperProps, selectedEvent, handleClosePopup, setBranchData, date, setDate, userData, startDate, endDate, setUserData, setMarkedDates, setEndDate, setStartDate, toggleModal, setStep, setError, uniqueCities
    } = useContext(MyContext);
    const navigation = useNavigation();

    async function handleBranchLogin(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${BACKEND_URL}/auth/branch-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(branchFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });
            } else {
                await AsyncStorage.setItem("branchToken", data?.branchToken);
                setBranchData({
                    branchId: data?.branchId, branchName: data?.branchName, branchCity: data?.branchCity
                });
                showToast({
                    type: 'success',
                    text1: 'Login Successful!',
                    text2: data.message,
                    visibilityTime: 600000,
                    autoHide: false,
                });
                handleSetNull();
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "BranchHome",
                            params: { branchName: data?.branchName, token: data?.branchToken }
                        }
                    ],
                });
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
        }
    };

    async function handleUserLogin(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${BACKEND_URL}/auth/user-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userLoginFormData),
            });

            const data = await response.json();
            await AsyncStorage.setItem("userToken", data?.userToken);

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    text1: 'Login Successful!',
                    text2: data.message,
                });
                setUserData({ userId: data?.userId, userName: data?.userName });
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "UserHome",
                            params: { userName: data?.userNumber, token: data?.userToken, userId: data?.userId }
                        }
                    ],
                });
                handleSetNull();
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
        }
    };

    async function handleValidatePhoneNumber() {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/check-phone`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone_number: userRegisterFormData.phone_number }),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });

                if (data.message.includes("already exists") || data.message.includes("valid 10-digit")) {
                    setError(data.message);
                } else {
                    setError("");
                }
            } else {
                showToast({
                    type: 'success',
                    text1: 'Verification Successful!',
                    text2: data.message,
                });
                setError("");
                setStep(2);
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
            setError(error.message);
        }
    }

    async function handleUserRegistration(event, formData, setDropdownState) {
        event.preventDefault();

        try {
            const response = await fetch(`${BACKEND_URL}/auth/user-register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    text1: 'Registration Successful!',
                    text2: data.message,
                });
                setDropdownState({
                    open: null,
                    value: {
                        city: "",
                        branch: "There's nothing to show!",
                    },
                    items: {
                        city: uniqueCities.map(city => ({ label: city, value: city })),
                        branch: [{ label: "Please select a city first", value: null, disabled: true }],
                    }
                });
                handleSetNull();
                setStep(3);
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
        }
    };

    async function handleUserRequest(event) {
        event.preventDefault();

        try {
            const formattedDate = date.toISOString().split("T")[0];
            const response = await fetch(`${BACKEND_URL}/auth/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userData?.userId,
                    event_id: selectedEvent.event_id,
                    date: formattedDate
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    text1: 'Great Job!',
                    text2: data.message,
                });
                handleClosePopup();
                setDate(null);
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
        }
    };

    async function handleUpdateStatus(id, status) {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    text1: 'Great Job!',
                    text2: data.message,
                });
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
        }
    };

    async function handleUpdateBulkStatus(ids, status) {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/bulkrequests/${ids}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids, status }),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    text1: 'Oops!',
                    text2: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    text1: 'Great Job!',
                    text2: data.message,
                });
            }
        } catch (error) {
            showToast({
                type: 'error',
                text1: 'Oops!',
                text2: error.message,
            });
        }
    };

    function handleDayPress(day) {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
            setMarkedDates({
                [day.dateString]: { selected: true, startingDay: true, color: '#2563EB', textColor: 'white' }
            });
        } else if (!endDate) {
            setEndDate(day.dateString);
            let range = getMarkedRange(startDate, day.dateString);
            setMarkedDates(range);
        }
    };

    async function handleBranchLogout() {
        try {
            toggleModal("menu", false);
            await AsyncStorage.removeItem("token");
            showToast({
                type: 'success',
                text1: 'Logged Out!',
                text2: 'You have successfully logged out 👋.',
            });
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } catch (error) {
            showToast({
                type: 'success',
                text1: 'Logged Out!',
                text2: error.message,
            });
        }
        toggleModal("menu", false);
    }

    async function handleUserLogout() {
        try {
            toggleModal("menu", false);
            await AsyncStorage.removeItem("token");
            showToast({
                type: 'success',
                text1: 'Logged Out!',
                text2: 'You have successfully logged out 👋.',
            });
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } catch (error) {
            showToast({
                type: 'success',
                text1: 'Logged Out!',
                text2: error.message,
            });
        }
        toggleModal("menu", false);
    }

    function CommonFrontWrapper(backAction, route) {
        setWrapperProps({
            title: "Mukteshwari",
            backAction: route?.name === "BranchLogin" ? backAction : null,
            style: { display: "none" },
            menuItem: <BranchLoginMenuItem route={route} />,
            homepath: "",
            settingpath: "",
        });
    }

    function CommonBranchWrapper(route, eventName) {
        setWrapperProps({
            title: eventName,
            style: {},
            menuItem: <BranchHomeMenuItem route={route} onLogout={handleBranchLogout} />,
            backAction: route.name === "BranchHome" ? (
                <Appbar.Action icon="home-variant-outline" color="#fff" />
            ) : (
                <Appbar.BackAction onPress={() => navigation.goBack()} iconColor="#fff" />
            ),
            homepath: "BranchHome",
            settingpath: "BranchSettings",
        });
    }

    function NewUserWrapper(route) {
        setWrapperProps({
            title: "Create User",
            homepath: "BranchHome",
            settingpath: "BranchSettings",
            backAction: <Appbar.BackAction onPress={() => navigation.goBack()} iconColor="#fff" />,
            menuItem: <BranchHomeMenuItem route={route} onLogout={handleBranchLogout} />,
            style: { display: "block" },
        });
    }

    function UserLoginWrapper(route) {
        setWrapperProps({
            title: "Mukteshwari",
            style: { display: "none" },
            menuItem: <UserLoginMenuItem route={route} />,
            backAction: null,
            homepath: "",
            settingpath: "",
            appbarStyle: { display : "none"}
        });
    }

    function UserRegisterWrapper(step) {
        setWrapperProps({
            title: step === 1 ? "Registration" : step === 2 ? "Sign Up" : step === 3 ? "Thank You" : null,
            style: { display: "none" },
            menuItem: null,
            backAction: null,
            homepath: "",
            settingpath: "",
            appbarStyle: { display : "none"}
        });
    }

    function CommonUserWrapper(route, eventName) {
        setWrapperProps({
            title: eventName,
            style: {},
            menuItem: <UserHomeMenuItem route={route} onLogout={handleUserLogout} />,
            backAction: route.name === "UserHome" ? (
                <Appbar.Action icon="home-variant-outline" color="#fff" />
            ) : (
                <Appbar.BackAction onPress={() => navigation.goBack()} iconColor="#fff" />
            ),
            homepath: "UserHome",
            settingpath: "UserSettings",
        });
    }

    return {
        CommonFrontWrapper, CommonBranchWrapper, NewUserWrapper, UserLoginWrapper, UserRegisterWrapper, CommonUserWrapper, handleBranchLogin, handleUserLogin, handleUserRegistration, handleUserRequest, handleUpdateStatus, handleUpdateBulkStatus, handleDayPress, handleValidatePhoneNumber
    };
};