const API = require('../modules/API').API
const Topology = require('../modules/Topology').Topology
const fs = require('fs')

var app = new API();
var topology1Object = {
    "id": "top1",
    "components": [
        {
            "type": "resistor",
            "id": "res1",
            "resistance": {
                "default": 100,
                "min": 10,
                "max": 1000
            },
            "netlist": {
                "t1": "vdd",
                "t2": "n1"
            }
        },
        {
            "type": "nmos",
            "id": "m1",
            "m(l)": {
                "deafult": 1.5,
                "min": 1,
                "max": 2
            },
            "netlist": {
                "drain": "n1",
                "gate": "vin",
                "source": "vss"
            }
        }
    ]
}

var topology2Object = {
    "id": "top2",
    "components": [
        {
            "type": "capacitor",
            "id": "cap1",
            "capacitance": {
                "default": 150,
                "min": 50,
                "max": 3000
            },
            "netlist": {
                "t1": "vdd",
                "t2": "n3"
            }
        },
        {
            "type": "pmos",
            "id": "m2",
            "m(l)": {
                "deafult": 1.5,
                "min": 1,
                "max": 2
            },
            "netlist": {
                "drain": "n3",
                "gate": "vin",
                "source": "vss"
            }
        }
    ]
}

//ReadJson
test('Read NonValid JSON File', () =>{
    expect(app.readJSON('aaa.txt')).toBe(null)
})

test('Read Valid JSON File', () =>{
    expect(app.readJSON('topology.json') != null)
})

test('Read Valid Json File Again',() =>{
    expect(app.readJSON('topology2.json') != null)
})

//Query Topologies
test('Query Topologies - checking number of topologies',()=>{
    expect(app.queryTopologies().length).toBe(2)
})

test('Query Topologies - checking topology', () => {
    expect(JSON.stringify(app.queryTopologies()[0])).toBe(JSON.stringify(topology1Object))
})

var topology1 = app.readJSON('topology.json');
var topology2 = app.readJSON('topology2.json');

//WriteJSON
test('checking if WriteJson done successfully', () => {
    expect(app.writeJSON(topology1['id'],'test_top1.json')).toBe(true)
})

test('checking if WriteJson writes valid information', () => {
    expect(JSON.stringify(topology1)).toBe(JSON.stringify(topology1Object))
})

//Query Devices
test('Query Devices returns same length', () => {
    expect(app.queryDevices(topology1['id']).length).toBe(2)
})

var Device0 = {
    "type": "resistor",
        "id": "res1",
            "resistance": {
        "default": 100,
            "min": 10,
                "max": 1000
    },
    "netlist": {
        "t1": "vdd",
            "t2": "n1"
    }
}

var Device1 = {
    "type": "pmos",
    "id": "m2",
    "m(l)": {
        "deafult": 1.5,
        "min": 1,
        "max": 2
    },
    "netlist": {
        "drain": "n3",
        "gate": "vin",
        "source": "vss"
    }
}

test('Query Devices returns right devices', () => {
    expect(JSON.stringify(app.queryDevices(topology1['id'])[0])).toBe(JSON.stringify(Device0))
})

test('Query Devices returns right devices', () => {
    expect(JSON.stringify(app.queryDevices(topology2['id'])[1])).toBe(JSON.stringify(Device1))
})


//Query Devices with Netlist Node

test('Query Devices with Netlist Node returns same length', () => {
    expect(app.queryDevicesWithNetlistNode(topology1['id'], 'n1').length).toBe(2)
})

test('Query Devices with Netlist Node returns right devices', () => {
    expect(JSON.stringify(app.queryDevicesWithNetlistNode(topology1['id'], 'vdd')[0])).toBe(JSON.stringify(Device0))
})

test('Query Devices with Netlist Node returns same length', () => {
    expect(app.queryDevicesWithNetlistNode(topology1['id'], 'n3').length).toBe(0)
})

test('Query Devices with Netlist Node returns same length', () => {
    expect(app.queryDevicesWithNetlistNode(topology2['id'], 'n3').length).toBe(2)
})



//Delete Topology
test('Delete Topology is done successfully', () => {
    expect(app.deleteTopology(topology1['id'])).toBe(true)
})


test('Delete Topology removes topology', () => {
    expect(app.queryTopologies().length).toBe(1)
})


