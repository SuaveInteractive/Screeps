// ##### Object ######
function UtilitySpawnLabourer()
{
    this._Debugging = false
}

UtilitySpawnLabourer.prototype.Calculate = function(room, worldState)
{
    var numberOfCreeps = worldState.NumberOfCreeps
    
    var result = 0.0
    
    if (numberOfCreeps < 1)
        result = 1.0

    result.toFixed(2)
    
    if (this._Debugging)
    {
        console.log(" UtilitySpawnLabourer:")
        console.log("   numberOfCreeps: " + numberOfCreeps + " result: " + result)
    }
    
	return	{
				UtilType: 'SPAWN_LABOURER', 
				Value: result
			}
}

// ##### Exports ######
module.exports = UtilitySpawnLabourer
