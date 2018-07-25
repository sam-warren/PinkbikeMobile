import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class App extends React.Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "Open up App.js to start working on your app!"),
            React.createElement(Text, null, "Changes you make will automatically reload."),
            React.createElement(Text, null, "Shake your phone to open the developer menu.")));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
//# sourceMappingURL=App.js.map