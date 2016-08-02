if (!Memory.HiveMind)
{
    Memory.HiveMind = {}
    Memory.HiveMind.CurrentPlans = []
    
    Memory.HiveMind.TrackedWork = {}
}

var calculateNeeds = require('AI.CalculateNeeds');
var createPlans = require('AI.CreatePlans');
var evalPlans = require('AI.EvaluateCurrentPlans');
var executePlans = require('AI.ExecutePlans');
var prioritisePlans = require('AI.PrioritisePlans');
var selectPlans = require('AI.SelectPlans');
var AIPlans = require('Plans');

var worldState = require('WorldState');

var WorkTracker = require('WorkTracker')
var resouceAssigner = require('ResourceAssigner')

module.exports = {
    _Debugging: false,
    _Player: "Manix",
	 
    Run: function ()
    {
        console.log("\nHiveAgent - Run");
        
        var wt = new WorkTracker()
        wt.DeserializedData(Memory.HiveMind.TrackedWork)
        
        var ws = new worldState.WorldState()
        ws.CalculateColonyState(this._Player, wt)
        
        for (var roomName in Game.rooms)
        {
            var room = Game.rooms[roomName]
        
            wt.Run(room)
        
            resouceAssigner.UpdateCreeps(room)
            
            var currentPlans = this._DeserialiseCurrentPlans(room)
            
            // Test to see if any current plans should be removed
            currentPlans = evalPlans.Evaluate(currentPlans)
            
            // Calaculate the needs of the Colony based on the current plans
            var needs = calculateNeeds.Calculate(room, ws, currentPlans, wt)
            
            // Create new plans based on needs
            var newPlans = createPlans.Create(room, needs)
            
            // Prioritise the plans based of Hive Mind Personallity
            newPlans = prioritisePlans.Prioritise(newPlans)
            
            // Select new plans and add them to the current plans
            currentPlans = currentPlans.concat(selectPlans.Select(room, newPlans))
            
            // Execute the current plans
            executePlans.Execute(currentPlans, wt)

            this._SerialiseCurrentPlans(currentPlans)
        }
        
        Memory.HiveMind.TrackedWork = wt.SerializedData(Memory.HiveMind.TrackedWork)
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
    
    _DeserialiseCurrentPlans: function(room)
    {
        var plans = []
        
        Memory.HiveMind.CurrentPlans.forEach(function(item)
        {
            var plan = new AIPlans.AIPlans[item.PlanId](room)
            
            plan.DeserializedData(item.Data)
            
            plans.push(plan)
        });
        
        return plans
    }
};