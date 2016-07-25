// ##### Object ######
Plan._Debugging = false

function Plan()
{
    this._PlanRoomName = ""
    this._Finished = false 
}

Plan.prototype.GetPlanRoomName = function()
{
    return this._PlanRoomName
}

Plan.prototype.SetPlanRoomName = function(roomName)
{
    this._PlanRoomName = roomName
}

Plan.prototype.GetFinished = function()
{
    return this._Finished
}

Plan.prototype.SetFinished = function(finished)
{
    this._Finished = finished
}

Plan.prototype.SerializedData = function()
{
    var data = {PlanRoomName: this._PlanRoomName, Finished: this._Finished}
    return data
}

Plan.prototype.DeserializedData = function(data)
{
    this._PlanRoomName = data.PlanRoomName
    this._Finished = data.Finished
}

Plan.prototype.toString = function()
{
    return "Plan"
}

// ##### Exports ######
module.exports = {
	Plan: Plan,
};