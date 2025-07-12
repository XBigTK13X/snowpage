import React from 'react'
import { TouchableOpacity } from 'react-native';
import SnowText from './snow-text'
import { StaticStyle } from '../snow-style'
import { Image } from 'expo-image'



const styles = {
    wrapper: {
        height: StaticStyle.imageButton.wrapper.normal.height,
        width: StaticStyle.imageButton.wrapper.normal.width,
        margin: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0,
        backgroundColor: StaticStyle.color.core,
        borderWidth: 5,
        borderColor: StaticStyle.color.core,
        borderRadius: 5,
    },
    wrapperWide: {
        height: StaticStyle.imageButton.wrapper.wide.height,
        width: StaticStyle.imageButton.wrapper.wide.width,
    },
    wrapperSquare: {
        height: StaticStyle.imageButton.wrapper.square.height,
        width: StaticStyle.imageButton.wrapper.square.width
    },
    selected: {
        borderColor: StaticStyle.color.active
    },
    focused: {
        borderColor: StaticStyle.color.hover
    },
    dull: {
        backgroundColor: StaticStyle.color.coreDark,
        borderColor: StaticStyle.color.coreDark,
    },
    image: {
        height: StaticStyle.imageButton.image.normal.height,
        width: StaticStyle.imageButton.image.normal.width,
        borderWidth: 2,
        borderColor: StaticStyle.color.outlineDark,
        backgroundColor: StaticStyle.color.outlineDark,
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        borderRadius: 6
    },
    imageWide: {
        height: StaticStyle.imageButton.image.wide.height,
        width: StaticStyle.imageButton.image.wide.width,
    },
    imageSquare: {
        height: StaticStyle.imageButton.image.square.height,
        width: StaticStyle.imageButton.image.square.width,
    },
    text: {
        height: 80,
        color: StaticStyle.color.textDark,
        fontSize: StaticStyle.imageButton.fontSize.normal,
        fontWeight: 'bold',
        padding: 0,
        margin: 0,
        marginTop: StaticStyle.imageButton.textBox.marginTop,
        textAlign: 'center'
    },
    smallText: {
        fontSize: StaticStyle.imageButton.fontSize.small
    }
}

export function SnowImageButton(props) {
    const [focused, setFocused] = React.useState(false)
    const touchRef = React.useRef(null)

    React.useEffect(() => {
        if (props.shouldFocus) {
            touchRef.current.focus()
        }
    }, [])

    let fontStyle = [styles.text]
    let title = props.title
    if (title && title.length > 20) {
        fontStyle.push(styles.smallText)
    }

    if (title && title.length > 40) {
        title = title.substring(0, 40) + '...'
    }

    const wrapperStyle = [styles.wrapper]
    const imageStyle = [styles.image]
    if (props.wide) {
        wrapperStyle.push(styles.wrapperWide)
        imageStyle.push(styles.imageWide)
    }
    if (props.square) {
        wrapperStyle.push(styles.wrapperSquare)
        imageStyle.push(styles.imageSquare)
    }

    if (props.dull) {
        wrapperStyle.push(styles.dull)
    }
    if (props.selected) {
        wrapperStyle.push(styles.selected)
    }
    if (focused) {
        wrapperStyle.push(styles.focused)
    }


    return (
        <TouchableOpacity
            ref={touchRef}
            activeOpacity={1.0}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            onFocus={() => { setFocused(true) }}
            onBlur={() => { setFocused(false) }}
            style={wrapperStyle}
            hasTVPreferredFocus={props.shouldFocus || focused}
            autoFocus={props.shouldFocus}>
            <Image
                style={imageStyle}
                contentFit="contain"
                source={props.imageSource} />
            <SnowText style={fontStyle}>{title}</SnowText>
        </TouchableOpacity>
    )
}

export default SnowImageButton