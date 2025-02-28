import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AllEvents from "../components/AllEvents.jsx";
import BranchEvents from "../components/Branch/BranchEvents.jsx";
import BranchLogin from "../components/Branch/BranchLogin.jsx";
import BranchSettings from "../components/Branch/BranchSettings.jsx";
import CreateUser from "../components/Branch/CreateUser/CreateUser.jsx";
import BranchEventDetails from "../components/Branch/Details/BranchEventDetails.jsx";
import BranchHome from "../components/Branch/Home/BranchHome.jsx";
import UsersRequest from "../components/Branch/Request/UsersRequest.jsx";
import Home from "../components/Home.jsx";
import AttendedEvents from "../components/User/AttendedEvents.jsx";
import ViewDetails from "../components/User/Details/ViewDetails.jsx";
import OtherEvents from "../components/User/OtherEvents.jsx";
import RequestedEvents from "../components/User/RequestedEvents.jsx";
import UserEventDetails from "../components/User/UserEventDetails.jsx";
import UserHome from "../components/User/UserHome.jsx";
import UserLogin from "../components/User/UserLogin.jsx";
import UserRegister from "../components/User/UserRegister/UserRegister.jsx";
import UserSettings from "../components/User/UserSettings.jsx";
import { ProtectedAllEvents, ProtectedRouteBranch, ProtectedRouteUser } from "./ProtectedRoutes";

export default function Routes() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="BranchLogin" component={BranchLogin} />
            <Stack.Screen name="UserLogin" component={UserLogin} />
            <Stack.Screen name="UserRegister" component={UserRegister} />
            <Stack.Screen name="BranchHome" >
                {() => (<ProtectedRouteBranch><BranchHome /></ProtectedRouteBranch>)}
            </Stack.Screen>
            <Stack.Screen name="BranchEvents" >
                {() => (<ProtectedRouteBranch><BranchEvents /></ProtectedRouteBranch>)}
            </Stack.Screen>
            <Stack.Screen name="BranchEventDetails" >
                {() => (<ProtectedRouteBranch><BranchEventDetails /></ProtectedRouteBranch>)}
            </Stack.Screen>
            <Stack.Screen name="UsersRequest" >
                {() => (<ProtectedRouteBranch><UsersRequest /></ProtectedRouteBranch>)}
            </Stack.Screen>
            <Stack.Screen name="CreateUser" >
                {() => (<ProtectedRouteBranch><CreateUser /></ProtectedRouteBranch>)}
            </Stack.Screen>
            <Stack.Screen name="BranchSettings" >
                {() => (<ProtectedRouteBranch><BranchSettings /></ProtectedRouteBranch>)}
            </Stack.Screen>
            <Stack.Screen name="UserHome" >
                {() => (<ProtectedRouteUser><UserHome /></ProtectedRouteUser>)}
            </Stack.Screen>
            <Stack.Screen name="UserSettings" >
                {() => (<ProtectedRouteUser><UserSettings /></ProtectedRouteUser>)}
            </Stack.Screen>
            <Stack.Screen name="AllEvents" >
                {() => (<ProtectedAllEvents><AllEvents /></ProtectedAllEvents>)}
            </Stack.Screen>
            <Stack.Screen name="UserEventDetails" >
                {() => (<ProtectedAllEvents><UserEventDetails /></ProtectedAllEvents>)}
            </Stack.Screen>
            <Stack.Screen name="OtherEvents" >
                {() => (<ProtectedRouteUser><OtherEvents /></ProtectedRouteUser>)}
            </Stack.Screen>
            <Stack.Screen name="AttendedEvents" >
                {() => (<ProtectedRouteUser><AttendedEvents /></ProtectedRouteUser>)}
            </Stack.Screen>
            <Stack.Screen name="RequestedEvents" >
                {() => (<ProtectedRouteUser><RequestedEvents /></ProtectedRouteUser>)}
            </Stack.Screen>
            <Stack.Screen name="ViewDetails" >
                {() => (<ProtectedRouteUser><ViewDetails /></ProtectedRouteUser>)}
            </Stack.Screen>
        </Stack.Navigator>
    );
};