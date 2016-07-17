var AIPlans = require('Plans');

module.exports = {
    _Debugging: true,
    
    Execute: function (plans)
    {
        var debugging = this._Debugging
		if (debugging)
			console.log("AI.ExecutePlans -> Execute")
			
    	for (var key in AIPlans.AIPlans)
		{
		    var plan = AIPlans.AIPlans[key]
		    if (plan)
		    {
        		if (debugging)
    			    console.log("  Plan Id: " + plan.GetId())
    			    
    		    AIPlans.AIPlans[plan.GetId()].Run()
		    }
		    else
		    {
		        console.log ("### WARNING, plan [" + key + "] not found ###")
		    }
		}
    }
};