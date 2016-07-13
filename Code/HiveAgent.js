
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

    
module.exports = {
    _Debugging: true,
    _Player: "Manix",
	 
    Run: function ()
    {
        console.log("HiveAgent - Run");
        var colonyState = this.CalculateColonyState()
        
        var currentPlans = Memory.HiveMind.CurrentPlans
        
        // Test to see if any current plans should be removed
        currentPlans = evalPlans.Evaluate(currentPlans)
        
        // Calaculate the needs of the Colony based on the current plans
        var needs = calculateNeeds.Calculate(colonyState, currentPlans)
        
        // Create new plans based on needs
        var newPlans = createPlans.Create(needs)
        
        // Prioritise the plans based of Hive Mind Personallity
        newPlans = prioritisePlans.Prioritise(newPlans)
        
        // Select new plans and add them to the current plans
        currentPlans.concat(selectPlans.Select(newPlans))
        
        // Execute the current plans
        executePlans.Execute(currentPlans)
    },
    
    _DebugPrint: function(object)
    {
        var this_cpy = this
         
        var str = ""
        _.forEach(object, function(val, name) 
        {
            if (typeof(val) == 'object')
            {
               var str2 = this_cpy._DebugPrint(val)
               str += " " + name + ": \n" + str2
            }
            else
                str = " " + name + ": " + val
        });
        
        return str
    },
	 	 
    CalculateColonyState: function()
    {
        var results = {}
        
        // World
        results.TotalEnergyAvailable = 0
        
        // Rooms
        results.MaximumRoomsOwned = Game.gcl.level
        
        results.Rooms = {}
        
        results.RoomsOwned = 0
        var playerName = this._Player
        _.forEach(Game.rooms, function(room) 
        {
            if (room.controller.owner.username == playerName)
            {
                results.RoomsOwned += 1
                
                results.TotalEnergyAvailable += room.energyAvailable
                
                results.Rooms[room] = 
                {
                    EnergyAvailable: room.energyAvailable
                }
            }
        });
         
        // Creeps
        results.NumberOfCreeps = 0
        for(var i in Game.creeps) 
        {
            var creep = Game.creeps[i]
            results.NumberOfCreeps += 1
        }
        
		 
		 
        // Debugging
        if (this._Debugging == true)
        {
            var this_cpy = this
            _.forEach(results, function(val, name) 
            {
                if (typeof(val) == 'object')
                {
                   var str = this_cpy._DebugPrint(val)
                   console.log(" " + name + ": \n" + str)
                }
                else
                    console.log(" " + name + ": " + val)
            });
        }
        
        return results
    }
    
};