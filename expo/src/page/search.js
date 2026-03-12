import C from '../common'

export default function SearchPage() {
    const { apiClient, routes } = C.useAppContext()
    const { navPush, currentRoute } = C.useSnowContext()

    const [queryText, setQueryText] = C.React.useState('')
    const queryTextRef = C.React.useRef(queryText)
    const [searchResults, setSearchResults] = C.React.useState(null)
    const [resultKey, setResultKey] = C.React.useState(null)
    const [loading, setLoading] = C.React.useState(false)

    C.React.useEffect(() => {
        let query = currentRoute?.routeParams?.queryText
        if (query) {
            setQueryText(query)
            queryTextRef.current = query
            if (query?.length > 1) {
                setLoading(true)
                apiClient.search(query).then(response => {
                    if (queryTextRef.current === query) {
                        setSearchResults(response)
                        setResultKey(`query-${query}`)
                    }
                    setLoading(false)
                })
            }
        } else {
            setQueryText('')
            queryTextRef.current = ''
        }

    }, [currentRoute])

    const executeQuery = (input) => {
        navPush({
            params: {
                ...currentRoute?.routeParams,
                queryText: input ?? queryText
            },
            func: false
        })
    }

    let resultsTabs = null
    if (searchResults) {
        if (!searchResults.length) {
            resultsTabs = <C.SnowText>No results found for [{queryText}].</C.SnowText>
        }
        else {
            let headers = searchResults.map(searchResult => {
                return `${searchResult.name} [${searchResult.items.length}]`
            })
            resultsTabs = (
                <C.SnowTabs yy={2} key={resultKey} focusKey="search-results" headers={headers}>
                    {searchResults.map((searchResult, resultIndex) => {
                        if (searchResult.kind === 'book') {
                            return <C.SnowGrid items={searchResult.items} renderItem={(item) => {
                                const thumbnail = apiClient.getBookThumbnail(item.id)
                                let title = item.name
                                const dashIndex = title.indexOf(' - ')
                                if (dashIndex !== -1) {
                                    title = item.name.substring(0, dashIndex)
                                }
                                return <C.SnowImageButton
                                    title={title}
                                    imageSource={thumbnail}
                                    onPress={navPush({ path: routes.bookDetails, params: { bookId: item.id } })} />
                            }} />
                        }
                        if (searchResult.kind === 'series') {
                            return <C.SnowGrid items={searchResult.items} renderItem={(item) => {
                                const thumbnail = apiClient.getSeriesThumbnail(item.id)
                                return <C.SnowImageButton
                                    title={item.name}
                                    imageSource={thumbnail}
                                    onPress={navPush({ path: routes.bookList, params: { seriesId: item.id, seriesName: item.name } })} />
                            }} />
                        }
                    })}
                </C.SnowTabs>
            )
        }
    }

    return (
        <C.SnowView>
            <C.SnowGrid
                assignFocus={false}
                itemsPerRow={1}>
                <C.SnowLabel>Enter a search query</C.SnowLabel>
                <C.SnowInput
                    focusStart
                    yy={1}
                    value={queryText}
                    onValueChange={setQueryText}
                    onSubmit={executeQuery}
                    onDebounce={setQueryText} />
                {loading && !searchResults ? <C.SnowText center>Searching for [{queryText}]...</C.SnowText> : null}
                {resultsTabs}
            </C.SnowGrid>
        </C.SnowView>

    )
}
