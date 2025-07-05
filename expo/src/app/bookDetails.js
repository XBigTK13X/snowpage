import C from '../common'
export default function BookDetailsPage() {
    const { routes, apiClient } = C.useAppContext()
    const localParams = C.useLocalSearchParams()
    const [pages, setPages] = C.React.useState(null)
    const [pageNumber, setPageNumber] = C.React.useState(1)

    C.React.useEffect(() => {
        if (!pages) {
            apiClient.getPageList(localParams.bookId).then((response) => {
                setPages(response)
            })

        }
    })

    console.log({ pages })

    if (!pages) {
        return <C.SnowText>Loading pages...</C.SnowText>
    }

    const imageSource = apiClient.getPageImageSource(localParams.bookId, pageNumber)

    console.log({ imageSource })

    return (
        <C.FillView>
            <C.TouchableOpacity
                onPress={() => {
                    setPageNumber((prev) => { return prev + 1 })
                }}>
                <C.Image
                    style={{
                        width: 800,
                        height: 800
                    }}
                    contentFit="contain"
                    source={imageSource} />
            </C.TouchableOpacity>
        </C.FillView>
    )
}
