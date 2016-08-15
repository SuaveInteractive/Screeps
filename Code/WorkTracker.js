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

WorkTracker.prototype.AssignCreepToWorkId = function(room, workId, creepInfo)
{
    if (this._Debugging)
        console.log(" WorkTracker.AssignCreepToWorkId: room [" + room + "] workId [" + workId + "] CreepName [" + creepInfo.CreepName + "]")
        
    if (!this._Work[room])
        return
    
    if (creepInfo.ParentStack == null)
        creepInfo.ParentStack = []
    
    var num = creepInfo.ParentStack.length
    var currentWorkId = null
    if (num > 0)
        currentWorkId = creepInfo.ParentStack[num - 1]

    var workToAssign = null
    var workToUnassign = null
    for (var i in this._Work[room])
    {
        var work = this._Work[room][i]
        if (work._Id == workId)
        {
            workToAssign = work
        }
        
        if (currentWorkId != null && currentWorkId == work._Id)
        {
            workToUnassign = work
        }
    }

    if (workToAssign != null && (num == 0 || workToUnassign != null) )
    {
        creepInfo.ParentStack.push(workId)
        workToAssign.AssignCreep(creepInfo)
        
        if (workToUnassign != null)
            workToUnassign.UnassignCreep(creepInfo)
            
        return
    }
    
    console.log("##### WorkTracker: Cannot assign Creep to WorkId. room [" + room + "] workId [" + workId + "] creepName [" + creepInfo.CreepName + "] #####")
}

WorkTracker.prototype.UnassignCreepFromWork = function(room, creepInfo)
{
    if (this._Debugging)
        console.log(" WorkTracker.UnassignCreepToWorkId: room [" + room + "] CreepName [" + creepInfo.CreepName + "] ParentStack [" + creepInfo.ParentStack + "]")
        
    if (!this._Work[room])
        return
    
    var currentWorkId = null
    var newWorkId = null
    
    var num = creepInfo.ParentStack.length
    if (num > 0)
        currentWorkId = creepInfo.ParentStack.pop()
    
    // Don't want to pop the work we are going back to
    if (num > 1)
        newWorkId = creepInfo.ParentStack[num - 2]
    
    if (currentWorkId != null)
    {
        var oldWork = this.GetWorkTask(room, currentWorkId)
        if (oldWork)
            oldWork.UnassignCreep(creepInfo)
        else
            console.log("##### WorkTracker: Could not find Work to Unassign from. room [" + room + "] currentWorkId [" + currentWorkId + "] creepName [" + creepInfo.CreepName + "] #####")
    }
    else
        console.log("##### WorkTracker: Could not find Work to Unassign from (currentWorkId == null!) [" + room + "] creepName [" + creepInfo.CreepName + "] #####")
        
    if (newWorkId != null)
    {
        var newWork = this.GetWorkTask(room, newWorkId)
        if (newWork)
            newWork.AssignCreep(creepInfo)
    }
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