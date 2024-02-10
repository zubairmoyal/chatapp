import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./NavigationService";
import { createStackNavigator } from "@react-navigation/stack";
import Myauth from "../screen/Myauth";
import * as routes from "./routes";
import Home from "../screen/Home";


const Navigator = () => {
    const Stack = createStackNavigator();

    const RootStackScreen = () => (
        <Stack.Navigator
            initialRouteName={routes?.MY_HOME}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name={routes.MY_HOME}
                component={Home}
            />
            <Stack.Screen
                name={routes.MY_AUTH}
                component={Myauth}
            />
        </Stack.Navigator>
    );


    return (
        <NavigationContainer
            ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}>
            <RootStackScreen />
        </NavigationContainer>
    );
};

export default Navigator;