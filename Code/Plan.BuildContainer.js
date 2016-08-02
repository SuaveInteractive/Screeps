// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

var buildContainer = require('Utility.BuildContainer')

var constructionSiteGenerator = require('ConstructionSiteGenerator')

// ##### Object ######
function BuildContainer(room)
{
    Plan.Plan.call(this)
    
    this._Debugging = false
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
    
    data.SpawningCreepName = this._SpawningCreepName
    data.ConstructionSiteId = this._ConstructionSiteId
    data.WorkId = this._WorkId
    
    return data
}

BuildContainer.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._SpawningCreepName = data.SpawningCreepName
    this._ConstructionSiteId = data.ConstructionSiteId
    this._WorkId = data.WorkId
}

BuildContainer.prototype.Run = function(workTracker)
{
	if (this._Debugging)
		console.log("Plan.BuildContainer -> run [" + workTracker + "]")

    var room = Game.rooms[this.GetPlanRoomName()]
	
	if(this._WorkId != null)
	{
	    var work = workTracker.GetWorkForId(room, this._WorkId)
	    if (work && work.GetFinished())
	        this.SetFinished(true)
	}
	else if (this._ConstructionSiteId)
	{
	    this._WorkId = workTracker.CreateWorkTask(room, 'BuildStructure', {SiteId: this._ConstructionSiteId})
	}
	else if (!this._ConstructionSiteId)
	{
        this._ConstructionSiteId = constructionSiteGenerator.GetConstructionSite(room, STRUCTURE_CONTAINER)
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