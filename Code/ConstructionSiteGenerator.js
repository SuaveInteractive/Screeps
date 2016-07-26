var ConstructionSitesGenerator = {}
ConstructionSitesGenerator._Debugging = true

if (!Memory.ConstructionSites)
{
    Memory.ConstructionSites = {}
}

ConstructionSitesGenerator.ERROR_ALREADY_EXISTS_DIFFERENT_TYPE = 

ConstructionSitesGenerator.GetConstructionSite = function(room, structureType)
{
    // TEMP
    var roomPos = room.getPositionAt(34, 21)

    if (this._Debugging)
        console.log("ConstructionSitesGenerator.GetConstructionSite: [" + roomPos + "], room: [" + room + "], structureType: [" + structureType + "]")

    var constructionSites = room.lookForAt(LOOK_CONSTRUCTION_SITES, roomPos) 
    if (constructionSites.length < 1)
    {
        var result = room.createConstructionSite(roomPos, structureType) 
        if (result != OK)
        {
            console.log("Could not create Construction Site at [" + roomPos + "], room: [" + room + "], structureType: [" + structureType + "]")
        }
    }
    else
    {
        var constructionType = constructionSites[0].structureType
        if (constructionType != structureType)
        {
            console.log("Found a different Construction Site of type [" + constructionType + "] at [" + roomPos + "]")
            return -100
        }
        else
        {
            var constructionSiteId = constructionSites[0].id
            
            if (!Memory.ConstructionSites[structureType])
                Memory.ConstructionSites[structureType] = { Sites: [] }
                
            Memory.ConstructionSites[structureType].Sites.push({id: constructionSiteId})
            
            if (this._Debugging)
                console.log("ConstructionSitesGenerator.GetConstructionSite constructionSiteId: " + constructionSiteId)
            
            return constructionSiteId
        }
    }
}

module.exports = ConstructionSitesGenerator;