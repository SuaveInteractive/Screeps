var AIPlans = require('Plans');

var roomHelper = require('RoomHelper');

module.exports = {
    _Debugging: false,
    
    Execute: function (plans, wt)
    {
        var debugging = this._Debugging
		if (debugging)
			console.log("AI.ExecutePlans -> Execute")
			
    	for (var i in plans)
		{
		    var plan = plans[i]

    		if (debugging)
			    console.log("  Plan Id: " + plan.GetId())
			
		    plan.Run(wt)
		}
    }
};