var AIPlans = require('Plans');
var Utilities = require('Utilities');

module.exports = {
	_Debugging: true,
	
    Calculate: function (world, plans)
    {
		if (this._Debugging)
			console.log("AI.CalculateNeeds -> Calculate")
		
        var needs = {}
        for(var key in Utilities.UtiliesDef) 
        {
            needs[key] = 0;
        };
        
        // Calculate what we need
        for(var key in Utilities.UtiliesDef) 
        {
            var utility = Utilities.UtiliesDef[key]
            var result = utility.Calculate(world)
            needs[result.UtilType] = needs[result.UtilType] + result.Value
        }
        
        // Remove what we have incoming via other plans
    	for (var i in plans)
		{
		    var plan = plans[i]
		    var utilityServerd = plan.GetUtilitiesServed()
		    
		    for (var j in utilityServerd)
		    {
	            var utility = Utilities.UtiliesDef[utilityServerd[j]]
		        var result = plan.GetFinisedResult()
		        
		        for (var k in result)
		        {
		            var util = result[k]
		            needs[util.UtilType] = needs[util.UtilType] - util.Value
		        }
		    }
		}

        if (this._Debugging)
        {
            console.log("Utility Needs:")
            for(var key in Utilities.UtiliesDef) 
            {
                var utility = Utilities.UtiliesDef[key]
                console.log("  " + key + ": " + needs[key]);
            };
        }
		
		return needs
    }
};