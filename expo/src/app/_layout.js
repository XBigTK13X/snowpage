import C from '../common'
import Snow from 'react-native-snowui'
import { AppContextProvider, useAppContext } from '../app-context'

const styles = {
    header: {
        width: '100%',
        height: 75
    }
}

function Header() {
    const { routes } = useAppContext()

    return (
        <C.View style={styles.header}>
            <C.SnowGrid itemsPerRow={3} scroll={false}>
                <C.SnowTextButton title={`Home`} onPress={routes.func(routes.landing)} />
            </C.SnowGrid>
        </C.View>
    )
}

const appStyle = {
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
    }
}

export default function RootLayout() {
    return (
        <Snow.App snowStyle={appStyle}>
            <AppContextProvider>
                <Header />
                <C.Slot />
            </AppContextProvider >
        </Snow.App>
    )
}
