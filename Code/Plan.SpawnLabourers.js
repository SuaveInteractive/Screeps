// ##### Requires ######
var Recruiter = require('Recruiter');
var Plan = require('Plan');

var resourceAssigner = require('ResourceAssigner');
var UtilitySpawnLabourer = require('Utility.SpawnLabourer');

// ##### Object ######
function SpawnLabourers(room)
{
    Plan.Plan.call(this)
    
    this._Debugging = false
    
    this._NumberOfLaborersSpawned = 0
    this._NumberOfLaborersToSpawn = 1
}

SpawnLabourers.prototype = Object.create(Plan.Plan.prototype)

SpawnLabourers.prototype.GetUtilitiesServed = function()
{
    var utilityServed = ['SPAWN_LABOURER']
    return utilityServed
}

SpawnLabourers.prototype.GetId = function()
{
    return 'SPAWN_LABOURERS'
}

SpawnLabourers.prototype.GetFinisedResult = function(room, worldState)
{
    var result = []
    
    var util = new UtilitySpawnLabourer()
    
    worldState.NumberOfCreeps += this._NumberOfLaborersToSpawn
    
    result.push(util.Calculate(room, worldState))
    
    return result
}

SpawnLabourers.prototype.SerializedData = function()
{
    var data = Plan.Plan.prototype.SerializedData.call(this)
    
    data.RefillSpawnWorkId = this._RefillSpawnWorkId
    data.NumberOfLaborersSpawned = this._NumberOfLaborersSpawned
    data.NumberOfLaborersToSpawn = this._NumberOfLaborersToSpawn
    data.SpawningCreepName = this._SpawningCreepName
    
    return data
}

SpawnLabourers.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._RefillSpawnWorkId = data.RefillSpawnWorkId
    this._NumberOfLaborersSpawned = data.NumberOfLaborersSpawned
    this._NumberOfLaborersToSpawn = data.NumberOfLaborersToSpawn
    this._SpawningCreepName = data.SpawningCreepName
}

SpawnLabourers.prototype.Run = function(workTracker, recruiter)
{
    if (this.GetFinished())
        return
    
	if (this._Debugging)
		console.log("SpawnLabourers -> run [" + workTracker + "]")

    var room = Game.rooms[this.GetPlanRoomName()]
    
    if (this._RefillSpawnWorkId == null)
    {
        var spawns = Memory.ParsedRooms[room].Spawns
        
        for (var spawn in spawns)
        {
            var spawnPos = spawns[spawn].pos

            // TODO: Should be collect energy
            var miningSite = resourceAssigner.GetAvailableMiningSite(room, RESOURCE_ENERGY, new RoomPosition(spawnPos.x, spawnPos.y, spawnPos.roomName), workTracker)
        
            this._RefillSpawnWorkId = workTracker.CreateWorkTask(room, 'RefillSpawn', {HarvestSiteId: miningSite.Id, SpawnId: spawns[spawn].id})
        }
    }
    
	var creepHarvester = null
	if (this._SpawningCreepName)
	    creepHarvester = Game.creeps[this._SpawningCreepName]
    
    if (creepHarvester != null)
    {
        if (creepHarvester.spawning)
        {
            if (this._Debugging)
                console.log(" SpawnLabourers.prototype.Run SPAWING CREEP")
        }
        else
        {
            if (this._Debugging)
                console.log(" SpawnLabourers.prototype.Run SPAWNED")
            
            workTracker.AssignCreepToWorkId(room, this._RefillSpawnWorkId, this._SpawningCreepName)
            
            this._NumberOfLaborersSpawned++
            this._SpawningCreepName = ""    
        }
    }
    
    if (this._NumberOfLaborersSpawned < this._NumberOfLaborersToSpawn)
    {
        var result = recruiter.SpawnCreep(room)
	    if (_.isString(result))
	    {
	        this._SpawningCreepName = result
	        
	        if (this._Debugging)
                console.log(" SpawnLabourers.prototype.Run NEW CREEP")
	    }
	    else
	    {
	        console.log("COULD NOT SPAWN CREEP [" + result + "]")    
	    }
    }
    else
    {
        if (this._Debugging)
            console.log(" SpawnLabourers.prototype.Run PLAN FINISHED")
            
        var unassigedCreeps = workTracker.DestroyWorkTask(room, this._RefillSpawnWorkId)
        
        recruiter.AddUnassignedCreeps(unassigedCreeps)
        
        this.SetFinished(true)
    }
}

SpawnLabourers.prototype.toString = function()
{
    return "SpawnLabourers"
}

// ##### Exports ######
module.exports = SpawnLabourers;
