// ##### Object ######
function UpgradeRoomController()
{
    this._Debugging = true
}

UpgradeRoomController.prototype.Calculate = function(world)
{
    console.log("world: " + world)
    
	return	{
				UtilType: 'UPGRADE_ROOM_CONTROLLER', 
				Value: 1.0
			}
}

// ##### Exports ######
module.exports = {
    UpgradeRoomController: UpgradeRoomController
};