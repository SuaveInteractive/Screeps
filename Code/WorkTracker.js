var Work = require("Work")
var WorkFactory = require("WorkFactory")

function WorkTracker()
{
    this._Debugging = false
    
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
        
    var newWork = WorkFactory.GetWork(workType, room, data, this)
    WorkFactory._CurrentWorkId++
    
    this._Work[room].push(newWork)
    
    return newWork.GetWorkId()
}

WorkTracker.prototype.GetWorkTask = function(room, workId)
{
    if (this._Debugging)
        console.log(" WorkTracker.GetWorkTask: room [" + room + "] workId [" + workId + "]")  
        
    // TODO
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
        if (work._Id == workId)
        {
            work.AssignCreep(creepName)
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
    if (this._Debugging)
        console.log(" WorkTracker.CleanUpWork")
        
    var assignedCreeps = work.GetAssignCreeps()
    
    for (var i in assignedCreeps)
    {
        var creep = assignedCreeps[i]
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
        console.log(" WorkTracker.SerializedData: _CurrentWorkId [" + this._CurrentWorkId + "]")
        
    var data = {}
    data.Work = {}
    
    data.CurrentWorkId = Work._CurrentWorkId
    
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
        Work._CurrentWorkId = data.CurrentWorkId
    
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