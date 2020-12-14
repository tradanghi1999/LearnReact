// Yeu Cau Jquery
let ajax = {
    get(url) {
        return $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json'
        });
    },
    getDb(url) {
        return this.get(url)
            .then(async data => data.data)
            .then(async db => db.map(item => {
                let x = {}
                x.id = item.id
                x.distances = item.distances
                x.timetravels = item.timeTravels

                let order = {}
                order.weight = item.order.weight
                order.long = item.order.long
                order.lat = item.order.lat
                order.ServiceTime = item.order.serviceTime
                order.timeWindow = item.order.timeWindow

                x.order = order
                return x;
            }))
    },
    convertBack(db) {
        return db.map(x => {
            let item = {}
            item.id = x.id
            item.distances = x.distances
            item.timeTravels = x.timetravels

            let order = {}
            order.weight = x.order.weight
            order.long = x.order.long
            order.lat = x.order.lat
            order.ServiceTime = x.order.serviceTime
            order.timeWindow = x.order.timeWindow

            item.order = order
            return item;
        })
    }
}