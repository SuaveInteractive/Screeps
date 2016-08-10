// ##### Object ######
function Work(type, data)
{
   // this._Debugging = true
    
    if (this._Debugging)
        console.log("Work Constructor")
    
    this._Type = type
    
    var workId = data.Id
    if (workId == null)
    {
        workId = Work.CurrentWorkId
        Work.CurrentWorkId++
    }
    
    this._Id = workId
    this._Finished = false 
    this._AssignedCreeps = []
}

// ##### Statics ######
Work.CurrentWorkId = 0;

Work.prototype.Destroy = function()
{
    if (this._Debugging)
        console.log("Work Destroy: Type [" + this._Type + "] Id [" + this._Id + "]")
    
    var creeps = []
    for (var i in this._AssignedCreeps)
    {
        creeps.push(this._AssignedCreeps[i].CreepName)
    }
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

Work.prototype.GetFinished = function()
{
    return this._Finished
}

Work.prototype.SetFinished = function(finished)
{
    this._Finished = finished
}

Work.prototype.AssignCreep = function(workParentId, creepName)
{
    if (this._Debugging)
        console.log(" Work.prototype.AssignCreep: workParentId [" + workParentId + "] creepName [" + creepName + "]") 
    
    var parentId = workParentId
    if (parentId == null)
        parentId = -1

    this._AssignedCreeps.push({ParentId: parentId, CreepName: creepName})
}

Work.prototype.UnassignCreep = function(creepName)
{
    if (this._Debugging)
        console.log(" Work.prototype.UnassignCreep: creepName [" + creepName + "]") 
        
    var index = _.findIndex(this._AssignedCreeps, function(o) { return o.CreepName == creepName; });

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
}

Work.prototype.toString = function()
{
    var creepsAssigned = ""
    for (var i in this._AssignedCreeps)
    {
        console.log(" i: " + i)
        creepsAssigned += " " + this._AssignedCreeps[i].CreepName
    }
    
    return "Work: Id [" + this._Id + "] Type [" + this._Type + "] Finished [" + this._Finished + "] AssignedCreeps [" + creepsAssigned + "]"
}

// ##### Exports ######
module.exports = Work