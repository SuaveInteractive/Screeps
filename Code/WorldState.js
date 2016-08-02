 // ##### Object ######
function WorldState()
{
    // World
    this.TotalEnergyAvailable = 0
    
    // Rooms
    this.MaximumRoomsOwned = Game.gcl.level
    this.Rooms = {}
    this.RoomsOwned = 0

    // Creeps
    this.NumberOfCreeps = 0
    this.NumberOfCreepsSpawing = 0
    this.CreepInRoles = {}
    this.CreepInRoles.CREEP_HARVESTERS = 0
}

WorldState.prototype.CalculateColonyState = function(playerName, workTracker)
{
    // World
    this.TotalEnergyAvailable = 0
    
    // Rooms
    for (var i in Game.rooms)
    {
        var room = Game.rooms[i]
        if (room.controller.owner.username == playerName)
        {
            this.RoomsOwned += 1
            
            this.TotalEnergyAvailable += room.energyAvailable
            
            var availableStructures = {}
            
            for (var i in CONTROLLER_STRUCTURES)
            {
                var availableArray = CONTROLLER_STRUCTURES[i]
                var alreadyPlace = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: i }
                });
                availableStructures[i] = availableArray[room.controller.level] - alreadyPlace.length
            }
            
            this.Rooms[room] = 
            {
                RoomControllerLevel: room.controller.level,
                EnergyAvailable: room.energyAvailable,
                NumberMyCreeps: room.find(FIND_MY_CREEPS).length,
                NumberEnemiesCreeps: room.find(FIND_HOSTILE_CREEPS).length,
                AvailableStructures: availableStructures,
            }
        }
    }
     
    // Creeps
    for(var i in Game.creeps) 
    {
        var creep = Game.creeps[i]
        if (creep.spawning)
            this.NumberOfCreepsSpawing += 1
        else
            this.NumberOfCreeps += 1
    }
    
    console.log(" workTracker: " + workTracker)
    
    for (var workRoom in workTracker._Work)
    {
        console.log(" workRoom: " + workRoom) 
    
        for (var i in workTracker._Work[workRoom])
        {
            var work = workTracker._Work[workRoom][i]
            console.log("  work: " + work)     
            
            var assignedCreeps = work.GetAssignCreeps()
            
            var workType = work.GetWorkType() 
            if (workType == "HarvestSource")
                this.CreepInRoles.CREEP_HARVESTERS += assignedCreeps.length
            else if (workType == "BuildStructure")
                this.CreepInRoles.CREEP_BUILDERS += assignedCreeps.length
        }
    }
}

WorldState.prototype.toString = function()
{
    var str = "\n"
    str +=  "----- World State -----\n"

    var this_cpy = this
    _.forEach(this, function(val, key)
    {
        if (typeof(val) == "object")
            str += " " + key + ":\n" + this_cpy._GetStringOfObject(val, 1)
        else
            str += " " + key + ": " + val + "\n"
    });

    str += "-----------------------\n"
    
    return str
}

WorldState.prototype._GetStringOfObject = function(obj, tabs)
{
    var strTabs = " "
    for (var i = 0; i < tabs; i++)
        strTabs += "  "
    
    var str = ""
    for (var key in obj)
    {
        if (typeof(obj[key]) == "object")
            str += strTabs + key + ":\n" + this._GetStringOfObject(obj[key], tabs + 1)
        else
            str += strTabs + key + ": " + obj[key] + "\n"
    }
    
    return str
}

// ##### Exports ######
module.exports = {
	WorldState: WorldState,
};