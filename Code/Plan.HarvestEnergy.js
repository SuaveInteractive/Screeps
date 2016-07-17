var plansId = require('PlansId');
var utilityTypes = require('Utility.Types');

module.exports = {
	_Debugging: true,
	
	GetUtilitiesServed: function()
	{
	    var utilityServed = [utilityTypes.UTILITY_ENERGY_INCOMING]
	    return utilityServed
	},
	
	GetId: function()
	{
	    return plansId.PLAN_HARVEST_ENERGY
	},
	
	GetSerializedData: function()
	{
	    return {}
	},
	
	Run: function()
	{
		if (this._Debugging)
			console.log("Plan.HarvestEnergy -> run")
	}
	
};