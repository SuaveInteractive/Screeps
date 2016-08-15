// ##### Requires ######
var Work = require('Work')

var resourceAssigner = require('ResourceAssigner');

// ##### Object ######
function GatherResource(room, data, workTracker)
{
    this._Debugging = false
    
    if (this._Debugging)
        console.log("GatherResource constructor")
        
    Work.call(this, "GatherResource", data)
    
    if (data.HarvestWorkId == null)
    {
        var roomPos = data.RoomPos
        var harvestingSite = resourceAssigner.GetAvailableMiningSite(room, RESOURCE_ENERGY, roomPos, workTracker)
        this._HarvestWorkId = harvestingSite.WorkId
    }
}

GatherResource.prototype = Object.create(Work.prototype)

GatherResource.prototype.Run = function(room, workTracker)
{
	if (this._Debugging)
		console.log("GatherResource -> run")
		
	var assignedCreeps = this.GetAssignCreeps()
    for (var i in assignedCreeps)
    {
        var creepInfo = assignedCreeps[i]
        var creepName = creepInfo.CreepName
        var creep = Game.creeps[creepName]
        
        if (creep.carry.energy < 1)
        {
            workTracker.AssignCreepToWorkId(room, this._HarvestWorkId, creepInfo)
        }
        else
        {
            if (this._Debugging)
                console.log("GatherResource - Gathering Done, Unassign. CreepName [" + creepName + "]")
            
            workTracker.UnassignCreepFromWork(room, creepInfo)
        }
        
        // TODO: Collect Resource
    }
}

GatherResource.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)

    data.HarvestWorkId = this._HarvestWorkId
    
    return data
}

GatherResource.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
    
    this._HarvestWorkId = data.HarvestWorkId
}

// ##### Exports ######
module.exports = GatherResource