var AIPlans = require('Plans');
var Utilities = require('Utilities');

var worldState = require('WorldState');

module.exports = {
	_Debugging: false,
	
    Calculate: function (room, world, plans, workTracker, recruiter)
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
            var utility = new Utilities.UtiliesDef[key]
            var result = utility.Calculate(room, world)
            
            needs[result.UtilType] = needs[result.UtilType] + result.Value
        }
        
        // Remove what we have incoming via other plans
        
        // TEMP - What the world state will look like after all the plans run
        var ws = new worldState.WorldState()
        ws.CalculateColonyState("Manix", workTracker, recruiter)
        
    	for (var i in plans)
		{
		    var plan = plans[i]
		    
		    var utilityServerd = plan.GetUtilitiesServed()
		    
		    for (var j in utilityServerd)
		    {
	            var utility = Utilities.UtiliesDef[utilityServerd[j]]
		        var result = plan.GetFinisedResult(room, ws)
		        
		        for (var k in result)
		        {
		            var util = result[k]
		            needs[util.UtilType] = Math.min((needs[util.UtilType] - util.Value).toFixed(2), 0.0)
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