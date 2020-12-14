let d3Converter = {
    importDb(db)
    {
        this.db = db
    },
    importRoutes(routes)
    {
        this.routes = routes
    },
    import(ids, db, routes)
    {
        this.ids = ids,
        this.db = db,
        this.routes = routes
    },
    importScheme(scheme)
    {
        this.scheme = scheme
    },
    getRoutific: function(routes)
    {
        let routific = [];
        for(let i = 0; i < routes.length;i++)
        {
            let routeSpecs = [0];
            while(routes[i+1] > 0 && i < routes.length){
                routeSpecs.push(routes[i+1])
                i++;
            }
            routeSpecs.push(0)
            routific.push(routeSpecs)
        }
        return routific.filter(x => x.length > 2);
    },
    getNodesOnId(){
        return this.getNodesOn(x => x.id)
    },
    getNodesOn(converterFn)
    {
        let nodes = ids.map(id => {
            if(id.id !=ids[0].id)  
            {
              let cusIndex = ids.findIndex(el => el.id == id.id)
              let cusId = {}
              cusId.id = converterFn(id)
              //cusId.name = id.name
              cusId.group = this.routes.findIndex(e => e.includes(cusIndex)) + 2
              return cusId
            }
            let depotId = {}
            depotId.id = converterFn(id)
            //depotId.name = id.name
            depotId.group = 1
            return depotId
          })
          return nodes
    },
    getTimeTravels(){
        return this.db.map(x => x.timetravels)
    },

    getLinks(){
        return this.getLinksOn(x=> x.id)

    },
    getLinksOn(converterFn)
    {
        let timetravels = this.getTimeTravels()
        let links = []
      
        this.routes.forEach(r =>{
            for(let i = 0; i < r.length - 1 ; i++)
            {
                let link={}
                link.source = converterFn(ids[r[i]])
                link.target = converterFn(ids[r[i+1]])
                link.value = timetravels[r[i]][r[i+1]]*10
                links.push(link)
            }
        })

        return links;
    },
    getGraphOn(converterFn)
    {
        let graph = {}
        graph.nodes = this.getNodesOn(converterFn)
        graph.links = this.getLinksOn(converterFn)
        return graph
    },
    getGraph()
    {
        return this.getGraphOn(x=> x.id)
    },
    getNodeOnIndex(index)
    {
        return db[index].order
    },
    getNodeColorOnIndex(index)
    {
        return this.scheme[this.getNodesOnId()[index].group]
    },
    getNodeColorOnGroup(groupIndex)
    {
        return this.scheme[groupIndex]
    }
    
    



}