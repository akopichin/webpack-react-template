/**
 * Sample's api interface
 */
export interface ISampleApi {
    /**
     * Loads items list.
     *
     * @returns Promise<IItem[]> List of items.
     */
    // @TODO replace with IItem[]
    loadList(): Promise<any>;
}
