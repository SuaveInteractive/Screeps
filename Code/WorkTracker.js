var Work = require("Work")
var WorkFactory = require("WorkFactory")

function WorkTracker()
{
    this._Debugging = false
    
    if (this._Debugging)
        console.log(" WorkTracker.Contructor")
        
    this._Work = {}
}

WorkTracker.prototype.CreateWorkTask = function(room, workType, data)
{
    if (this._Debugging)
        console.log(" WorkTracker.CreateWorkTask: room [" + room + "] workType [" + workType + "] data [" + data + "]")
        
    if (!this._Work[room])
        this._Work[room] = []
        
    var newWork = WorkFactory.GetWork(workType, room, data, this)

    this._Work[room].push(newWork)
    
    return newWork.GetWorkId()
}

WorkTracker.prototype.DestroyWorkTask = function(room, workId)
{
    if (this._Debugging)
        console.log(" WorkTracker.prototype.DestroyWorkTask: room [" + room + "] workId [" + workId + "]")
        
    var work = this.GetWorkTask(room, workId)
    
    if (work)
    {
        var unassignedCreeps = work.Destroy(room, this)
        
        var index = this._Work[room].indexOf(work)
        
        this._Work[room].splice(index, 1)
        
        return unassignedCreeps
    }
    else
    {
        console.log("##### Could not DestroyWorkTask: room [" + room + "] workId [" + workId + "] #####")
    }
}


WorkTracker.prototype.GetWorkTask = function(room, workId)
{
    if (this._Debugging)
        console.log(" WorkTracker.GetWorkTask: room [" + room + "] workId [" + workId + "]")  
        
    for (var i in this._Work[room])
    {
        var work = this._Work[room][i]
        if (work.GetWorkId() == workId)
            return work
    }
    
    console.log("##### WorkTracker: Cannot find WorkTask. room [" + room + "] workId [" + workId + "] #####")
    return null
}

WorkTracker.prototype.AssignCreepToWorkId = function(room, workParentId, workId, creepName)
{
    if (this._Debugging)
        console.log(" WorkTracker.AssignCreepToWorkId: room [" + room + "] workId [" + workId + "] creepName [" + creepName + "]")
        
    if (!this._Work[room])
        return
    
    for (var i in this._Work[room])
    {
        var work = this._Work[room][i]
        if (work._Id == workId)
        {
            work.AssignCreep(workParentId, creepName)
            return
        }
    }
    
    console.log("##### WorkTracker: Cannot assign Creep to WorkId. room [" + room + "] workId [" + workId + "] creepName [" + creepName + "] #####")
}

WorkTracker.prototype.Run = function(room)
{
    if (this._Debugging)
        console.log(" WorkTracker.Run")
        
    for (var i in this._Work[room])
    {
        var work = this._Work[room][i]       
        
        if (this._Debugging)    
            console.log(" Work: " + work)
        
        this.CleanUpWork(work, this)
        
        work.Run(room, this)
    }
}

WorkTracker.prototype.CleanUpWork = function(work)
{
    //if (this._Debugging)
     //   console.log(" WorkTracker.CleanUpWork")
        
    var assignedCreeps = work.GetAssignCreeps()
    
    for (var i in assignedCreeps)
    {
        var creep = assignedCreeps[i].CreepName
        if (Game.creeps[creep] == null)
        {
            if (this._Debugging)
                console.log(" WorkTracker.CleanUpWork - removing creep [" + creep + "] from [" + work + "]")
        
            var index = assignedCreeps.indexOf(creep)
		    assignedCreeps.splice(index, 1)
        }
    }
}

WorkTracker.prototype.SerializedData = function()
{
    if (this._Debugging)
        console.log(" WorkTracker.SerializedData")
        
    var data = {}
    data.Work = {}
    
    data.CurrentWorkId = Work.CurrentWorkId
    
    for (var room in this._Work)
    {
        data.Work[room] = []
        
        var workInRoom = this._Work[room]
        for (var roomWork in workInRoom)
        {
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
        Work.CurrentWorkId = data.CurrentWorkId
    
    for (var room in data.Work)
    {
        if (!this._Work[room])
            this._Work[room] = []

        for (var i in data.Work[room])
        {
            var workData = data.Work[room][i]
            var newWork = WorkFactory.GetWork(workData.Type, room, workData)
            newWork.DeserializedData(workData)
            
            this._Work[room].push(newWork)
        }
    }
}

module.exports = WorkTracker;