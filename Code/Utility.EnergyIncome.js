// ##### Object ######
function UtilityEnergyIncoming()
{
    this._Debugging = false
}

UtilityEnergyIncoming.prototype.Calculate = function(room, worldState)
{
    var roomLevel = worldState.Rooms[room].RoomControllerLevel
    var energyAvailable = worldState.Rooms[room].EnergyAvailable
    var numberOfHarvesters = worldState.CreepInRoles.CREEP_HARVESTERS
    
    var result = 0.00
    
    if (energyAvailable > 0)
    {
        result = 1.00 - (numberOfHarvesters / 3.00)
        
        if (this._Debugging)
        {
            console.log(" UtilityEnergyIncoming:")
            console.log("   " + result + " = 1.00 - (" + numberOfHarvesters + " / 3.00)" )
        }
    }
        
    result.toFixed(2)
    
	return	{
				UtilType: 'ENERGY_INCOME', 
				Value: result
			}
}

// ##### Exports ######
module.exports = {
    UtilityEnergyIncoming: UtilityEnergyIncoming
};
