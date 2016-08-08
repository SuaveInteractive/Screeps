var roomHelper = require('RoomHelper');

var ERR_NO_SPAWNER_AVAILIBLE = -18
    
function Recruiter()
{
    this._Debugging = false
    
    if (this._Debugging)
        console.log("Recruiter Constructor")
        
    this._UnassignedCreeps = []
}
    
Recruiter.prototype.SpawnCreep = function(room)
{
    var spawner = this.GetBestSpawner(room)
    if (spawner && Game.structures[spawner])
    {
        return Game.structures[spawner].createCreep([WORK, CARRY, MOVE])
    }
    else
    {
        console.log("Could not find a spawner to use in room [" + room + "]")
        return ERR_NO_SPAWNER_AVAILIBLE
    }
},

Recruiter.prototype.GetBestSpawner = function(room)
{
    var spawners = roomHelper.GetStructures(room, STRUCTURE_SPAWN)
    for (var s in spawners)
    {
        if (!s.spawningobject)
            return s
    };
}

Recruiter.prototype.AddUnassignedCreeps = function(creeps)
{
    if (this._Debugging)
        console.log(" Recruiter.prototype.AddUnassignedCreeps creeps [" + creeps + "]")
    
    if (creeps == null)
        return
        
    this._UnassignedCreeps = this._UnassignedCreeps.concat(creeps)
}

Recruiter.prototype.RemoveUnassignedCreeps = function(creep)
{
    if (this._Debugging)
        console.log(" Recruiter.prototype.RemoveUnassignedCreeps creep [" + creep + "]")
    
    if (creep == null)
        return
        
    var index = this._UnassignedCreeps.indexOf(creep)
    this._UnassignedCreeps.splice(index, 1)
}

Recruiter.prototype.GetUnassignedCreeps = function()
{
    return this._UnassignedCreeps
}

Recruiter.prototype.DeserializedData = function(data)
{
    this._UnassignedCreeps = data.UnassignedCreeps
}

Recruiter.prototype.SerializedData = function()
{
    var data = {}
    
    data.UnassignedCreeps = this._UnassignedCreeps
    
    return data
}

module.exports = Recruiter