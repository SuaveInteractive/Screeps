var BuildStructure = require("Work.BuildStructure")
var HarvestSource = require("Work.HarvestSource")

function WorkTracker()
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log(" WorkTracker.Contructor")
        
    this._Work = {}
    this._CurrentWorkId = 0
}

WorkTracker.prototype.CreateWorkTask = function(room, workType, data)
{
    if (this._Debugging)
        console.log(" WorkTracker.CreateWorkTask: room [" + room + "] workType [" + workType + "] data [" + data + "]")
        
    if (!this._Work[room])
        this._Work[room] = []
        
    var newWork = null
    var newWorkId = null 
    if (workType == 'BUILD_STRUCTURE')
        newWork = new BuildStructure(room, data)
    else if (workType == 'HARVEST_SOURCE')
        newWork = new HarvestSource(room, data)
    
    if (newWork)
    {
        newWorkId = this._CurrentWorkId
        newWork.SetWorkId(newWorkId)
        this._CurrentWorkId = this._CurrentWorkId + 1
    }
    
    this._Work[room].push(newWork)
    
    return newWorkId
}

WorkTracker.prototype.AssignCreepToWorkId = function(room, workId, creepName)
{
    if (this._Debugging)
        console.log(" WorkTracker.AssignCreepToWorkId: room [" + room + "] workId [" + workId + "] creepName [" + creepName + "]")
        
    if (!this._Work[room])
        return
    
    for (var i in this._Work[room])
    {
        var work = this._Work[room][i]
        console.log("GetWorkForId: " + work._Id)
        
        if (work._Id == workId)
        {
            work.AssignCreep(creepName)
        }
    }
}

WorkTracker.prototype.SerializedData = function()
{
    if (this._Debugging)
        console.log(" WorkTracker.SerializedData: _CurrentWorkId [" + this._CurrentWorkId + "]")
        
    var data = {}
    data.Work = {}
    
    data.CurrentWorkId = this._CurrentWorkId
    
    for (var room in this._Work)
    {
        console.log("  room: " + room)
        console.log("  room.name: " + room.name)
        console.log("  this._Work[room]: " + this._Work[room])
        console.log("  this._Work[room].Work: " + this._Work[room].Work)
        
        var workInRoom = this._Work[room]
        for (var roomWork in workInRoom)
        {
            console.log("   roomWork: " + roomWork)
            console.log("   workInRoom: " + workInRoom)
            console.log("   workInRoom[roomWork]: " + workInRoom[roomWork])
            console.log("   workInRoom[roomWork].GetWorkId(): " + workInRoom[roomWork].GetWorkId())
            console.log("   workInRoom[roomWork].SerializedData(): " + workInRoom[roomWork].SerializedData())

            data.Work[room] = []
            data.Work[room].push(workInRoom[roomWork].SerializedData())
        }
    }
    
    return data
}

WorkTracker.prototype.DeserializedData = function(data)
{
    if (this._Debugging)
        console.log(" WorkTracker.DeserializedData")
        
    if (data.CurrentWorkId != null)
        this._CurrentWorkId = data.CurrentWorkId
    
    for (var room in data.Work)
    {
        console.log(" room: " + data.Work[room])
        this._Work[room] = data.Work[room]
    }
}


module.exports = WorkTracker;