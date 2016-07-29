var BuildStructure = require("Work.BuildStructure")
var HarvestSource = require("Work.HarvestSource")

var WorkTracker = {}
WorkTracker._Debugging = true

if (!Memory.Work)
{
    Memory.Work = {}
    Memory.Work.CurrentWorkId = 0
}

WorkTracker.CreateWorkTask = function(room, workType, data)
{
    if (this._Debugging)
        console.log(" WorkTracker.CreateWorkTask: room [" + room + "] workType [" + workType + "] data [" + data + "]")
        
    if (!Memory.Work[room])
        Memory.Work[room] = []
        
    var newWork = null
    var newWorkId = null
    if (workType == 'BUILD_STRUCTURE')
        newWork = new BuildStructure(room, data)
    else if (workType == 'HARVEST_SOURCE')
        newWork = new HarvestSource(room, data)
    
    if (newWork)
    {
        newWorkId = Memory.Work.CurrentWorkId
        newWork.SetWorkId(newWorkId)
        Memory.Work.CurrentWorkId++
    }
    
    Memory.Work[room].push(newWork)
    
    return newWorkId
}

WorkTracker.GetWorkForId = function(room, id)
{
    if (!Memory.Work[room])
        return
    
    for (var i in Memory.Work[room])
    {
        console.log("GetWorkForId: " + Memory.Work[room][i])
    }
}

module.exports = WorkTracker;