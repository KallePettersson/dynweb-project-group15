class ResultModel{
    /**
     * The data-structure needed to search results
     *
     * @param entities A list of cities or countries. Each entity should probably contain id, name and coordinates.
     * @param values The value of the entity, e.g. healthcare, pollution, ...
     */
    constructor( entities = [], values = []) {
        this.entities = entities
        this.values = values
    }



}