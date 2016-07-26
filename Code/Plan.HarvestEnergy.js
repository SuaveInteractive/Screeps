// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

var worldState = require('WorldState');
var energyIncome = require('Utility.EnergyIncome');
var resourceAssigner = require('ResourceAssigner');

// ##### Object ######
function HarvestEnergy(room)
{
    Plan.Plan.call(this)
    
    this._Debugging = false
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
    
    var util = new energyIncome.UtilityEnergyIncoming()
    
    worldState.CreepInRoles.CREEP_HARVESTERS += 1
    
    result.push(util.Calculate(room, worldState))
    
    return result
}

HarvestEnergy.prototype.SerializedData = function()
{
    var data = Plan.Plan.prototype.SerializedData.call(this)
    
    data.SpawningCreepName = this._SpawningCreepName
    
    return data
}

HarvestEnergy.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._SpawningCreepName = data.SpawningCreepName
}

HarvestEnergy.prototype.Run = function(state)
{
	if (this._Debugging)
		console.log("Plan.HarvestEnergy -> run")
	
	var creepHarvester = null
	if (this._SpawningCreepName)
	    creepHarvester = Game.creeps[this._SpawningCreepName]
    
    var room = Game.rooms[this.GetPlanRoomName()]
		
	if (creepHarvester)
	{
	    if (creepHarvester.spawning)
        {
            if (this._Debugging)
                console.log("SPAWING CREEP")
        }
        else
        {
            var miningSiteId = resourceAssigner.GetAvailableMiningLocation(room, RESOURCE_ENERGY, creepHarvester.pos)
            creepHarvester.memory.role = 'harvester'
            creepHarvester.memory.harvestTargetId = miningSiteId
            
            resourceAssigner.AssignCreepToSite(room, creepHarvester, miningSiteId)
            
	        this.SetFinished(true)
        }
	}
	else
	{
	    // No creep so spawn one
	    var result = recruiter.SpawnCreep(Game.rooms[this.GetPlanRoomName()])
	    if (_.isString(result))
	    {
	        this._SpawningCreepName = result
            console.log("SPAWING NEW CREEP")
	    }
	    else
	    {
	        console.log("COULD NOT SPAWN CREEP [" + result + "]")    
	    }
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