var BuildStructure = require("Work.BuildStructure")
var HarvestSource = require("Work.HarvestSource")
var TransferResource = require("Work.TransferResource")
var RefillSpawn = require("Work.RefillSpawn")

module.exports = {
    _Debugging: false,
    
    GetWork: function(workType, room, data, workTracker)
    {
        if (this._Debugging)
            console.log(" WorkFacotry: workType [" + workType + "] room [" + room + "] data [" + data + "]")
            
        var newWork = null
        
        if (workType == "HarvestSource")
            newWork = new HarvestSource(room, data, workTracker)
        else if (workType == "BuildStructure")
            newWork = new BuildStructure(room, data, workTracker)
        else if (workType == "TransferResource")
            newWork = new TransferResource(room, data, workTracker)
        else if (workType == "RefillSpawn")
            newWork = new RefillSpawn(room, data, workTracker)
            
        if (newWork != null)    
        {
            return newWork
        }
        else
        {
            console.log("##### WorkFactory: Cannot find Class for [" + workType + "] #####")
        }
    }
};