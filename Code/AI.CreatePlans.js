var AIPlans = require('Plans');

module.exports = {
	_Debugging: true,
	
    Create: function (room, needs)
    {
		if (this._Debugging)
			console.log("AI.CreatePlans -> Create")
	
	    var plans = []		
		for(var need in needs) 
		{
		    var needValue = needs[need]

		    if (this._Debugging)
			    console.log("  need: " + need + ", needValue: " + needValue)

		    if (needValue > 0.0001)
		    {
		        var newPlans = this._GetPlansForUtility(room, need)
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
    
    _GetPlansForUtility: function(room, neededUtil)
    {
        var plans = []

    	for (var key in AIPlans.AIPlans)
		{
		    var plan = new AIPlans.AIPlans[key](room)
		    
		    var utilitiesServed = plan.GetUtilitiesServed()
		    
		    _.forEach(utilitiesServed, function(util) 
		    {
		        if (neededUtil == util)
		        {
		            plans.push(plan)
		        }
		    });
		    
		}
        
        return plans
    }
};