// ##### Requires ######
var Work = require('Work');

var RoleBuilder = require('CreepRole.Builder')

// ##### Object ######
function BuildStructure(room, data, workTracker)
{
    BuildStructure.prototype._Debugging = false
    
    if (this._Debugging)
        console.log("BuildStructure constructor")
        
    Work.call(this, "BuildStructure", data)
    
    this._ConstructionSiteId = data.ConstructionSiteId
    
    if (data.GatherResourceWorkId == null)
    {
        console.log(" BuildStructure - data.RoomPos: " + data.RoomPos)
        this._GatherResourceWorkId = workTracker.CreateWorkTask(room, 'GatherResource', {Parent: this.GetWorkId(), RoomPos: data.RoomPos})
    }
}

BuildStructure.prototype = Object.create(Work.prototype)

BuildStructure.prototype.Destroy = function(room, workTracker)
{
    var ret = []
    
    ret = ret.concat(Work.prototype.Destroy.call(this, workTracker))
    ret = ret.concat(workTracker.DestroyWorkTask(room, this._GatherResourceWorkId))
    
    return ret
}

BuildStructure.prototype.Run = function(room, workTracker)
{
	if (this._Debugging)
		console.log("BuildStructure -> run ConstructionSiteId [" + this._ConstructionSiteId + "]")
		
    var constructionSite = Game.getObjectById(this._ConstructionSiteId)
    if (constructionSite == null)
    {
        this.SetFinished(true)
    }
    else
    {
    	var assignedCreeps = this.GetAssignCreeps()
        for (var i in assignedCreeps)
        {
            var creepInfo = assignedCreeps[i]
            var creepName = creepInfo.CreepName
            var creep = Game.creeps[creepName]
            
            if (creep.carry.energy < 1)
            {
                workTracker.AssignCreepToWorkId(room, this._GatherResourceWorkId, creepInfo)
                this.UnassignCreep(creepName)
            }
            else
            {
    
                if (!RoleBuilder.Run(creep, {ConstructionSite: this._ConstructionSiteId }))
                {
                    workTracker.UnassignCreepFromWork(room, creepInfo)
                }
            }
        }
    }
}

BuildStructure.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)
    
    data.ConstructionSiteId = this._ConstructionSiteId 
    data.GatherResourceWorkId = this._GatherResourceWorkId
    
    return data
}

BuildStructure.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
        
    this._ConstructionSiteId = data.ConstructionSiteId
    this._GatherResourceWorkId = data.GatherResourceWorkId
}

// ##### Exports ######
module.exports = BuildStructure