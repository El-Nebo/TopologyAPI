/**
 * Component Class - represent all types of devices
 */
class Component{
    /**
     * Constructor for creating a device Object 
     * @param {Object} - JSON Object constructing the device
     */
    constructor(JsonObject){
        var keys = Object.keys(JsonObject);
        for(var key of keys){
            this[key] = JsonObject[key]
        }
    }

}

module.exports = {
    Component: Component
}