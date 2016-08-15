function ResourceAssigner()
{
    this._Debugging = true
    
    if (this._Debugging)
        console.log("ResourceAssigner Constructor")
        
    this._Sites = {}
}

ResourceAssigner.prototype.GetAvailableMiningSite = function(room, resource, position, workTracker)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.GetAvailableMiningSite: position [" + position + "]")
    
    if (!this._Sites[room] || !this._Sites[room].Parsed)
        this.CreateResourceSites(room, workTracker)
    
    var sortedSource = this.GetClosestResourceSites(room, position)
    
    var selectedSite = null
    for (var i in sortedSource)
    {
        var workTask = workTracker.GetWorkTask(room, sortedSource[i].site.WorkId)
        var numberOfWorkers = workTask.GetAssignCreeps().length
        
        if (this._Debugging)
        {
            console.log(" Site: " + sortedSource[i].site)
            console.log(" Distance: " + sortedSource[i].distance)
            console.log(" Id: " + sortedSource[i].id)
            console.log(" WorkingPositions: " + sortedSource[i].site.WorkingPositions)
            console.log(" MaximumWorkingCapacity: " + sortedSource[i].site.MaximumWorkingCapacity)
            console.log(" CurrentWorkingCapacity: " + sortedSource[i].site.CurrentWorkingCapacity)
            console.log(" Containers: " + sortedSource[i].site.Containers)
            console.log(" WorkId: " + sortedSource[i].site.WorkId + " [" + numberOfWorkers + "]")
        }
        
        if (sortedSource[i].site.CurrentWorkingCapacity < sortedSource[i].site.MaximumWorkingCapacity &&
            numberOfWorkers < sortedSource[i].site.WorkingPositions)
        {
            selectedSite = sortedSource[i]
            break
        }
    }
    
    if (selectedSite == null)
    {
        console.log("##### Could not find a resource site to work [" + room + "] #####")
        return null    
    }
    else
    {
        return selectedSite.site
    }
}

ResourceAssigner.prototype.AssignCreepToSite = function(room, creepHarvester, miningSiteId)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.AssignCreepToSite, creepHarvester: " + creepHarvester + ", miningSiteId: " + miningSiteId)
    
    if (!this._Sites[room] || !this._Sites[room].Parsed)
        this.CreateResourceSites(room)
        
    var roomSites = this._Sites[room]
    var miningSite = roomSites.Sites[miningSiteId]

    miningSite.AssignedWorkers.push(creepHarvester)
    
    miningSite.CurrentWorkingCapacity = this.GetCurrentMiningCapacity(miningSite)
}

ResourceAssigner.prototype.UnassignCreepToSite = function(room, creep, miningSiteId)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.UnassignCreepToSite, creep: " + creep + ", miningSiteId: " + miningSiteId)
    
    var roomSites = this._Sites[room]
    var miningSite = roomSites.Sites[miningSiteId]

    var index = miningSite.AssignedWorkers.indexOf(creep)
    miningSite.AssignedWorkers.splice(index, 1)

    miningSite.CurrentWorkingCapacity = this.GetCurrentMiningCapacity(miningSite)
}

ResourceAssigner.prototype.GetCurrentMiningCapacity = function(miningSite)
{
    var total = 0
    
    for (var i in miningSite.AssignedWorkers)
    {
        var worker = miningSite.AssignedWorkers[i]
        for (var j in worker.body)
        {
            var part = worker.body[j]
            if (part.type == WORK)
                total += HARVEST_POWER
        }
    }
    
    if (total > 0)
        total = (total * ENERGY_REGEN_TIME) / SOURCE_ENERGY_CAPACITY
   
    return total
}

ResourceAssigner.prototype.UpdateCreeps = function(room)
{
    if (this._Sites[room] == null || this._Sites[room].Sites == null)
        return 
        
    if (this._Debugging)
        console.log(" ResourceAssigner.UpdateCreeps")
        
    for (var resSiteRoom in this._Sites[room].Sites)
    {
        var site = this._Sites[room].Sites[resSiteRoom]
        for (var i in site.AssignedWorkers)
        {
            for (var j in site.AssignedWorkers)
            {
                var worker = site.AssignedWorkers[j]
                
                if (!Game.creeps[worker.name])
                    this.UnassignCreepToSite(room, worker.id, site.id)
            }
        }
    }
}

ResourceAssigner.prototype.GetClosestResourceSites = function(room, position)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.GetClosestResourceSites, room [" + room + "], position [" + position + "]")
        
    var sortedSources = []
    
    for (var id in this._Sites[room].Sites)
    {
        var site = this._Sites[room].Sites[id]
        var source = this._Sites[room].Sources[id]
        var distance = position.getRangeTo(new RoomPosition(source.SourcePos.x, source.SourcePos.y, source.SourcePos.roomName))
        sortedSources.push({site: site, distance: distance, id: source.id})
    }
  
    sortedSources.sort(function (a, b) 
    {
        if (a.distance > b.distance) 
        {
            return 1;
        }
        if (a.distance < b.distance) 
        {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    
    return sortedSources
}

ResourceAssigner.prototype.GetResourceSites = function(room)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.GetResourceSites: room [" + room + "]")
        
    if (this._Sites[room] == null || this._Sites[room].Sites == null)
        return 
        
    return this._Sites[room].Sites
}

ResourceAssigner.prototype.CreateResourceSites = function(room, workTracker)
{
    if (this._Sites[room] != null && this._Sites[room].Sites != null)
        return 
        
    if (this._Debugging)
        console.log(" ResourceAssigner.CreateResourceSites: room [" + room + "] workTracker [" + workTracker + "]")
        
    if (this._Sites[room] == null)
    {
        this._Sites[room] = {}
        this._Sites[room].Sites = {}
    }
    
    var roomSources = Memory.ParsedRooms[room].Sources
    
    for (var hash in roomSources)
    {
        var source = roomSources[hash]
        var workId = workTracker.CreateWorkTask(room, 'HarvestSource', {HarvestSite: source.id})

        this._Sites[room].Sites[source.id] = 
        {
            id: source.id,
            AssignedWorkers: [],
            WorkingPositions: source.HarvesterPositions.length,
            MaximumWorkingCapacity: 1.0,
            CurrentWorkingCapacity: 0,
            Containers: [],
            WorkId: workId,
        }
    }
    this._Sites[room].Parsed = true
}

ResourceAssigner.prototype.SerializedData = function()
{
    var data = {}
    
    data.Sites = this._Sites
    
    return data
}

ResourceAssigner.prototype.DeserializedData = function(data)
{
    if (data == null)
        return
        
    if (data.Sites != null)
        this._Sites = data.Sites
}

module.exports = ResourceAssigner;