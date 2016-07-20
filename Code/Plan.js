// ##### Object ######
Plan._Debugging = true

function Plan()
{
    this.PlanRoom = ""
}

Plan.prototype.GetPlanRoomName = function()
{
    return this.PlanRoomName
}

Plan.prototype.SetPlanRoomName = function(roomName)
{
    this.PlanRoomName = roomName
}

Plan.prototype.GetSerializedData = function()
{
    var data = {PlanRoomName: this.PlanRoomName}
    return data
}

Plan.prototype.Load = function(memory)
{
    this.PlanRoomName = memory.PlanRoomName
}

Plan.prototype.toString = function()
{
    return "Plan"
}

// ##### Exports ######
module.exports = {
	Plan: Plan,
};