import { Platform } from 'react-native'

class Config {
    constructor() {
        this.clientVersion = "1.2.4"
        this.clientBuildDate = "September 30, 2025"
        this.clientDevBuildNumber = 1

        this.booksPerRow = Platform.OS === 'web' ? 4 : 5
        this.booksPerPage = Platform.OS === 'web' ? 20 : 25
    }
}

export const config = new Config()


export function QuietReactWarning() {
    return null
}

export default QuietReactWarning