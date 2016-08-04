// ##### Requires ######
var Work = require('Work')

// ##### Object ######
function RefillSpawn(room, data, workTracker)
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("RefillSpawn constructor")
        
    Work.call(this, "RefillSpawn", data)

    if (data.HarvestWorkId == null)
        this._HarvestWorkId = workTracker.CreateWorkTask(room, 'HarvestSource', {Parent: this.GetWorkId(), HarvestSite: data.HarvestSiteId})
    
    if (data.TransferWorkId == null)
        this._TransferWorkId = workTracker.CreateWorkTask(room, 'TransferResource', {Parent: this.GetWorkId(), Target: data.SpawnId})
}

RefillSpawn.prototype = Object.create(Work.prototype)

RefillSpawn.prototype.Destroy = function(room, workTracker)
{
    var creeps = []
    
    creeps.concat(Work.prototype.Destroy.call(this, workTracker))
    creeps.concat(workTracker.DestroyWorkTask(room, this._HarvestWorkId))
    creeps.concat(workTracker.DestroyWorkTask(room, this._TransferWorkId))
    
    return creeps
}

RefillSpawn.prototype.Run = function(room, workTracker)
{
	if (this._Debugging)
		console.log("RefillSpawn.prototype.Run room [" + room + "] workTracker [" + workTracker + "]")
		
	var assignedCreeps = this.GetAssignCreeps()
    for (var i in assignedCreeps)
    {
        var creep = Game.creeps[assignedCreeps[i]]
        
        if (creep.carry.energy < 1)
        {
            workTracker.AssignCreepToWorkId(room, this._HarvestWorkId, assignedCreeps[i])
            this.UnassignCreep(assignedCreeps[i])
        }
        else
        {
            workTracker.AssignCreepToWorkId(room, this._TransferWorkId, assignedCreeps[i])
            this.UnassignCreep(assignedCreeps[i])
        }
    }
}

RefillSpawn.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)
    
    data.HarvestWorkId = this._HarvestWorkId
    data.TransferWorkId = this._TransferWorkId
    
    return data
}

RefillSpawn.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
    
    this._HarvestWorkId = data.HarvestWorkId
    this._TransferWorkId = data.TransferWorkId
}

// ##### Exports ######
module.exports = RefillSpawn