import C from '../common'
import { TVEventHandler, useTVEventHandler, Pressable } from 'react-native';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function BookDetailsPage() {
    const { routes, apiClient } = C.useAppContext()
    const localParams = C.useLocalSearchParams()
    const [pages, setPages] = C.React.useState(null)
    const [showTwoPages, setShowTwoPages] = C.React.useState(false)
    const showTwoPagesRef = C.React.useRef(showTwoPages)
    const [showCount, setShowCount] = C.React.useState(false)
    const showCountRef = C.React.useRef(showCount)
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

    C.React.useEffect(() => {
        showTwoPagesRef.current = showTwoPages
    }, [showTwoPages])

    C.React.useEffect(() => {
        showCountRef.current = showCount
    }, [showCount])

    const nextPage = () => {
        const page = pageNumberRef.current
        const max = maxPageNumberRef.current
        const diff = showTwoPagesRef.current ? 2 : 1
        if (page < max) {
            pageNumberRef.current += diff
            setPageNumber(page + diff)
        }
        else {
            routes.back()
        }
    }

    const previousPage = () => {
        const page = pageNumberRef.current
        const diff = showTwoPagesRef.current ? 2 : 1
        if (page > 1) {
            pageNumberRef.current -= diff
            setPageNumber(page - diff)
        }
        else {
            routes.back()
        }
    }

    if (C.isTV) {
        const tvRemoteHandler = evt => {
            if (evt.eventType === 'right' || evt.eventType === 'select') {
                nextPage()
            }
            else if (evt.eventType === 'left') {
                previousPage()
            }
            else if (evt.eventType === 'up') {
                setShowTwoPages(!showTwoPagesRef.current)
            }
            else if (evt.eventType === 'down') {
                setShowCount(!showCountRef.current)
            }
        };
        useTVEventHandler(tvRemoteHandler);
    }

    if (C.isWeb) {
        C.React.useEffect(() => {
            const focusKeyboardHandler = (event) => {
                switch (event.key) {
                    case 'ArrowUp':
                        setShowTwoPages(!showTwoPagesRef.current)
                        break
                    case 'ArrowDown':
                        setShowCount(!showCountRef.current)
                        break
                    case 'ArrowLeft':
                        previousPage()
                        break
                    case 'ArrowRight':
                        nextPage()
                        break
                    default:
                        break
                }
            };
            window.addEventListener('keydown', focusKeyboardHandler);
            return () => {
                window.removeEventListener('keydown', focusKeyboardHandler);
            };
        }, []);
    }

    if (!pages) {
        return <C.SnowText>Loading pages...</C.SnowText>
    }

    const imageSource = apiClient.getPage(localParams.bookId, pageNumber)
    let images = (
        < C.Image
            style={{
                flex: 1,
                backgroundColor: 'black'
            }}
            contentFit="contain"
            source={imageSource} />
    )
    if (showTwoPages) {
        if (pageNumber + 1 < pages.length) {
            const secondImageSource = apiClient.getPage(localParams.bookId, pageNumber + 1)
            images = (
                <C.View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "black",
                    }}
                >
                    <C.Image
                        style={{ flex: 1 }}
                        contentFit="contain"
                        source={imageSource}
                    />
                    <C.Image
                        style={{ flex: 1 }}
                        contentFit="contain"
                        source={secondImageSource}
                    />
                </C.View>
            )
        }
    }

    let countDisplay = null
    if (showCount) {
        countDisplay = <C.SnowText style={{ margin: 0, padding: 0, backgroundColor: 'black', color: 'white' }}>
            {`Page ${pageNumber} of ${pages.length}`}
        </C.SnowText>
    }

    if (!C.isTV) {
        const tapBook = (evt) => {
            const half = evt.view.innerWidth / 2
            const position = evt.pageX
            if (position >= half) {
                nextPage()
            } else {
                previousPage()
            }
        }
        images = (
            <Pressable style={{ flex: 1 }} onPress={tapBook}>
                {images}
            </Pressable >
        )
    }

    return (
        <C.Modal
            style={{ flex: 1, backgroundColor: 'black' }}
            onRequestClose={() => { routes.back() }} >
            {countDisplay}
            {images}
        </ C.Modal>
    )
}
