// ##### Requires ######
var recruiter = require('Recruiter');
var Plan = require('Plan');

var worldState = require('WorldState');

var buildContainer = require('Utility.BuildContainer');

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
    
    data.SpawningCreepName = this._SpawningCreepName
    data.SiteId = this._SiteId
    
    console.log(" SerializedData: data.SiteId = " + data.SiteId)
    
    return data
}

BuildContainer.prototype.DeserializedData = function(data)
{
    Plan.Plan.prototype.DeserializedData.call(this, data)
    
    this._SpawningCreepName = data.SpawningCreepName
    this._SiteId = data.SiteId
    
    console.log(" DeserializedData: this._SiteId = " + this._SiteId)
}

BuildContainer.prototype.Run = function(state)
{
	if (this._Debugging)
		console.log("Plan.BuildContainer -> run")

console.log("this._SiteId: " +this._SiteId)

	var builderCreep = null
	if (this._SpawningCreepName)
	    builderCreep = Game.creeps[this._SpawningCreepName]
    
    var room = Game.rooms[this.GetPlanRoomName()]
	
	if (this._SiteId)
	{
        if (this._Debugging)
            console.log("BUILDING")
	}
	else if (builderCreep)
	{
	    if (builderCreep.spawning)
        {
            if (this._Debugging)
                console.log("SPAWING CREEP")
        }
        else
        {
            this._SiteId = constructionSiteGenerator.GetConstructionSite(room, STRUCTURE_CONTAINER)
            builderCreep.memory.role = 'builder'
            builderCreep.memory.siteId = this._SiteId
            
	    //    this.SetFinished(true)
        }
	}
	else
	{
	    // No creep so spawn one
	    var result = recruiter.SpawnCreep(Game.rooms[this.GetPlanRoomName()])
	    if (_.isString(result))
	    {
	        this._SpawningCreepName = result
            console.log("SPAWING NEW CREEP")
	    }
	    else
	    {
	        console.log("COULD NOT SPAWN CREEP [" + result + "]")    
	    }
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