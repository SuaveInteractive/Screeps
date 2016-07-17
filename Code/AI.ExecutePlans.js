var plans = require('Plans');

module.exports = {
    _Debugging: true,
    
    Execute: function (plans)
    {
		if (this._Debugging)
			console.log("AI.ExecutePlans -> Select")
			
		plans.forEach(function(plan, index, array)
		{
		    plans[plan.GetId()].Run()
		});
    }
};