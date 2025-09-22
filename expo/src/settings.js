class Config {
    constructor() {
        this.clientVersion = "1.2.3"
        this.clientBuildDate = "September 22, 2025"
        this.clientDevBuildNumber = 1

        this.booksPerRow = 5
    }
}

export const config = new Config()


export function QuietReactWarning() {
    return null
}

export default QuietReactWarning