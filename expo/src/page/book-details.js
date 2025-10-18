import C from '../common'
import { Pressable } from 'react-native';

export default function BookDetailsPage() {
    const {
        currentRoute,
        pushModal,
        popModal,
        navPop,
        addActionListener,
        removeActionListener
    } = C.useSnowContext()
    const { apiClient } = C.useAppContext()
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
            apiClient.getPageList(currentRoute.routeParams.bookId).then((response) => {
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
            navPop()
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
            navPop()
        }
    }

    const imageSource = apiClient.getPage(currentRoute.routeParams.bookId, pageNumber)
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
            const secondImageSource = apiClient.getPage(currentRoute.routeParams.bookId, pageNumber + 1)
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
        countDisplay = (
            <C.View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <C.SnowText style={{ margin: 0, padding: 15, backgroundColor: 'black', color: 'white' }}>
                    {`Page ${pageNumber} of ${pages.length}`}
                </C.SnowText>
            </C.View>
        )
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

    C.React.useEffect(() => {
        const actionListenerKey = addActionListener({
            onPress: () => {
                nextPage()
            },
            onRight: () => {
                nextPage()
            },
            onLeft: () => {
                previousPage()
            },
            onUp: () => {
                setShowTwoPages(!showTwoPagesRef.current)
            },
            onDown: () => {
                setShowCount(!showCountRef.current)
            }
        })
        return () => {
            removeActionListener(actionListenerKey)
        }
    }, [])

    C.React.useEffect(() => {
        pushModal({
            props: {
                focusLayer: "book-pages",
                onRequestClose: () => {
                    navPop()
                }
            },
            render: () => {
                if (!pages) {
                    return <C.SnowText>Loading pages...</C.SnowText>
                }
                return (
                    <>
                        {countDisplay}
                        {images}
                    </>
                )
            }
        })
        return () => {
            popModal()
        }
    }, [pages, pageNumber, showTwoPages, showCount])

    return null
}
