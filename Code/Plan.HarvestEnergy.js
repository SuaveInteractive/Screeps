// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

// ##### Object ######
HarvestEnergy._Debugging = true
HarvestEnergy._super_ = Object.create(Plan.Plan)

function HarvestEnergy()
{

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

HarvestEnergy.prototype.GetSerializedData = function()
{
    var data = Plan.Plan.prototype.GetSerializedData.call(this)
    return data
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

HarvestEnergy.prototype.toString = function()
{
    return "HarvestEnergy"
}


// ##### Exports ######
module.exports = {
	HarvestEnergy: HarvestEnergy,
};