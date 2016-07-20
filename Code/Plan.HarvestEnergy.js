// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

// ##### Object ######
//var HarvestEnergy = Object.create(Plan.Plan)

HarvestEnergy._Debugging = true

function HarvestEnergy()
{
}

HarvestEnergy.prototype = Object.create(Plan.Plan)

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

HarvestEnergy.prototype.GetSerializedData = function()
{
    console.log("HarvestEnergy.GetSerializedData")
   // return Plan.GetSerializedData(this)
}

HarvestEnergy.prototype.Run = function(state)
{
	if (this._Debugging)
		console.log("Plan.HarvestEnergy -> run")
		
	if (this._creepHarvester)
	{
	}
	else
	{
	    console.log("  Spawn Creep")
	    // No creep so spawn one
	    recruiter.SpawnCreep(Game.rooms[this.GetPlanRoomName()])
	}
}

// ##### Exports ######
module.exports = {
	HarvestEnergy: HarvestEnergy,
};