import axios from 'axios'

export class ApiClient {
    constructor(details) {
        this.apiKey = '73a67b73c591473588ffdb40f13d8a50'
        this.webApiUrl = 'http://beast.9914.us:9090/api/v1'
        this.onApiError = details.onApiError
        this.apiErrorSent = false
        let self = this

        this.getPageImageSource = this.getPageImageSource.bind(this)

        this.httpClient = axios.create({
            baseURL: this.webApiUrl,
            headers: {
                'X-API-Key': this.apiKey
            }
        })

        this.handleError = (err) => {
            console.log(err)
            if (err) {
                if (err.code && err.code === 'ERR_NETWORK') {
                    if (!self.apiErrorSent) {
                        self.onApiError(err)
                    }
                    self.apiErrorSent = true
                }
            }
        }

        this.get = async (url, params) => {
            let queryParams = null
            if (params) {
                queryParams = { params: params }
            }
            return this.httpClient
                .get(url, queryParams)
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    this.handleError(err)
                })
        }

        this.post = async (url, payload) => {
            return this.httpClient
                .post(url, payload)
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    this.handleError(err)
                })
        }

        this.delete = async (url) => {
            return this.httpClient
                .delete(url)
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    this.handleError(err)
                })
        }
    }

    isAuthenticated() {
        return true
    }

    getLibraryList() {
        return this.get("/libraries")
    }

    getSeriesList(libraryId) {
        const payload = {
            "condition": {
                "allOf": [{
                    "libraryId": {
                        "operator": "is",
                        "value": libraryId
                    }
                }]
            }
        }
        return this.post(`/series/list`, payload)
    }

    getBookList(seriesId) {
        const payload = {
            "condition": {
                "allOf": [{
                    "seriesId": {
                        "operator": "is",
                        "value": seriesId
                    }
                }]
            }
        }
        return this.post(`/books/list`, payload)
    }

    getPageList(bookId) {
        return this.get(`books/${bookId}/pages`)
    }

    getPageImageSource(bookId, pageNumber) {
        return {
            uri: `${this.webApiUrl}/books/${bookId}/pages/${pageNumber}`,
            method: 'GET',
            headers: {
                'X-API-Key': this.apiKey
            }
        }
    }

    debug() {
        console.log({ webApiUrl: this.webApiUrl, apiKey: this.apiKey })
    }
}

export default ApiClient