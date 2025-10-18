import { routes } from './routes'

import BookDetailsPage from './page/book-details'
import BookListPage from './page/book-list'
import LibraryListPage from './page/library-list'
import SeriesListPage from './page/series-list'

export var pages = {
    [routes.bookDetails]: BookDetailsPage,
    [routes.bookList]: BookListPage,
    [routes.libraryList]: LibraryListPage,
    [routes.seriesList]: SeriesListPage
}

export function QuietReactWarning() {
    return null
}

export default QuietReactWarning