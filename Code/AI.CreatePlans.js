var AIPlans = require('Plans');

module.exports = {
	_Debugging: false,
	
    Create: function (needs)
    {
		if (this._Debugging)
			console.log("AI.CreatePlans -> Create")
	
	    var this_cpy = this
	    var plans = []		
		_.forEach(needs, function(needValue, need) 
		{
		    if (needValue > 0)
		    {
		        var newPlans = this_cpy._GetPlansForUtility(need)
		        plans = plans.concat(newPlans)
		    }
		});
		
		if (this._Debugging == true)
		{
		    plans.forEach(function(item, index, array)
		    {
		        console.log("Plan: " + item)
		    });
		}
		
		return plans
    },
    
    _GetPlansForUtility: function(util)
    {
        var plans = []

    	for (var key in AIPlans.AIPlans)
		{
		    var plan = AIPlans.AIPlans[key]
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