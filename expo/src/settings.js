import { Platform } from 'react-native'

class Config {
    constructor() {
        this.clientVersion = "1.3.0"
        this.clientBuildDate = "October 17, 2025"
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