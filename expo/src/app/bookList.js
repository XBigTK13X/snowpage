import C from '../common'
export default function BookListPage() {
    const { routes, apiClient, config } = C.useAppContext()
    const localParams = C.useLocalSearchParams()
    const [bookList, setBookList] = C.React.useState(null)

    C.React.useEffect(() => {
        if (!bookList) {
            apiClient.getBookList(localParams.seriesId).then((response) => {
                setBookList(response.content)
            })
        }
    })

    if (!bookList) {
        return <C.SnowText>Loading books from {localParams.seriesName}...</C.SnowText>
    }

    return (
        <C.View>
            <C.SnowLabel center>{localParams.seriesName}</C.SnowLabel>
            <C.SnowGrid focusStart focusKey="page-entry" itemsPerRow={config.booksPerRow} items={bookList} renderItem={(item) => {
                const thumbnail = apiClient.getBookThumbnail(item.id)
                let title = item.name
                const dashIndex = title.indexOf(' - ')
                if (dashIndex !== -1) {
                    title = item.name.substring(0, dashIndex)
                }
                return <C.SnowImageButton
                    title={title}
                    imageSource={thumbnail}
                    onPress={routes.func(routes.bookDetails, { bookId: item.id })} />
            }} />
        </C.View>
    )
}
