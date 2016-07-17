var utilityTypes = require('Utility.Types');

module.exports = {
	_Debugging: false,
	
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
	 //   var results = {}
 //       results.CreepInRoles = {}
//        results.CreepInRoles.CREEP_HARVESTERS = 1

        //Utilities.UtiliesDef
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