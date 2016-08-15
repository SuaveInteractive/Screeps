// ##### Object ######
function DevelopeResourceSite()
{
    this.true = true
}

DevelopeResourceSite.prototype.Calculate = function(room, worldState)
{
    console.log(" DevelopeResourceSite.worldState : " + worldState)
    
    var availableStructures = worldState.Rooms[room].AvailableStructures
    var numberOfContainersAvailable = availableStructures.container

    
     
    var result = 0.00
    
   // if (numberOfUnassignedCreeps > 0 && numberOfContainersAvailable > 0)
   //     result = 3.0
        
	return	{
				UtilType: 'DEVELOPE_RESOURCE_SITES', 
				Value: Math.min(result, 1.0)
			}
}

// ##### Exports ######
module.exports = DevelopeResourceSite