// ##### Requires ######
var Recruiter = require('Recruiter');
var Plan = require('Plan');

var worldState = require('WorldState');
var energyIncome = require('Utility.EnergyIncome');
var resourceAssigner = require('ResourceAssigner');

// ##### Object ######
function HarvestEnergy(room)
{
    Plan.Plan.call(this)
    
    this._Debugging = true
    
    
    this._NumberOfLaborersSpawned = 0
    this._NumberOfLaborersToSpawn = 1
}

HarvestEnergy.prototype = Object.create(Plan.Plan.prototype)

HarvestEnergy.prototype.GetUtilitiesServed = function()
{
    var utilityServed = ['ENERGY_INCOME']
    return utilityServed
}

HarvestEnergy.prototype.GetId = function()
{
    return 'HARVEST_ENERGY'
}

HarvestEnergy.prototype.GetFinisedResult = function(room, worldState)
{
    var result = []
    
    this._NumberOfLaborersToSpawn = 1
    
    var util = new energyIncome.UtilityEnergyIncoming()
    
    worldState.CreepInRoles.CREEP_HARVESTERS += this._NumberOfLaborersToSpawn
    
    result.push(util.Calculate(room, worldState))
    
    return result
}

HarvestEnergy.prototype.SerializedData = function()
{
    var data = Plan.Plan.prototype.SerializedData.call(this)
    
    data.WorkId = this._WorkId
    data.NumberOfLaborersSpawned = this._NumberOfLaborersSpawned
    data.NumberOfLaborersToSpawn = this._NumberOfLaborersToSpawn
    data.SpawningCreepName = this._SpawningCreepName
    
    return data
}

HarvestEnergy.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._WorkId = data.WorkId
    this._NumberOfLaborersSpawned = data.NumberOfLaborersSpawned
    this._NumberOfLaborersToSpawn = data.NumberOfLaborersToSpawn
    this._SpawningCreepName = data.SpawningCreepName
}

HarvestEnergy.prototype.Run = function(workTracker, recruiter)
{
	if (this._Debugging)
		console.log("Plan.HarvestEnergy -> run")
	
	var creepHarvester = null
	if (this._SpawningCreepName)
	    creepHarvester = Game.creeps[this._SpawningCreepName]
    
    var room = Game.rooms[this.GetPlanRoomName()]
    
    if (this._WorkId == null)
    {
        var spawns = Memory.ParsedRooms[room].Spawns
        
        for (var spawn in spawns)
        {
            var spawnPos = spawns[spawn].pos

            var harvestingSite = resourceAssigner.GetAvailableMiningSite(room, RESOURCE_ENERGY, new RoomPosition(spawnPos.x, spawnPos.y, spawnPos.roomName), workTracker)
        
            this._WorkId = harvestingSite.site.WorkId
        }
    }
    
    if (creepHarvester != null)
    {
        if (creepHarvester.spawning)
        {
            if (this._Debugging)
                console.log(" HarvestEnergy.prototype.Run SPAWING CREEP")
        }
        else
        {
            if (this._Debugging)
                console.log(" HarvestEnergy.prototype.Run SPAWNED")
            
            workTracker.AssignCreepToWorkId(room, this._WorkId, {CreepName: this._SpawningCreepName})
            
            this._NumberOfLaborersSpawned++
            this._SpawningCreepName = ""    
        }
    }
    
    if (this._NumberOfLaborersSpawned < this._NumberOfLaborersToSpawn)
    {
        var result = Recruiter.SpawnCreep(room)
	    if (_.isString(result))
	    {
	        this._SpawningCreepName = result
	        
	        if (this._Debugging)
                console.log(" HarvestEnergy.prototype.Run NEW CREEP")
	    }
	    else
	    {
	        console.log("COULD NOT SPAWN CREEP [" + result + "]")    
	    }
    }
    else
    {
        if (this._Debugging)
            console.log(" HarvestEnergy.prototype.Run PLAN FINISHED")
            
        this.SetFinished(true)
    }
}

HarvestEnergy.prototype.toString = function()
{
    return "HarvestEnergy"
}

// ##### Exports ######
module.exports = {
	HarvestEnergy: HarvestEnergy,
};