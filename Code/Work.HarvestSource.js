// ##### Requires ######
var Work = require('Work')

var RoleHarvester = require('CreepRole.Harvester')

// ##### Object ######
function HarvestSource(room, data, workTracker)
{
    this._Debugging = false
    
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
        var creepInfo = assignedCreeps[i]
        var creepName = creepInfo.CreepName
        var creep = Game.creeps[creepName]
        if (!RoleHarvester.Run(creep, {HarvestSite: this._HarvestSite}))
        {
            //this.UnassignCreep(creepInfo)
            workTracker.UnassignCreepFromWork(room, creepInfo)
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

HarvestSource.prototype.toString = function()
{
    var str = Work.prototype.toString.call(this)
    
    str += "\n  HarvestSource _HarvestSite [" + toString(this._HarvestSite) + "]"
    
    return str
}

// ##### Exports ######
module.exports = HarvestSource