// ##### Requires ######
var Work = require('Work')

var TransferResourceRole = require('CreepRole.TransferResource')

// ##### Object ######
function TransferResource(room, data, workTracker)
{
    this._Debugging = false
    
    if (this._Debugging)
        console.log("TransferResource constructor")
        
    Work.call(this, "TransferResource", data)
    
    this._Target = data.Target
}

TransferResource.prototype = Object.create(Work.prototype)

TransferResource.prototype.Run = function(room, workTracker)
{
	if (this._Debugging)
		console.log("TransferResource -> run")
		
	var assignedCreeps = this.GetAssignCreeps()
    for (var i in assignedCreeps)
    {
        var creepName = assignedCreeps[i].CreepName
        var creep = Game.creeps[creepName]
        if (!TransferResourceRole.Run(creep, {Target: this._Target}))
        {
            if (assignedCreeps[i].ParentId > -1)
                workTracker.AssignCreepToWorkId(room, null, assignedCreeps[i].ParentId, creepName)
            this.UnassignCreep(creepName)
        }
    }
}

TransferResource.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)
    
    data.Target = this._Target

    return data
}

TransferResource.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
    
    this._Target = data.Target
}

// ##### Exports ######
module.exports = TransferResource