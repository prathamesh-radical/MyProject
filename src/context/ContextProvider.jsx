import React, { createContext, useState } from 'react';
import { Platform } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import useFetch from '../hooks/useFetch.jsx';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const { data: usersData } = useFetch("/users");
    const { data: eventsData } = useFetch("/events");
    const { data: requestsData } = useFetch("/requests");
    const { data: branchesData } = useFetch("/get-branches");
    const { data: citiesData } = useFetch("/get-cities");
    const { data: branchesRequest } = useFetch("/branch-requests");
    const [index, setIndex] = useState(null);
    const [data, setData] = useState(null);
    const [branchData, setBranchData] = useState({ branchId: null, branchName: null, branchCity: null });
    const [userData, setUserData] = useState({ userId: null, userName: null });
    const [date, setDate] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [step, setStep] = useState(1);
    const [branchFormData, setBranchFormData] = useState({
        branch_username: "",
        branch_password: ""
    });
    const [userLoginFormData, setUserLoginFormData] = useState({
        phone_number: "",
        password: ""
    });
    const [userRegisterFormData, setUserRegisterFormData] = useState({
        first_name: "",
        last_name: "",
        city: "",
        address: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        branch_name: "",
    });
    const [wrapperProps, setWrapperProps] = useState({
        title: "Default Title",
        backAction: null,
        style: {},
        menuItem: null,
        homepath: "",
        settingpath: "",
        appbarStyle: {}
    });
    const [modalsVisibility, setModalsVisibility] = useState({
        more: false,
        menu: false,
        submenu: false,
        branch: false,
        datePicker: false,
        dateRangePicker: false,
        brancheventdetails: false,
    });

    const uniqueCities = [...new Set(citiesData.map((item) => item.branch_city))];
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

    const changeYear = (direction) => {
        setSelectedYear((prevYear) => {
            const newYear = prevYear + direction;
            const currentMonthAndDay = currentDate.split("-").slice(1).join("-");
            setCurrentDate(`${newYear}-${currentMonthAndDay}`);
            return newYear;
        });
    };

    const toggleModal = (modalName, isVisible, data, id) => {
        setIndex(id);
        setData(data);
        setModalsVisibility((prev) => ({
            ...prev,
            [modalName]: isVisible,
        }));
    };

    const handleLoginChange = (field) => (value) => {
        setBranchFormData({ ...branchFormData, [field]: value });
        setUserLoginFormData({ ...userLoginFormData, [field]: value });
        setUserRegisterFormData({ ...userRegisterFormData, [field]: value });
    };

    function handleSetNull() {
        setBranchFormData({
            branch_username: "",
            branch_password: ""
        });
        setUserLoginFormData({
            phone_number: "",
            password: ""
        });
        setUserRegisterFormData({
            first_name: "",
            last_name: "",
            city: "",
            address: "",
            phone_number: "",
            password: "",
            confirm_password: "",
            branch_name: "",
        });
    }

    function showToast({ type, text1, text2 }) {
        Toast.show({
            type: type || 'Default Type',
            text1: text1 || 'Default Title',
            text2: text2 || 'Default message.',
        });
    };

    const toastConfig = {
        success: (props) => {
            const isLoginSuccess = props.text2 && props.text2.includes("Welcome");

            return (
                <BaseToast
                    {...props}
                    style={{
                        borderLeftColor: 'green',
                        minHeight: isLoginSuccess ? 80 : 'auto',
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        backgroundColor: '#e6ffe6',
                    }}
                    text1Style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                    text2Style={{
                        fontSize: 14,
                        color: '#555',
                    }}
                    text1NumberOfLines={2}
                    text2NumberOfLines={3}
                />
            );
        },
        error: (props) => (
            <BaseToast
                {...props}
                style={{
                    borderLeftColor: 'red',
                }}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    backgroundColor: '#ffe6e6',
                }}
                text1Style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'red',
                }}
                text2Style={{
                    fontSize: 14,
                    color: '#555',
                }}
                text1NumberOfLines={2}
                text2NumberOfLines={3}
            />
        ),
    };

    const values = {
        usersData, eventsData, branchesData, branchesRequest, branchFormData, userLoginFormData, userRegisterFormData, MORE_ICON, toastConfig, wrapperProps, requestsData, branchData, date, userData, selectedYear, startDate, endDate, markedDates, changeYear, currentDate, toggleModal, index, data, step, error, setError, setStep, setIndex, setMarkedDates, setEndDate, setStartDate, setSelectedYear, setUserData, setDate, setBranchData, setUserRegisterFormData, handleSetNull, handleLoginChange, showToast, setWrapperProps, modalsVisibility, uniqueCities
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};