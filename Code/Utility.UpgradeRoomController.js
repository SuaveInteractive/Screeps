// ##### Object ######
function UpgradeRoomController()
{
    this._Debugging = false
}

UpgradeRoomController.prototype.Calculate = function(world)
{
	return	{
				UtilType: 'UPGRADE_ROOM_CONTROLLER', 
				Value: 1.0
			}
}

// ##### Exports ######
module.exports = {
    UpgradeRoomController: UpgradeRoomController
};