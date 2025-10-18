import React from 'react';
import Snow from 'expo-snowui'
import { config } from './settings'
import { routes } from './routes'
import { Modal, View } from 'react-native'
import { ApiClient } from './api-client'

const AppContext = React.createContext({
    config: null,
    routes: null,
    apiClient: null
});

export function useAppContext() {
    const value = React.useContext(AppContext);
    if (!value) {
        throw new Error('appContext must be wrapped in a <AppContextProvider />');
    }
    return value;
}

export function AppContextProvider(props) {
    const { SnowStyle } = Snow.useSnowContext(props)
    const [apiError, setApiError] = React.useState(null)
    const onApiError = (err) => {
        if (!apiError) {
            setApiError(err)
        }
    }

    const apiClient = new ApiClient({ onApiError })

    const styles = {
        prompt: {
            backgroundColor: SnowStyle.color.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }
    }

    React.useEffect(() => {
        if (apiError) {
            pushModal({
                props: {
                    focusLayer: "api-error",
                    onRequestClose: () => {
                        setApiError(null)
                    }
                },
                render: () => {
                    return (
                        <View style={styles.prompt}>
                            <Snow.Text>Unable to communicate with Snowpage.</Snow.Text>
                            <Snow.Text>Check if your Wi-Fi is disconnected, ethernet unplugged, or if the Snowstream server is down.</Snow.Text>
                            <Snow.Grid itemsPerRow={2}>
                                <Snow.TextButton title="Try to Reload" onPress={() => { setApiError(null) }} />
                            </Snow.Grid>
                        </View>
                    )
                }
            })
            return () => {
                popModal()
            }
        }
    }, [apiError, apiClient])

    const appContext = {
        config,
        routes,
        apiClient
    }

    return (
        <AppContext.Provider
            style={{ flex: 1 }}
            value={appContext}
            children={props.children}
        />
    )
}

export default AppContextProvider