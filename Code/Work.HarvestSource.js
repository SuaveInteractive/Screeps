// ##### Requires ######
var Work = require('Work')

var RoleHarvester = require('CreepRole.Harvester')

// ##### Object ######
function HarvestSource(room, data, workTracker)
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("HarvestSource constructor")
        
    Work.call(this, "HarvestSource", data)
    
    this._HarvestSite = data.HarvestSite
}

HarvestSource.prototype = Object.create(Work.prototype)

HarvestSource.prototype.Run = function(room, workTracker)
{
	if (this._Debugging)
		console.log("HarvestSource -> run")
		
	var assignedCreeps = this.GetAssignCreeps()
    for (var i in assignedCreeps)
    {
        var creep = Game.creeps[assignedCreeps[i]]
        if (!RoleHarvester.Run(creep, {HarvestSite: this._HarvestSite}))
        {
            if (this.GetParent() > -1)
                workTracker.AssignCreepToWorkId(room, this.GetParent(), assignedCreeps[i])
            this.UnassignCreep(assignedCreeps[i])
        }
    }
}

HarvestSource.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)
    
    data.HarvestSite = this._HarvestSite

    return data
}

HarvestSource.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
    
    this._HarvestSite = data.HarvestSite
}

// ##### Exports ######
module.exports = HarvestSource