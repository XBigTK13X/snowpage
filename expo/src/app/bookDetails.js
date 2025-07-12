import C from '../common'
import { TVEventHandler, useTVEventHandler } from 'react-native';
export default function BookDetailsPage() {
    const { routes, apiClient } = C.useAppContext()
    const localParams = C.useLocalSearchParams()
    const [pages, setPages] = C.React.useState(null)
    const [pageNumber, setPageNumber] = C.React.useState(1)
    const pageNumberRef = C.React.useRef(1)
    const maxPageNumberRef = C.React.useRef(2)

    C.React.useEffect(() => {
        if (!pages) {
            apiClient.getPageList(localParams.bookId).then((response) => {
                setPages(response)
                maxPageNumberRef.current = response.length
            })

        }
    })

    const myTVEventHandler = evt => {
        const page = pageNumberRef.current
        const max = maxPageNumberRef.current
        if (evt.eventType === 'right' || evt.eventType === 'select') {
            if (page < max) {
                pageNumberRef.current += 1
                setPageNumber(page + 1)
            }
            else {
                routes.back()
            }
        }
        else if (evt.eventType === 'left') {
            if (page > 1) {
                pageNumberRef.current -= 1
                setPageNumber(page - 1)
            }
            else {
                routes.back()
            }
        }
    };


    if (C.isTV) {
        useTVEventHandler(myTVEventHandler);
    }


    if (!pages) {
        return <C.SnowText>Loading pages...</C.SnowText>
    }

    const imageSource = apiClient.getPage(localParams.bookId, pageNumber)

    return (
        <C.Modal
            style={{ flex: 1, backgroundColor: 'black' }}
            onRequestClose={() => { routes.back() }} >
            < C.Image
                style={{
                    flex: 1,
                    backgroundColor: 'black'
                }}
                contentFit="contain"
                source={imageSource} />
        </ C.Modal>
    )
}
