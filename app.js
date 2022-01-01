const _API = require('./modules/API')
const API = _API.API

function Print(title, JsonObject) {
    if(title) console.log(title);
    console.log(JSON.stringify(JsonObject,undefined,4));
    console.log('--------------------------------------------')
} 
let app = new API();
var topology1 = app.readJSON('topology.json');
var topology2 = app.readJSON('topology2.json');
Print('Query Topologies', app.queryTopologies())
app.writeJSON(topology1['id']);
app.writeJSON(topology2['id']);
Print('Topology1 Devices', app.queryDevices(topology1['id']));
Print('Topology2 Devices', app.queryDevices(topology2['id']));
Print('Topology1 Devices connected to vdd', app.queryDevicesWithNetlistNode(topology1['id'], 'vdd'));
Print('Topology1 Devices connected to n1', app.queryDevicesWithNetlistNode(topology1['id'], 'n1'));
Print('Topology1 Devices connected to n3 -> should be none', app.queryDevicesWithNetlistNode(topology1['id'], 'n3'));

Print('Topology2 Devices connected to vdd', app.queryDevicesWithNetlistNode(topology2['id'], 'vdd'));
Print('Topology2 Devices connected to n3', app.queryDevicesWithNetlistNode(topology2['id'], 'n3'));

app.deleteTopology(topology1['id'])
Print('Query Topologies', app.queryTopologies())
