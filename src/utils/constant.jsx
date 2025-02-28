import {
    getCurrentYearDays, getEventDate, getFirstDayOfCurrentMonth, getPreviousMonthDays, getPreviousYearDays
} from "./formatData.jsx";

export const BACKEND_URL = "https://mukteshwari-backend.vercel.app";

export const formFields = [
    {
        label: "Name",
        placeholder: "Enter your name",
        field: "name",
        icon: "person-circle",
        keyboardType: "default"
    },
    { label: "City", placeholder: "Enter your city", field: "city", icon: "pin", keyboardType: "default" },
    { label: "Address", placeholder: "Enter your address", field: "address", icon: "map", multiline: true },
    {
        label: "Phone number",
        placeholder: "Enter your phone number",
        field: "phone_number",
        icon: "call",
        keyboardType: "numeric"
    },
    {
        label: "Password",
        placeholder: "Enter your password",
        field: "password",
        icon: "lock-closed",
        secure: true
    },
];

export const getScoreData = (
    filteredRequestsCurrentMonth, filteredRequestsPreviousMonth, filteredRequestsThisYear, filteredRequestsPreviousYear, eventDay
) => [
        {
            id: "1",
            title: "Current Month",
            value: filteredRequestsCurrentMonth?.length,
            completed: getEventDate(eventDay, getFirstDayOfCurrentMonth())?.length,
            bg: ['#5EA3F9', '#2563EB'],
        },
        {
            id: "2",
            title: "Previous Month",
            value: filteredRequestsPreviousMonth?.length,
            completed: getPreviousMonthDays(eventDay).length,
            bg: ['#49DD7F', '#32AD5F'],
        },
        {
            id: "3",
            title: "This Year",
            value: filteredRequestsThisYear?.length,
            completed: getCurrentYearDays(eventDay)?.length,
            bg: ['#FACB15', '#FB923C'],
        },
        {
            id: "4",
            title: "This Week",
            value: filteredRequestsPreviousYear?.length,
            completed: getPreviousYearDays(eventDay)?.length,
            bg: ['#F77071', '#EC4898'],
        }
    ];