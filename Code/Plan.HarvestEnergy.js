// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

// ##### Object ######

function HarvestEnergy()
{
    this._Debugging = true
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

HarvestEnergy.prototype.GetFinisedResult = function()
{
    return  [{
                UtilType: 'ENERGY_INCOME',
                Value: 1
            }]
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
		
	if (creepHarvester)
	{
	    if (creepHarvester.spawning)
        {
            if (this._Debugging)
                console.log("SPAWING CREEP")
        }
        else
        {
            creepHarvester.memory.role = 'harvester'
            
	        if (this._Debugging)
	            console.log("CAN DO STUFF WITH THE CREEP NOW")
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