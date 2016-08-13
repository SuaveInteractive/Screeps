var roomHelper = require('RoomHelper');

var ERR_NO_SPAWNER_AVAILIBLE = -18
    
function Recruiter()
{
    this._Debugging = true
    
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

Recruiter.prototype.AddUnassignedCreeps = function(creepInfos)
{
    if (this._Debugging)
        console.log(" Recruiter.prototype.AddUnassignedCreeps creeps [" + creepInfos + "]")
    
    if (creepInfos == null && creepInfos.length > 0)
        return
    
    for (var i in creepInfos)
    {
        creepInfos[i].ParentStack = []
    }
        
    this._UnassignedCreeps = this._UnassignedCreeps.concat(creepInfos)
}

Recruiter.prototype.RemoveUnassignedCreeps = function(creepInfo)
{
    if (this._Debugging)
        console.log(" Recruiter.prototype.RemoveUnassignedCreeps creep [" + creepInfo + "]")
    
    if (creepInfo == null)
        return
        
    var index = _.findIndex(this._UnassignedCreeps, function(o) { return o.CreepName == creepInfo.CreepName; });
        
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