import C from '../common'
import { TVEventHandler, useTVEventHandler } from 'react-native';
export default function BookDetailsPage() {
    const { routes, apiClient } = C.useAppContext()
    const localParams = C.useLocalSearchParams()
    const [pages, setPages] = C.React.useState(null)
    const [pageNumber, setPageNumber] = C.React.useState(1)

    const [lastEventType, setLastEventType] = C.React.useState('');

    const myTVEventHandler = evt => {
        console.log({ evt })
        setLastEventType(evt.eventType);
    };


    if (C.isTV) {
        useTVEventHandler(myTVEventHandler);
    }
    C.React.useEffect(() => {
        if (!pages) {
            apiClient.getPageList(localParams.bookId).then((response) => {
                setPages(response)
            })

        }
    })

    if (!pages) {
        return <C.SnowText>Loading pages...</C.SnowText>
    }

    const imageSource = apiClient.getPage(localParams.bookId, pageNumber)

    return (
        <C.Modal style={{ flex: 1, backgroundColor: 'black' }}>
            <C.TouchableOpacity
                transparent

                onPress={() => {
                    setPageNumber((prev) => { return prev + 1 })
                }}
                style={{ flex: 1, backgroundColor: 'black' }}>
                <C.Image
                    style={{
                        flex: 1,
                        backgroundColor: 'black'
                    }}
                    contentFit="contain"
                    source={imageSource} />
            </C.TouchableOpacity>
        </C.Modal>
    )
}
