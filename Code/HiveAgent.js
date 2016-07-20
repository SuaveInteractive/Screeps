
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
    
module.exports = {
    _Debugging: false,
    _Player: "Manix",
	 
    Run: function ()
    {
        console.log("HiveAgent - Run");
        
        var colonyState = this.CalculateColonyState()
                    
        for (var roomName in Game.rooms)
        {
            var room = Game.rooms[roomName]
            
            var currentPlans = this._DeserialiseCurrentPlans()
            
            // Test to see if any current plans should be removed
            currentPlans = evalPlans.Evaluate(currentPlans)
            
            // Calaculate the needs of the Colony based on the current plans
            var needs = calculateNeeds.Calculate(colonyState, currentPlans)
            
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
    
    _DebugPrint: function(object, tabs)
    {
        var this_cpy = this
        var tabs = "  "
        for (i=0; i<tabs; i++)
        {
            tabs = tabs + "  "
        }
        
        var str = ""
        _.forEach(object, function(val, name) 
        {
            if (typeof(val) == 'object')
            {
               var str2 = this_cpy._DebugPrint(val, tabs + 1)
               str += tabs + name + ": \n" + tabs + str2
            }
            else
                str += tabs + name + ": " + val + "\n" + tabs
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
                    EnergyAvailable: room.energyAvailable,
                    NumberMyCreeps: room.find(FIND_MY_CREEPS).length,
                    NumberEnemiesCreeps: room.find(FIND_HOSTILE_CREEPS).length
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
        
        results.CreepInRoles = {}
        results.CreepInRoles.CREEP_HARVESTERS = 0
        
        // Debugging
        if (this._Debugging == true)
        {
            console.log("----- World State -----")
            var this_cpy = this
            _.forEach(results, function(val, name) 
            {
                if (typeof(val) == 'object')
                {
                   var str = this_cpy._DebugPrint(val, 1)
                   console.log(" " + name + ": \n" + str)
                }
                else
                    console.log(" " + name + ": " + val)
            });
            console.log("-----------------------")
        }
        
        return results
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
            var data = item.GetSerializedData()

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
            
            plan.Load(item.Data)
            
            plans.push(plan)
        });
        
        return plans
    }
};