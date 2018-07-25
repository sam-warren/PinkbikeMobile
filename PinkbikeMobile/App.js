import React from "react";
import { Homepage } from "./build/Components/Homepage/Homepage";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Image } from "react-native";
// import GlobalStyles from "./src/Styles/Global-Styles";

const HomeScreen = createStackNavigator(
  {
    HomeScreen: { screen: Homepage }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000000"
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontSize: 19,
        fontWeight: "200"
      },
      headerLeft: (
        <View>
          <Image source={ require("./src/Assets/Images/PinkbikeCorporateLogo.png") } style={{ height: 50, width: 250, paddingLeft: 10 }}/>
        </View>
      )
    }
  }
);

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => ( <Icon name="home" color={ tintColor } size={ 24 }></Icon> )
      })
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showLabel: true,
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#252525",
      style: {
        backgroundColor: "#000000"
      }
    }
  }
)

