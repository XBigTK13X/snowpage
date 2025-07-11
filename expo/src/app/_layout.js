import C from '../common'
import { AppContextProvider } from '../app-context'
import { StaticStyle } from '../snow-style'
import { SystemBars } from "react-native-edge-to-edge";

const styles = {
    header: {
        width: '100%',
        height: 100
    },
    hr: {
        borderBottomColor: C.StaticStyle.color.coreDark,
        borderBottomWidth: 2,
    },
    page: {
        flex: 1,
        padding: 30,
        backgroundColor: C.StaticStyle.color.background
    }
}

function Header() {
    const { routes } = C.useAppContext()

    return (
        <C.View style={styles.header}>
            <C.SnowGrid itemsPerRow={3} scroll={false}>
                <C.SnowTextButton title="Home" onPress={routes.func(routes.landing)} />
            </C.SnowGrid>
            <C.FillView style={styles.hr} />
        </C.View>
    )
}

export default function RootLayout() {
    if (C.isAndroid) {
        SystemBars.setHidden(true)
    }
    const Wrapper = C.isTV ? C.TVFocusGuideView : C.View
    return (
        <AppContextProvider>
            <C.View style={styles.page}>
                <Wrapper>
                    <Header />
                    <C.Slot />
                </Wrapper>
            </C.View>
        </AppContextProvider>

    )
}
