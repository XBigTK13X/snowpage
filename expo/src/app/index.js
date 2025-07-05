import C from '../common'
export default function LandingPage() {
    const { session, routes, apiClient } = C.useAppContext()

    const [libraryList, setLibraryList] = C.React.useState(null)

    C.React.useEffect(() => {
        if (!libraryList && apiClient) {
            apiClient.getLibraryList().then((response) => {
                console.log({ response })
                setLibraryList(response)
            })
        }
    })

    if (!libraryList) {
        return <C.SnowText>Loading library list...</C.SnowText>
    }

    return (
        <C.FillView>
            <C.SnowGrid items={libraryList} renderItem={(item) => {
                return <C.SnowTextButton
                    title={item.name}
                    onPress={routes.func(routes.libraryDetails, { libraryId: item.id })} />
            }} />
        </C.FillView>
    )
}
