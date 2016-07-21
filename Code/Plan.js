// ##### Object ######
Plan._Debugging = false

function Plan()
{
    this._PlanRoomName = ""
}

Plan.prototype.GetPlanRoomName = function()
{
    return this._PlanRoomName
}

Plan.prototype.SetPlanRoomName = function(roomName)
{
    this._PlanRoomName = roomName
}

Plan.prototype.SerializedData = function()
{
    var data = {PlanRoomName: this._PlanRoomName}
    return data
}

Plan.prototype.DeserializedData = function(data)
{
    this._PlanRoomName = data.PlanRoomName
}

Plan.prototype.toString = function()
{
    return "Plan"
}

// ##### Exports ######
module.exports = {
	Plan: Plan,
};