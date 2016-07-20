module.exports = {
	_Debugging: false,
    
    Select: function (room, plans)
    {
		if (this._Debugging)
			console.log("AI.SelectPlan -> Select")
		
		var selectedPlans = []
		
		plans.forEach(function(plan, index, array)
		{
		    plan.SetPlanRoomName(room.name)
		    
		    selectedPlans.push(plan)
		});
		
        return selectedPlans;
    }
};