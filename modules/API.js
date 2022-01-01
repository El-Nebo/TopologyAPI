var fs = require('fs');
const { stringify } = require('querystring');
var _Topology = require('./Topology.js');
var Topology = _Topology.Topology

/**
 * Topology API Class
 */
class API {

    /**
     * Coonstructor for API Class, setting up API topologies
     */
    constructor() {
        this.topologies = []
    }

    /**
     * function to read a topology from .json file and store it in memory
     * @param {string} FileName - file path of .json file
     * @returns {JSON Object} - topology read from file in javascript Object format
     */
    readJSON(FileName) {
        try {
            var file = fs.readFileSync(FileName);
            var Json = JSON.parse(file);
            var topology = new Topology(Json)
            if(this.getTopologybyID(topology['id']))
                this.deleteTopology(topology['id'])
            this.topologies.push(topology);
            return topology;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    /**
     * function to write a specific topology to a .json file
     * @param {string} TopologyID - ID for topology needed to be printed to .json file
     * @param {string} FileName - name for file to write topolgy in; if not given, "Topology_{TopologyID}" is set as file name
     * @returns {boolean} - success of the writing operation  
     */
    writeJSON(TopologyID, FileName = null) {
        let topology = this.getTopologybyID(TopologyID);
        if (topology == null) return false;
        try {
            if (FileName == null)
                FileName = `Topology_${TopologyID}.json`;
            fs.writeFileSync(FileName, JSON.stringify(topology, undefined, 4));
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * function to query which topologies are currently in memory
     * @returns {Array<Topology>} array of topologies in memory
     */
    queryTopologies() {
        return this.topologies;
    }

    /**
     * function to delete a specific topology from memory. 
     * function only detach the topology from this.topology array and javascript automatically clean the object from memory
     * @param {string} TopologyID - ID for topology to delete
     * @returns {boolean} - success of deletiong operation
     */
    deleteTopology(TopologyID) {
        this.topologies = this.topologies.filter(tp => tp['id'] != TopologyID)
        return true;
    }

    /**
     * function to query all devices related to a specific topology
     * @param {string} TopologyID - ID for topology to query its devices
     * @returns {Array<Component>} - array of Component Object which refers to devices connected to this topology 
     */
    queryDevices(TopologyID) {
        var topology = this.getTopologybyID(TopologyID);
        if (topology == null) return null;
        return topology.getDevices();
    }

    /**
     * function to query devices related to a specific topology which are connected to a specific node
     * @param {string} TopologyID - ID for topology to query its devices
     * @param {string} NetlistNodeID - ID for netlist node to get devices connected to it
     * @returns {Array<Component>} - array of Component Object which refers to devices connected to this topology and this netlist node
     */
    queryDevicesWithNetlistNode(TopologyID, NetlistNodeID) {
        var topoloyDevices = this.queryDevices(TopologyID)
        if (topoloyDevices == null) return null;
        var devicestoreturn = []
        for (var device of topoloyDevices) {
            var keys = Object.keys(device['netlist']);
            for (var key of keys)
                if (device['netlist'][key] == NetlistNodeID) {
                    devicestoreturn.push(device);
                    break;
                }
        }
        return devicestoreturn;
    }

    /**
     * function to return a topology by its ID
     * @param {string} TopologyID - ID for topology to return 
     * @returns {Topology} - Topology object with TopologyID
     */
    getTopologybyID(TopologyID) {
        var topology = this.topologies.filter(tp => tp['id'] == TopologyID);
        if (topology.length == 0) {
            return null;
        }
        return topology[0];
    }
}

module.exports = {
    API: API
}