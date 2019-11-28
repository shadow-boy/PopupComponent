# react-native上自定义弹窗组件

## 1、造轮子背景
用react-native写项目也有段时间了，一直没有看好自定义程度多高的自定义弹窗组件、
之前写了很长时间的iOS原生、一直觉得[MMPopupView](https://github.com/adad184/MMPopupView)这个组件非常好用，当然还有一些其他的swift库，这个不是今天的重点，下次有空在介绍了。

先来看看效果
![react-native 弹窗效果图](https://upload-images.jianshu.io/upload_images/1226938-890fcefdaa3b5f29.gif?imageMogr2/auto-orient/strip)
并且是纯js版本、不需要分别对安卓和iOS做任何类似react-native link的处理

## 2、看看代码
### 1 - 首先看下组件的最底层封装
```
import React, {
    Component,
} from 'react';
import {
    Animated,
    Easing,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

let element = null;

const screen_width = Dimensions.get("window").width;
const screen_height = Dimensions.get("window").height;
const marginHor = 50;
const animationDuration = 500


export default class PopupWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aniColor: new Animated.Value(0),
            aniScale: new Animated.Value(0),
            visible: false,
        };
        this.animationOpacity = Animated.timing(this.state.aniColor, {
            toValue: 0.5,
            duration: animationDuration,

        });
        this.animationScale = Animated.spring(this.state.aniScale, {
            toValue: 1,
            duration: animationDuration,
            bounciness: 10,
            speed: 20

        });
        this.animationGroup = Animated.parallel([this.animationOpacity, this.animationScale]);


    }
    showCallBack = (finished) => {
        console.log("动画显示完毕回调");
    }
    hideCallBack = (finished) => {
        console.log("动画移除完毕回调");
    }


    /**
     * 显示弹窗
     * @param {显示完成回调} showCallBack
     */
    show(showCallBack = this.showCallBack) {
        this.setState({ visible: true })
        this.showAnimation(showCallBack);
    }
    showAnimation(showCallBack = (result) => { }) {

        this.animationGroup.start(showCallBack);

    }
    /**
     * 隐藏弹窗
     */
    hide() {
        this.setState({ visible: false })
        this.hideAnimation();

    }
    hideAnimation() {
        this.animationGroup.reset();

    }



    render() {
        let { children, marginHorizontal = marginHor, touchUpDismiss = false, onTouchUpMask, maskColor = "rgba(23,25,25,0.5)" } = this.props;
        if (!this.state.visible) {
            return <View />;
        }

        return (

            <AnimatedTouchableOpacity activeOpacity={1}
                style={[styles.window, { backgroundColor: maskColor }]}

                onPress={(event) => {
                    console.log("window popup click")

                    if (onTouchUpMask != 'undefined' && onTouchUpMask != null) {
                        onTouchUpMask();
                        debugger
                        return;
                    }
                    if (touchUpDismiss) {
                        this.hide()
                    }
                }}
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                >
                    <Animated.View
                        style={[styles.container, { marginHorizontal: marginHorizontal, },
                        { transform: [{ scaleX: this.state.aniScale }, { scaleY: this.state.aniScale }] }]}
                    >
                        {this.renderChildrenComponents()}

                    </Animated.View>

                </TouchableOpacity>


            </AnimatedTouchableOpacity>
        )


    }
    /**
     * 子类复写这个方法 可以定义
     */
    renderChildrenComponents() {
        return this.props.children;

    }
}
//参数传递
PopupWindow.propTypes = {
    maskColor: PropTypes.string,
    marginHorizontal: PropTypes.number,
    touchUpDismiss: PropTypes.bool,
    onTouchUpMask: PropTypes.func,
}




const styles = StyleSheet.create({
    window: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: "center",
        alignItems: "center",

    },
    container: {
        flexDirection: "column",
        width: screen_width - marginHor * 2,
        marginHorizontal: marginHor,
        justifyContent: "space-between",
        alignItems: "center"
    }

})

```
### 2 - 继承自底层组件的自定义封装弹窗
```

import React, {
    Component,
} from 'react';
import {
    Animated,
    Easing,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import PopupWindow from './Popup';


export default class LWAlertComponent extends PopupWindow {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,

        }
    }
    renderChildrenComponents() {
        console.log("renderChildrenComponents --- " + "LWAlertComponent");
        return (
            <View style={model.container}>
                <Text style={model.title}>title</Text>
                <Text style={model.content}>confirm dialog --- content content content content content content content </Text>
                <View style={model.seperator_line}></View>
                <TouchableOpacity style={model.bt_confirm}
                    onPress={(event) => {
                        this.hide()
                    }}

                >
                    <Text style={model.text_confirm}>OK</Text>
                </TouchableOpacity>
            </View>
        )
    }




}

const model = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "stretch",
        alignSelf: "stretch",
        backgroundColor: "white",
        borderRadius: 5,
    },
    title: {
        fontSize: 17,
        color: "black",
        fontWeight: "500",
        marginVertical: 15,
        textAlign: "center"
    },
    content: {
        fontSize: 17,
        color: "gray",
        marginBottom: 20,
        paddingHorizontal: 20,
        textAlign: "center"

    },
    bt_confirm: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    text_confirm: {
        color: "red",
        fontWeight: "800",
        fontSize: 18,
    },
    seperator_line: {
        backgroundColor: "#ccc",
        height: 0.5
    }
})

```


## 3、看看使用方法
```
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
        </View>;
    }

```
*LWAlertComponent* 这个组件就是经过封装的自定义组件、上面是使用方法

## 4 再最后看看最原始的使用方法
```
 <PopupWindow>
  <View>
     <View></View>
     <Text></Text>
  </View>
</PopupWindow>
```

#### 目前使用方法只提供了ref 调用的方式。
#### 最后附上完整demo 地址 方便的话点下小星星
[github 地址](https://github.com/shadow-boy/PopupComponent)



