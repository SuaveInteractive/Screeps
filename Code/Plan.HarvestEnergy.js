var utilityTypes = require('Utility.Types');

module.exports = {
	_Debugging: true,
	
	GetUtilitiesServed: function()
	{
	    var utilityServed = ['ENERGY_INCOME']
	    return utilityServed
	},
	
	GetId: function()
	{
	    return 'HARVEST_ENERGY'
	},
	
	GetFinisedResult: function()
	{
	    return  [{
	                UtilType: 'ENERGY_INCOME',
	                Value: 1
                }]
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