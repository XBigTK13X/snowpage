import C from '../common'
export default function SeriesListPage() {
    const { navPush, currentRoute } = C.useSnowContext()
    const { routes, apiClient, config } = C.useAppContext()
    const [seriesList, setSeriesList] = C.React.useState(null)

    C.React.useEffect(() => {
        if (!seriesList) {
            apiClient.getSeriesList(currentRoute.routeParams.libraryId).then((response) => {
                setSeriesList(response.content)
            })
        }
    })

    if (!seriesList) {
        return <C.SnowText>Loading series list...</C.SnowText>
    }

    return (
        <>
            <C.SnowGrid
                focusStart
                focusKey="page-entry"
                itemsPerRow={config.booksPerRow}
                itemsPerPage={config.booksPerPage}
                items={seriesList}
                renderItem={(item) => {
                    const thumbnail = apiClient.getSeriesThumbnail(item.id)
                    return <C.SnowImageButton
                        title={item.name}
                        imageSource={thumbnail}
                        onPress={navPush(routes.bookList, { seriesId: item.id, seriesName: item.name }, true)} />
                }} />
        </>
    )
}
