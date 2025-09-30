import C from '../common'
import { config } from '../settings'
export default function LibraryListPage() {
    const { routes, apiClient } = C.useAppContext()
    const { pushFocusLayer, popFocusLayer } = C.useFocusContext()
    const [focusCleared, setFocusCleared] = C.React.useState(false)

    C.React.useEffect(() => {
        if (!focusCleared) {
            pushFocusLayer("index")
            setFocusCleared(true)
            return () => {
                popFocusLayer()
            }
        }
    })

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
        <C.View>
            <C.SnowGrid focusStart focusKey="page-entry" items={libraryList} renderItem={(item) => {
                return <C.SnowTextButton
                    title={item.name}
                    onPress={routes.func(routes.seriesList, { libraryId: item.id })} />
            }} />
            <C.SnowText style={{
                position: 'absolute',
                right: 30,
                bottom: -250
            }}>{`v${config.clientVersion} - built ${config.clientBuildDate}`}</C.SnowText>
        </C.View>
    )
}
