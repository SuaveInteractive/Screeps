// ##### Requires ######
var Work = require('Work');

// ##### Object ######
function HarvestSource(room, data)
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("HarvestSource constructor")
        
    Work.call(this)
}

HarvestSource.prototype = Object.create(Work.prototype)

HarvestSource.prototype.Run = function(state)
{
	if (this._Debugging)
		console.log("HarvestSource -> run")
}

HarvestSource.prototype.SerializedData = function()
{
    var data = Work.prototype.SerializedData.call(this)

    return data
}

HarvestSource.prototype.DeserializedData = function(data)
{
    Work.prototype.DeserializedData.call(this, data)
}

// ##### Exports ######
module.exports = HarvestSource