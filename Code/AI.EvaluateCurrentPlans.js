module.exports = {
    _Debugging: false,
    
    Evaluate: function (plans)
    {
    	for (var i in plans)
		{
		    var plan = plans[i]
		    
		    if (plan.GetFinished())
		    {
		        var index = plans.indexOf(plan)
		        
		        console.log("************* PLAN FINISHED: " + index)
		     
		        plans.splice(index, 1)
		    }
		}
		
        return plans
    }
};