// ##### Requires ######
var Work = require('Work')

// ##### Object ######
function RefillSpawn(room, data, workTracker)
{
    RefillSpawn.prototype._Debugging = false
    
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
    
    var r1 = Work.prototype.Destroy.call(this, workTracker)
    var r2 = workTracker.DestroyWorkTask(room, this._TransferWorkId)
    
    if (r1 != null)
        ret = ret.concat(r1)
        
    if (r2 != null)
        ret = ret.concat(r2)
    
    var harvestWork = workTracker.GetWorkTask(room, this._HarvestSiteWorkId)
    var assignedCreeps = harvestWork.GetAssignCreeps()
    
    for (var i in assignedCreeps)
    {
        var creepInfo = assignedCreeps[i]
        var parentStack = creepInfo.ParentStack
        var num = parentStack.length
        
        for (var j in parentStack)
        {
            if (parentStack[j] == this.GetWorkId())
            {
                harvestWork.UnassignCreep(creepInfo)
                ret.push(creepInfo)
                break
            }
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
        var creepInfo = assignedCreeps[i]
        var creepName = creepInfo.CreepName
        var creep = Game.creeps[creepName]
        
        if (creep.carry.energy < 1)
        {
            workTracker.AssignCreepToWorkId(room, this._HarvestSiteWorkId, creepInfo)
        }
        else
        {
            workTracker.AssignCreepToWorkId(room, this._TransferWorkId, creepInfo)
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