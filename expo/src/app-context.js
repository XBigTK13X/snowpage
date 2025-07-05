import React from 'react';
import { config } from './settings'
import { routes } from './routes'
import { Modal, View } from 'react-native'
import { ApiClient } from './api-client'

import { StaticStyle } from './snow-style'
import SnowGrid from './comp/snow-grid'
import SnowText from './comp/snow-text'
import SnowTextButton from './comp/snow-text-button'

const styles = {
    prompt: {
        backgroundColor: StaticStyle.color.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}

const AppContext = React.createContext({
    config: null,
    routes: null,
    session: null,
    isLoading: false,
    apiClient: null,
    isAdmin: false,
    displayName: null,
    message: null,
    setMessageDisplay: (message) => null,
    useStorageStage: () => null,
});

export function useAppContext() {
    const value = React.useContext(AppContext);
    if (!value) {
        throw new Error('appContext must be wrapped in a <AppContextProvider />');
    }
    return value;
}

export function AppContextProvider(props) {
    const [apiError, setApiError] = React.useState(null)
    const [apiClient, setApiClient] = React.useState(null)
    const [message, setMessage] = React.useState("All is well")
    const [session, setSession] = React.useState(null)
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [displayName, setDisplayName] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (!apiClient) {
            setIsLoading(false)
            setApiClient(new ApiClient({
                onApiError: onApiError
            }))
        }
    })

    const onApiError = (err) => {
        if (!apiError) {
            setApiError(err)
        }
    }

    if (apiError) {
        return (
            <Modal navigationBarTranslucent statusBarTranslucent>
                <View style={styles.prompt}>
                    <SnowText>Unable to communicate with Snowstream.</SnowText>
                    <SnowText>Check if your Wi-Fi is disconnected, ethernet unplugged, or if the Snowstream server is down.</SnowText>
                    <View>
                        <SnowGrid itemsPerRow={2}>
                            <SnowTextButton title="Try to Reload" onPress={() => { setApiError(null) }} />
                        </SnowGrid>
                    </View>
                </View>
            </Modal>
        )
    }

    const appContext = {
        config,
        routes,
        session,
        isLoading,
        apiClient,
        isAdmin,
        displayName,
        message,
        setMessageDisplay: setMessage
    }

    return (
        <AppContext.Provider
            value={appContext}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider