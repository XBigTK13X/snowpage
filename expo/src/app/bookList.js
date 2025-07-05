import C from '../common'
export default function BookListPage() {
    const { routes, apiClient } = C.useAppContext()
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
        return <C.SnowText>Loading library...</C.SnowText>
    }

    return (
        <C.FillView>
            <C.SnowGrid items={bookList} renderItem={(item) => {
                const thumbnail = apiClient.getBookThumbnail(item.id)
                return <C.SnowImageButton
                    title={item.name}
                    imageSource={thumbnail}
                    onPress={routes.func(routes.bookDetails, { bookId: item.id })} />
            }} />
        </C.FillView>
    )
}
