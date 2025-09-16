class Config {
    constructor() {
        this.clientVersion = "1.2.0"
        this.clientBuildDate = "September 15, 2025"
        this.clientDevBuildNumber = 1

        this.booksPerRow = 5
    }
}

export const config = new Config()


export function QuietReactWarning() {
    return null
}

export default QuietReactWarning