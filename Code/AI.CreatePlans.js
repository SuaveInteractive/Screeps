var AIPlans = require('Plans');

module.exports = {
	_Debugging: false,
	
    Create: function (needs)
    {
		if (this._Debugging)
			console.log("AI.CreatePlans -> Create")
	
	    var plans = []		
		for(var need in needs) 
		{
		    var needValue = needs[need]

		    if (needValue > 0)
		    {
		        var newPlans = this._GetPlansForUtility(need)
		        plans = plans.concat(newPlans)
		    }
		}
		
		if (this._Debugging == true)
		{
		    console.log("New plans:")
		    plans.forEach(function(item, index, array)
		    {
		        console.log("  Plan: " + item)
		    });
		}
		
		return plans
    },
    
    _GetPlansForUtility: function(util)
    {
        var plans = []

    	for (var key in AIPlans.AIPlans)
		{
		    var plan = new AIPlans.AIPlans[key]

		    var utilitiesServed = plan.GetUtilitiesServed()
		    
		    _.forEach(utilitiesServed, function(util) 
		    {
		        if (utilitiesServed == util)
		        {
		            plans.push(plan)
		        }
		    });
		    
		}
        
        return plans
    }
};