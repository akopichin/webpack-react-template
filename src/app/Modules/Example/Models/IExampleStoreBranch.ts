/**
 * Here unrequired param to fit to IAppStore interface.
 * Because reducers of that component will be dynamically loaded
 * they wont be set once app is started.
 */
export interface IExampleStoreBranch {
    example?: IExampleStore
}

export interface IExampleStore {
    hello: string;
}
