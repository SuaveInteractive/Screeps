module.exports = {
	_Debugging: false,
    
    Select: function (plans)
    {
		if (this._Debugging)
			console.log("AI.SelectPlan -> Select")
		
		var selectedPlans = []
		
		plans.forEach(function(item, index, array)
		{
		    selectedPlans.push(item)
		});
		
        return selectedPlans;
    }
};