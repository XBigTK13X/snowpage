import C from '../common'
import { config } from '../settings'
const snowuiPackageInfo = require('expo-snowui/package.json')

export default function LibraryListPage(props) {
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

    const entries = ['search', ...libraryList]

    return (
        <C.SnowView {...props}>
            <C.SnowGrid focusStart focusKey="page-entry" items={entries} renderItem={(item) => {
                if (item === 'search') {
                    return <C.SnowTextButton
                        title={'Search'}
                        onPress={navPush({ path: routes.search })} />
                }
                return <C.SnowTextButton
                    title={item.name}
                    onPress={navPush({ path: routes.seriesList, params: { libraryId: item.id } })} />
            }} />
            <C.SnowText style={{
                position: 'absolute',
                right: 30,
                bottom: -250
            }}>{`snowpage v${config.clientVersion}\nbuilt ${config.clientBuildDate}\nsnowui v${snowuiPackageInfo.version}`}</C.SnowText>
        </C.SnowView>
    )
}
