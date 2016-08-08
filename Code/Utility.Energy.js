// ##### Object ######
function UtilityEnergy()
{
    this._Debugging = false
}

UtilityEnergy.prototype.Calculate = function(world)
{

	return	{
				UtilType: 'ENERGY', 
				Value: 1.0
			}
}

// ##### Exports ######
module.exports = {
    UtilityEnergy: UtilityEnergy
};