// ##### Requires ######
var Work = require('Work');

// ##### Object ######
function BuildStructure(room, data)
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("BuildStructure constructor")
        
    Work.call(this, "BuildStructure")
    
    this._ConstructionSiteId = data.SiteId
}

BuildStructure.prototype = Object.create(Work.prototype)

BuildStructure.prototype.Run = function(state)
{
	if (this._Debugging)
		console.log("BuildStructure -> run")
}

BuildStructure.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)
    
    data.ConstructionSiteId = this._ConstructionSiteId 
    
    return data
}

BuildStructure.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
        
    this._ConstructionSiteId = data.ConstructionSiteId
}

// ##### Exports ######
module.exports = BuildStructure