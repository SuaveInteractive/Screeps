var BuildStructure = require("Work.BuildStructure")
var HarvestSource = require("Work.HarvestSource")

module.exports = {
    _Debugging: true,
    
    GetWork: function(workType, room, data)
    {
        if (this._Debugging)
            console.log(" WorkFacotry: workType [" + workType + "] room [" + room + "] data [" + data + "]")
            
        var newWork = null
        
        if (workType == "HarvestSource")
            newWork = new HarvestSource(room, data)
        else if (workType == "BuildStructure")
            newWork = new BuildStructure(room, data)
        
        if (newWork != null)    
        {
            newWork.SetWorkId(data.Id)
            return newWork
        }
        else
        {
            console.log("##### WorkFactory: Cannot find Class for [" + workType + "] #####")
        }
    }
};