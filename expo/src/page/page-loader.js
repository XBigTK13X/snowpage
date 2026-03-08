import C from '../common'
import Snow from 'expo-snowui'
import { AppContextProvider, useAppContext } from '../app-context'
import { routes } from '../routes'
import { pages } from '../pages'

const styles = {
    header: {
        width: '100%',
        height: 75
    }
}

function Header(props) {
    const { navPush, CurrentPage, currentRoute } = C.useSnowContext()
    const { routes } = useAppContext()

    if (currentRoute?.routePath === '/' || currentRoute?.routePath === routes.libraryList || currentRoute?.routePath === routes.bookDetails) {
        return null
    }

    return (
        <C.SnowView style={styles.header} {...props}>
            <C.SnowGrid itemsPerRow={3} scroll={false}>
                <C.SnowTextButton
                    focusKey="home-button"
                    title={`Home`}
                    onPress={navPush({ path: routes.libraryList })}
                />
            </C.SnowGrid>
        </C.SnowView>
    )
}


const appStyle = {
    color: {
        background: 'black',
        text: 'rgb(235, 235, 235)',
        textDark: 'rgb(10, 10, 10)',
        active: 'rgb(150, 150, 150)',
        hover: 'rgb(219, 158, 44)',
        hoverDark: 'rgba(136, 101, 61, 1)',
        core: 'rgba(105, 127, 255, 1)',
        coreDark: 'rgb(81, 92, 154)',
        outlineDark: 'rgb(63, 63, 63)',
        fade: 'rgb(23, 23, 23)',
        transparentDark: 'rgba(0,0,0,0.6)',
        panel: 'rgb(50,50,50)'
    }
}

const SnowApp = Snow.createSnowApp({
    enableSentry: false
})

function PageWrapper(props) {
    const { CurrentPage, currentRoute } = Snow.useSnowContext()
    return <CurrentPage {...props} />
}

export default function PageLoader() {
    return (
        <SnowApp
            DEBUG_FOCUS={true}
            DEBUG_FOCUS_TREE={true}
            snowStyle={appStyle}
            routePaths={routes}
            routePages={pages}
            initialRoutePath={routes.libraryList}
        >
            <AppContextProvider>
                <C.SnowView style={{ flex: 1, marginBottom: 50 }}>
                    <Header />
                    <PageWrapper />
                </C.SnowView>
            </AppContextProvider >
        </SnowApp >
    )
}

