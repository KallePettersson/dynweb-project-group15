class ResultModel {
    /**
     * The data-structure needed to search results
     *
     * @param results A dictionary of cities or countries. Each value should probably contain id, name and coordinates.
     */
    constructor(results = []) {
        this.results = results
    }
}

export default ResultModel