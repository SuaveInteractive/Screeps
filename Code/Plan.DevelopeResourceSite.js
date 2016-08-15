// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

var resourceAssigner = require('ResourceAssigner');
var buildContainer = require('Utility.BuildContainer')

var constructionSiteGenerator = require('ConstructionSiteGenerator')

// ##### Object ######
function DevelopeResourceSite(room)
{
    Plan.Plan.call(this)
    
    this._Debugging = true
}

DevelopeResourceSite.prototype = Object.create(Plan.Plan.prototype)

DevelopeResourceSite.prototype.GetUtilitiesServed = function()
{
    var utilityServed = ['DEVELOPE_RESOURCE_SITES']
    return utilityServed
}

DevelopeResourceSite.prototype.GetId = function()
{
    return 'DEVELOPE_RESOURCE_SITES'
}

DevelopeResourceSite.prototype.GetFinisedResult = function(room, worldState)
{
    var result = []
    
    var util = new buildContainer.UtilityBuildContainer()
    
    var availableStructures = worldState.Rooms[room].AvailableStructures.container -= 1
    
    result.push(util.Calculate(room, worldState))
    
    return result
}

DevelopeResourceSite.prototype.SerializedData = function()
{
    var data = Plan.Plan.prototype.SerializedData.call(this)
    
    data.BuildStructureWorkId = this._BuildStructureWorkId
    
    return data
}

DevelopeResourceSite.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._BuildStructureWorkId = data.BuildStructureWorkId
}

DevelopeResourceSite.prototype.Run = function(workTracker, recruiter)
{
	if (this._Debugging)
		console.log("Plan.DevelopeResourceSite -> run [" + workTracker + "]")

    var room = Game.rooms[this.GetPlanRoomName()]
    
    if (this._BuildStructureWorkId == null)
    {
        var constructionSiteId = constructionSiteGenerator.GetConstructionSite(room, STRUCTURE_CONTAINER)
        
        if (constructionSiteId != null)
        {
            var constructionSite = constructionSiteGenerator.GetConstructionSiteById(room, constructionSiteId)
            
            var roomPos = new RoomPosition(constructionSite.PosX, constructionSite.PosY, room.name)

            this._BuildStructureWorkId = workTracker.CreateWorkTask(room, 'BuildStructure', {ConstructionSiteId: constructionSiteId, RoomPos: roomPos})
        }
    }
	else
	{
	    var buildWork = workTracker.GetWorkTask(room, this._BuildStructureWorkId)
	    if (buildWork.GetFinished() == true)
	    {
	        if (this._Debugging)
                console.log(" DevelopeResourceSite.prototype.Run PLAN FINISHED")
            
            var unassigedCreeps = workTracker.DestroyWorkTask(room, this._BuildStructureWorkId)
            recruiter.AddUnassignedCreeps(unassigedCreeps)
        
	        this.SetFinished(true)
	    }
	    else
	    {
        	var unassignedCreeps = recruiter.GetUnassignedCreeps()
        	for (var i in unassignedCreeps)
        	{
        	    var creepInfo = unassignedCreeps[i]
        	    recruiter.RemoveUnassignedCreeps(creepInfo)
        	    workTracker.AssignCreepToWorkId(room, this._BuildStructureWorkId, creepInfo)
        	}
    	}
	}
}

DevelopeResourceSite.prototype.toString = function()
{
    return "DevelopeResourceSite"
}

// ##### Exports ######
module.exports = DevelopeResourceSite
