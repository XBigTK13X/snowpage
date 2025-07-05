import { router } from 'expo-router'

// DOCS router method https://docs.expo.dev/router/navigating-pages/#imperative-navigation

export var routes = {
    landing: '/',
    seriesList: '/seriesList',
    bookList: '/bookList',
    bookDetails: '/bookDetails',
    replace: (target, params) => {
        if (!params) {
            return router.replace(target)
        }
        router.replace({ pathname: target, params })
    },
    goto: (target, params) => {
        if (!params) {
            return router.push(target)
        }
        router.push({ pathname: target, params })
    },
}

routes.func = (target, params) => {
    return () => {
        routes.goto(target, params)
    }
}

routes.back = () => {
    router.back()
}

routes.funcBack = () => {
    return () => {
        routes.back()
    }
}

routes.reset = () => {
    // TODO This throws errors on Android
    // Try instead to pass in a navigator context
    // The action 'POP_TO_TOP' was not handled by any navigator
    /*
    navigation.reset({
            index: 0,
            routes: [{ name: 'login' }], // your stack screen name
        });
    */
    if (router.canDismiss()) {
        router.dismissAll()
    }
    router.replace(routes.signIn);
}

routes.gotoItem = (item) => {
    if (item.model_kind === 'movie') {
        routes.goto(routes.movieDetails, {
            shelfId: item.shelf.id,
            movieId: item.id
        })
    }
    else if (item.model_kind === 'show') {
        routes.goto(routes.seasonList, {
            shelfId: item.shelf.id,
            showId: item.id,
            showName: item.name
        })
    }
    else if (item.model_kind === 'show_season') {
        routes.goto(routes.episodeList, {
            shelfId: item.show.shelf.id,
            showId: item.show.id,
            seasonId: item.id,
            showName: item.show.name,
            seasonOrder: item.season_order_counter,
        })
    }
    else if (item.model_kind === 'show_episode') {
        routes.goto(routes.episodeDetails, {
            shelfId: item.season.show.shelf.id,
            showId: item.season.show.id,
            seasonId: item.season.id,
            episodeId: item.id,
            showName: item.season.show.name,
            seasonOrder: item.season.season_order_counter,
            episodeOrder: item.episode_order_counter
        })
    }
    else {
        console.log("Unhandled poster item")
        console.log({ item })
    }
}

export function QuietReactWarning() {
    return null
}

export default QuietReactWarning