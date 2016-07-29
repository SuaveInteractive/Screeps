// ##### Object ######
function Work()
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("Work Constructor")
        
    this._Finished = false 
}



Work.prototype.GetWorkId = function()
{
    return this._Id
}

Work.prototype.SetWorkId = function(id)
{
    this._Id = id
}

Work.prototype.GetFinished = function()
{
    return this._Finished
}

Work.prototype.SetFinished = function(finished)
{
    this._Finished = finished
}

Work.prototype.SerializedData = function()
{
    var data = {Id: this._Id, Finished: this._Finished}
    return data
}

Work.prototype.DeserializedData = function(data)
{
    this._Id = data.Id
    this._Finished = data.Finished
}

Work.prototype.toString = function()
{
    return "Work"
}

// ##### Exports ######
module.exports = Work