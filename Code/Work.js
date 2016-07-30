// ##### Object ######
function Work(type)
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("Work Constructor")
    
    this._Type = type
    this._Id = -1
    this._Finished = false 
    this._AssignedCreeps = []
}

Work.prototype.GetWorkType = function()
{
    return this._Type
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

Work.prototype.AssignCreep = function(creepName)
{
    this._AssignedCreeps.push(creepName)
}

Work.prototype.SerializedData = function()
{
    var data = {}
    
    data.Type = this._Type
    data.Id = this._Id
    data.Finished = this._Finished
    data.AssignedCreeps = this._AssignedCreeps
    
    return data
}

Work.prototype.DeserializedData = function(data)
{
    this._Type = data.Type
    this._Id = data.Id
    this._Finished = data.Finished
    this._AssignedCreeps = data.AssignedCreeps
}

Work.prototype.toString = function()
{
    return "Work: Id [" + this._Id + "] Finished [" + this._Finished + "] AssignedCreeps [" + this._AssignedCreeps + "]"
}

// ##### Exports ######
module.exports = Work