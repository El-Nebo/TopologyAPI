var _Component = require('./Component.js')
var Component = _Component.Component
/**
 * Topology Class
 */
class Topology{
    /**
     * Constructor for creating a Topology Object 
     * @param {Object} jsonObject- JSON Object constructing the topology
     */
    constructor(jsonObject){
        try{
            this.id = jsonObject['id'];
            this.components = [];
            var JsonComponents = jsonObject['components'];
            for (var component of JsonComponents){
                this.components.push(new Component(component))
            }
        }       
        catch(e){
            console.log(e)
        }  
    }

    /**
     * function to return devices of current Topology
     * @returns {Array<Component>} - array of Component Object related to current topology
     */
    getDevices(){
        return this.components;
    }
}
module.exports = {
    Topology:Topology
}