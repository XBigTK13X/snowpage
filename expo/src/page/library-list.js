import C from '../common'
import { config } from '../settings'
export default function LibraryListPage() {
    const { navPush } = C.useSnowContext()
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
        <>
            <C.SnowGrid focusStart focusKey="page-entry" items={libraryList} renderItem={(item) => {
                return <C.SnowTextButton
                    title={item.name}
                    onPress={navPush(routes.seriesList, { libraryId: item.id }, true)} />
            }} />
            <C.SnowText style={{
                position: 'absolute',
                right: 30,
                bottom: -250
            }}>{`v${config.clientVersion} - built ${config.clientBuildDate}`}</C.SnowText>
        </>
    )
}
