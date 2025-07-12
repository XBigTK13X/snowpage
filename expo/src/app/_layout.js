import C from '../common'
import { AppContextProvider } from '../app-context'
import { SystemBars } from "react-native-edge-to-edge";
import { config } from '../settings'
const styles = {
    header: {
        width: '100%',
        height: 75
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
                <C.SnowTextButton title={`Home [v${config.clientVersion}]`} onPress={routes.func(routes.landing)} />
            </C.SnowGrid>
        </C.View>
    )
}

export default function RootLayout() {
    if (C.isAndroid) {
        SystemBars.setHidden(true)
    }
    const Wrapper = C.isTV ? C.TVFocusGuideView : C.View
    return (
        <Wrapper style={styles.page}>
            <C.FillView scroll>
                <AppContextProvider>
                    <Header />
                    <C.Slot />
                </AppContextProvider >
            </C.FillView>
        </Wrapper>
    )
}
