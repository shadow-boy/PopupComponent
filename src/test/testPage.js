import React, {
    Component,
    Fragment

} from 'react';
import {
    View,
    FlatList,
    TouchableHighlight,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'

import PopupWindow from "./popup/Popup";
import LWAlertComponent from './popup/LWAlertComponent';
import WebService from '../api/webService';

let id = 0;
let elements = [];
export default class TestPageComponent extends Component {

    componentDidMount() {
        this.loadData();
    }

    async loadData() {

        // WebService.getRequest("movieOnInfoList", {}).then((res) => {
        //
        //     console.log(res)
        //
        // })
        try {
            let data = await WebService.getRequest("movieOnInfoList11", {});
            console.log(data)
        } catch (e) {

            console.log("业务模块 。。收到的回调错误 ---- ");
            console.log(e);
        }


    }


    showAnimation() {
        console.log(this.pop);
        this.refs.pop.show()

    }

    render() {
        return <View style={styles.container}>
            <TouchableHighlight
                style={styles.button}
                onPress={this.showAnimation.bind(this)}
            >
                <Text style={styles.buttonText}>show alert</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight
                style={styles.button}
                onPress={this.destroySibling}
            >
                <Text style={styles.buttonText}>Destroy element</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={this.updateSibling}
            >
                <Text style={styles.buttonText}>Update element</Text>
            </TouchableHighlight> */}
            <LWAlertComponent ref="pop"
                              touchUpDismiss={false}
                              onTouchUpMask={() => {
                                  console.log('onTouchUpMask');
                                  this.refs.pop.hide();
                              }}
            >
            </LWAlertComponent>
            <PopupWindow>
                <View>
                    <View></View>
                    <Text></Text>
                </View>

            </PopupWindow>
        </View>;
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 4,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ccc',
        borderColor: '#333',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white'
    },
    // sibling: {
    //     left: 0,
    //     height: 20,
    //     width: Dimensions.get('window').width / 2,
    //     backgroundColor: 'blue',
    //     opacity: 0.5
    // }

    sibling: {
        left: 0,
        top: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'blue',
        opacity: 0.2
    }
});
