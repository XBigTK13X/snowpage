import C from '../common'
export default function LibraryListPage() {
    const { routes, apiClient } = C.useAppContext()

    const [libraryList, setLibraryList] = C.React.useState(null)

    C.React.useEffect(() => {
        if (!libraryList && apiClient) {
            apiClient.getLibraryList().then((response) => {
                setLibraryList(response)
            })
        }
    })

    if (!libraryList) {
        return <C.SnowText>Loading library list...</C.SnowText>
    }

    if (libraryList.length === 0) {
        return <C.SnowText>No libraries were found</C.SnowText>
    }

    return (
        <C.FillView>
            <C.SnowGrid items={libraryList} renderItem={(item) => {
                return <C.SnowTextButton
                    title={item.name}
                    onPress={routes.func(routes.seriesList, { libraryId: item.id })} />
            }} />
        </C.FillView>
    )
}
