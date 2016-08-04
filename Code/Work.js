// ##### Statics ######
var CurrentWorkId = 0;

// ##### Object ######
function Work(type, data)
{
    this._Debugging = false
    
    if (this._Debugging)
        console.log("Work Constructor")
    
    this._Type = type
    
    var workId = data.Id
    if (workId == null)
    {
        workId = CurrentWorkId
        CurrentWorkId++
    }
    
    this._Id = workId
    this._Finished = false 
    this._AssignedCreeps = []
    this._Parent = data.Parent
}

Work.prototype.Destroy = function()
{
    if (this._Debugging)
        console.log("Work Destroy")
    
    var creeps =  this._AssignedCreeps 
    this._AssignedCreeps = []
    return creeps
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

Work.prototype.GetParent = function()
{
    return this._Parent
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
    if (this._Debugging)
        console.log(" Work.prototype.AssignCreep: creepName [" + creepName + "]") 
        
    this._AssignedCreeps.push(creepName)
}

Work.prototype.UnassignCreep = function(creepName)
{
    if (this._Debugging)
        console.log(" Work.prototype.AssignCreep: creepName [" + creepName + "]") 
        
    var index = this._AssignedCreeps.indexOf(creepName)

    if (index > -1)
        this._AssignedCreeps.splice(index, 1)
}

Work.prototype.GetAssignCreeps = function()
{
    return this._AssignedCreeps
}

Work.prototype.SerializedData = function()
{
    if (this._Debugging)
        console.log(" Work.prototype.SerializedData: this._AssignedCreeps [" + this._AssignedCreeps + "]") 
    
    var data = {}
    
    data.Type = this._Type
    data.Id = this._Id
    data.Finished = this._Finished
    data.AssignedCreeps = this._AssignedCreeps
    data.Parent = this._Parent
    
    return data
}

Work.prototype.DeserializedData = function(data)
{
    if (this._Debugging)
        console.log(" Work.prototype.DeserializedData: data.AssignedCreeps [" + data.AssignedCreeps + "]") 
    
    this._Type = data.Type
    this._Id = data.Id
    this._Finished = data.Finished
    this._AssignedCreeps = data.AssignedCreeps
    this._Parent = data.Parent
}

Work.prototype.toString = function()
{
    return "Work: Id [" + this._Id + "] Type [" + this._Type + "] Finished [" + this._Finished + "] AssignedCreeps [" + this._AssignedCreeps + "]"
}

// ##### Exports ######
module.exports = Work