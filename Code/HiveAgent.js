
if (!Memory.HiveMind)
{
    Memory.HiveMind = {}
    Memory.HiveMind.CurrentPlans = []
}

var calculateNeeds = require('AI.CalculateNeeds');
var createPlans = require('AI.CreatePlans');
var evalPlans = require('AI.EvaluateCurrentPlans');
var executePlans = require('AI.ExecutePlans');
var prioritisePlans = require('AI.PrioritisePlans');
var selectPlans = require('AI.SelectPlans');
var AIPlans = require('Plans');

var worldState = require('WorldState');
    
module.exports = {
    _Debugging: true,
    _Player: "Manix",
	 
    Run: function ()
    {
        console.log("HiveAgent - Run");
        
        var ws = new worldState.WorldState()
        ws.CalculateColonyState(this._Player)

        for (var roomName in Game.rooms)
        {
            var room = Game.rooms[roomName]
            
            var currentPlans = this._DeserialiseCurrentPlans()
            
            // Test to see if any current plans should be removed
            currentPlans = evalPlans.Evaluate(currentPlans)
            
            // Calaculate the needs of the Colony based on the current plans
            var needs = calculateNeeds.Calculate(room, ws, currentPlans)
            
            // Create new plans based on needs
            var newPlans = createPlans.Create(needs)
            
            // Prioritise the plans based of Hive Mind Personallity
            newPlans = prioritisePlans.Prioritise(newPlans)
            
            // Select new plans and add them to the current plans
            currentPlans = currentPlans.concat(selectPlans.Select(room, newPlans))
            
            // Execute the current plans
            executePlans.Execute(currentPlans)
            
            this._SerialiseCurrentPlans(currentPlans)
        }
    },
    
    _SerialiseCurrentPlans: function(currentPlans)
    {
        if (this._Debugging)
        {   
            var index = 1;
            currentPlans.forEach(function(item)
            {
                console.log("CurrentPlan[" + index + "]: " + item);
                index += 1;
            });
        }
        
        Memory.HiveMind.CurrentPlans = []
        
        currentPlans.forEach(function(item)
        {
            var data = item.SerializedData()

            var savedPlan = 
            {
                PlanId: item.GetId(),
                Data: data
            }
            Memory.HiveMind.CurrentPlans.push(savedPlan)    
        });

    },
    
    _DeserialiseCurrentPlans: function()
    {
        var plans = []
        
        Memory.HiveMind.CurrentPlans.forEach(function(item)
        {
            var plan = new AIPlans.AIPlans[item.PlanId]
            
            plan.DeserializedData(item.Data)
            
            plans.push(plan)
        });
        
        return plans
    }
};