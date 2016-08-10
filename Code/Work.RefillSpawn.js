// ##### Requires ######
var Work = require('Work')

// ##### Object ######
function RefillSpawn(room, data, workTracker)
{
    RefillSpawn.prototype._Debugging = true
    
    if (this._Debugging)
        console.log("RefillSpawn constructor - HarvestSiteId [" + data.HarvestSiteWorkId + "]")
        
    Work.call(this, "RefillSpawn", data)

    this._HarvestSiteWorkId = data.HarvestSiteWorkId
    
    if (data.TransferWorkId == null)
        this._TransferWorkId = workTracker.CreateWorkTask(room, 'TransferResource', {Target: data.SpawnId})
}

RefillSpawn.prototype = Object.create(Work.prototype)

RefillSpawn.prototype.Destroy = function(room, workTracker)
{
    var ret = []
    
    ret = ret.concat(Work.prototype.Destroy.call(this, workTracker))
    //ret = ret.concat(workTracker.DestroyWorkTask(room, this._HarvestSiteWorkId))
    ret = ret.concat(workTracker.DestroyWorkTask(room, this._TransferWorkId))
    
    var harvestWork = workTracker.GetWorkTask(room, this._HarvestSiteWorkId)
    var assignedCreeps = harvestWork.GetAssignCreeps()
    
    for (var i in assignedCreeps)
    {
        var creep = assignedCreeps[i]
        if (creep.ParentId == this.GetWorkId())
        {
            harvestWork.UnassignCreep(creep.CreepName)
            ret.push(creep.CreepName)
        }
    }
    
    return ret
}

RefillSpawn.prototype.Run = function(room, workTracker)
{
	if (this._Debugging)
		console.log("RefillSpawn.prototype.Run room [" + room + "] workTracker [" + workTracker + "]")
		
	var assignedCreeps = this.GetAssignCreeps()
    for (var i in assignedCreeps)
    {
        var creepName = assignedCreeps[i].CreepName
        var creep = Game.creeps[creepName]
        
        if (creep.carry.energy < 1)
        {
            workTracker.AssignCreepToWorkId(room, this.GetWorkId(), this._HarvestSiteWorkId, creepName)
            this.UnassignCreep(creepName)
        }
        else
        {
            workTracker.AssignCreepToWorkId(room, this.GetWorkId(), this._TransferWorkId, creepName)
            this.UnassignCreep(creepName)
        }
    }
}

RefillSpawn.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)
    
    data.HarvestSiteWorkId = this._HarvestSiteWorkId
    data.TransferWorkId = this._TransferWorkId
    
    return data
}

RefillSpawn.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
    
    this._HarvestSiteWorkId = data.HarvestSiteWorkId
    this._TransferWorkId = data.TransferWorkId
}

// ##### Exports ######
module.exports = RefillSpawn