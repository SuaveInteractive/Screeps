// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

var resourceAssigner = require('ResourceAssigner');
var buildContainer = require('Utility.BuildContainer')

var constructionSiteGenerator = require('ConstructionSiteGenerator')

// ##### Object ######
function BuildContainer(room)
{
    Plan.Plan.call(this)
    
    this._Debugging = true
}

BuildContainer.prototype = Object.create(Plan.Plan.prototype)

BuildContainer.prototype.GetUtilitiesServed = function()
{
    var utilityServed = ['BUILD_CONTAINER']
    return utilityServed
}

BuildContainer.prototype.GetId = function()
{
    return 'BUILD_CONTAINER'
}

BuildContainer.prototype.GetFinisedResult = function(room, worldState)
{
    var result = []
    
    var util = new buildContainer.UtilityBuildContainer()
    
    var availableStructures = worldState.Rooms[room].AvailableStructures.container -= 1
    
    result.push(util.Calculate(room, worldState))
    
    return result
}

BuildContainer.prototype.SerializedData = function()
{
    var data = Plan.Plan.prototype.SerializedData.call(this)
    
    data.BuildStructureWorkId = this._BuildStructureWorkId
    
    return data
}

BuildContainer.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._BuildStructureWorkId = data.BuildStructureWorkId
}

BuildContainer.prototype.Run = function(workTracker, recruiter)
{
	if (this._Debugging)
		console.log("Plan.BuildContainer -> run [" + workTracker + "]")

    var room = Game.rooms[this.GetPlanRoomName()]
    
    if (this._BuildStructureWorkId == null)
    {
        // TODO: Should be collect resources
        var miningSiteId = resourceAssigner.GetAvailableMiningLocation(room, RESOURCE_ENERGY, new RoomPosition(spawnPos.x, spawnPos.y, spawnPos.roomName))
        
        var constructionSiteId = constructionSiteGenerator.GetConstructionSite(room, STRUCTURE_CONTAINER)
        this._BuildStructureWorkId = workTracker.CreateWorkTask(room, 'BuildStructure', {ConstructionSiteId: constructionSiteId, HarvestSiteId: miningSiteId})
    }
	
	var unassignedCreeps = recruiter.GetUnassignedCreeps()
	for (var i in unassignedCreeps)
	{
	    var creep = unassignedCreeps[i]
	    
	    console.log(" Plan.BuildContainer Assiging [${creep}] to [${this._BuildStructureWorkId}]")
	    
	    recruiter.RemoveUnassignedCreeps(creep)
	    workTracker.AssignCreepToWorkId(room, this._BuildStructureWorkId, creep)
	}
    
}

BuildContainer.prototype.toString = function()
{
    return "BuildContainer"
}

// ##### Exports ######
module.exports = {
	BuildContainer: BuildContainer,
};
