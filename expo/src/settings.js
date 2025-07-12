class Config {
    constructor() {
        this.clientVersion = "1.0.0"
        this.clientBuildDate = "July 12, 2025"
        this.clientDevBuildNumber = 1
    }
}

export const config = new Config()


export function QuietReactWarning() {
    return null
}

export default QuietReactWarning