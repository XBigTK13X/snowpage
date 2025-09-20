import { Platform, Dimensions } from 'react-native';

const isAndroid = Platform.OS === 'android'
const isWeb = Platform.OS === 'web'

const uhd = {
    width: 3840,
    height: 2160
}

let scaleMultiplier = 0.75
if (Platform.isTV) {
    scaleMultiplier = 0.5
}

let scaled = (input) => {
    return Math.round(input * scaleMultiplier)
}

export const StaticStyle = {
    color: {
        background: 'black',
        text: 'rgb(235, 235, 235)',
        textDark: 'rgb(10, 10, 10)',
        active: 'rgb(150, 150, 150)',
        hover: 'rgb(219, 158, 44)',
        core: 'rgba(105, 127, 255, 1)',
        coreDark: 'rgb(81, 92, 154)',
        outlineDark: 'rgb(63, 63, 63)',
        transparentDark: 'rgba(0,0,0,0.6)'
    },
    fontSize: {
        header: 40,
        label: 26
    },
    depth: {
        video: {
            wrapper: 700,
            content: 800,
            toggle: 900,
            controls: 1000
        }
    },
    window: {
        height: () => { return Dimensions.get('window').height },
        width: () => { return Dimensions.get('window').width }
    },
    surface: {
        height: () => { return Platform.isTV ? uhd.height : Dimensions.get('window').height },
        width: () => { return Platform.isTV ? uhd.width : Dimensions.get('window').width }
    },
    imageButton: {
        wrapper: {
            normal: {
                height: scaled(425),
                width: scaled(310)
            },
            wide: {
                height: scaled(170),
                width: scaled(200)
            },
            square: {
                height: scaled(250),
                width: scaled(250)
            }
        },
        image: {
            normal: {
                height: scaled(315),
                width: scaled(260)
            },
            wide: {
                height: scaled(90),
                width: scaled(150)
            },
            square: {
                height: scaled(200),
                width: scaled(200)
            }
        },
        fontSize: {
            normal: scaled(25),
            small: scaled(20)
        },
        textBox: {
            marginTop: isAndroid ? -10 : 0
        }
    },
    textButton: {
        wrapper: {
            normal: {
                height: 35
            }
        },
        fontSize: {
            normal: 16,
            small: 12
        },
        textBox: {
            height: isAndroid ? 25 : 15
        }
    }
}

if (isWeb) {
    StaticStyle.page = {
        height: StaticStyle.window.height() - 50
    }
} else {
    StaticStyle.page = {
        height: StaticStyle.window.height() - 25
    }
}

export default StaticStyle
