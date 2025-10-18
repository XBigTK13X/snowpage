import C from '../common'
export default function BookListPage() {
    const { navPush, currentRoute } = C.useSnowContext()
    const { routes, apiClient, config } = C.useAppContext()
    const [bookList, setBookList] = C.React.useState(null)

    C.React.useEffect(() => {
        if (!bookList) {
            apiClient.getBookList(currentRoute.routeParams.seriesId).then((response) => {
                setBookList(response.content)
            })
        }
    })

    if (!bookList) {
        return <C.SnowText>Loading books from {currentRoute.routeParams.seriesName}...</C.SnowText>
    }

    return (
        <>
            <C.SnowLabel center>{currentRoute.routeParams.seriesName}</C.SnowLabel>
            <C.SnowGrid
                focusStart
                focusKey="page-entry"
                itemsPerRow={config.booksPerRow}
                itemsPerPage={config.booksPerPage}
                items={bookList}
                renderItem={(item) => {
                    const thumbnail = apiClient.getBookThumbnail(item.id)
                    let title = item.name
                    const dashIndex = title.indexOf(' - ')
                    if (dashIndex !== -1) {
                        title = item.name.substring(0, dashIndex)
                    }
                    return <C.SnowImageButton
                        title={title}
                        imageSource={thumbnail}
                        onPress={navPush(routes.bookDetails, { bookId: item.id }, true)} />
                }} />
        </>
    )
}
