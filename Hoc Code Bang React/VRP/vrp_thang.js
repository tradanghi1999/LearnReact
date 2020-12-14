let vrp_thang = {
    import (db, ids, vehicles) {
        this.orders = db
        this.ids = ids
        this.vehicles = vehicles
    },
    getRoutific: function(routes) {
        let routific = [];
        for (let i = 0; i < routes.length; i++) {
            let routeSpecs = [0];
            while (routes[i + 1] > 0 && i < routes.length) {
                routeSpecs.push(routes[i + 1])
                i++;
            }
            routeSpecs.push(0)
            routific.push(routeSpecs)
        }
        return routific.filter(x => x.length > 2);
    },
    findNextPoint(arr, arrayTempt, orders1) {
        let shortestWay = Number.MAX_VALUE;
        let lastIndex = arr[arr.length - 1];
        let distances = orders1[lastIndex].distances;
        let nextIndex;

        distances.forEach((e, index) => {
            if (arr.indexOf(index) < 0 && e < shortestWay && arrayTempt.indexOf(index) < 0) {
                shortestWay = e;
                nextIndex = index;
            }
        });

        return nextIndex;
    },
    calIndexPoint(arr) {
        return arr.length;
    },
    funcGetLocation(arr) {
        let routeLocation = [];
        arr.forEach((e) => {
            const long = orders[e].order.long;
            const lat = orders[e].order.lat;
            routeLocation.push([long, lat]);
        });
        return routeLocation;
    },
    funcIndexRoute(firstId, capacity, time, orders1) {
        let routeIndex = [];
        let routeTempt = [];
        let runWhile = true;
        let cargoVolume = 0;
        let totalTimeTravel = 0;
        let arrayTempt = [];
        let arraytime = orders1[0].order.timeWindow;
        // console.log("hihihihi",hihi);
        let count = 0;
        let firstIndex = orders1.findIndex((e) => e.id === firstId);
        routeIndex.push(firstIndex);

        while (runWhile) {
            let nextIndex = this.findNextPoint(routeIndex, arrayTempt, orders1);

            if (nextIndex) {
                function funcHandleConditions() {
                    if (time) {

                        const timeTravle = Math.round((orders1[nextIndex].timetravels[routeIndex[routeIndex.length - 1]]) * 100) / 100;;
                        const timeService =
                            Math.round((orders1[nextIndex].order["ServiceTime"]) * 100) / 100;
                        let indexATimewindows = Math.round((orders1[nextIndex].order["timeWindow"][0] + timeService) * 100) / 100;


                        let indexBTimewindows =
                            Math.round((orders1[nextIndex].order["timeWindow"][1] + timeService) * 100) / 100;;
                        let indexCTimewindows =
                            Math.round((orders1[nextIndex].order["timeWindow"][0]) * 100) / 100;;
                        let indexDTimewindows =
                            Math.round((orders1[nextIndex].order["timeWindow"][1]) * 100) / 100;


                        let a = Math.round((arraytime[0] + timeTravle) * 100) / 100;
                        let b = Math.round((arraytime[1] - timeTravle) * 100) / 100;
                        let c = 0.00;
                        let d = 0.00;
                        if (a > indexCTimewindows) {
                            c = Math.round((a + timeService) * 100) / 100;;

                        } else {

                            c = indexATimewindows;

                        }
                        if (b < indexDTimewindows) {
                            d = Math.round((b + timeService) * 100) / 100;;
                        } else {
                            d = indexBTimewindows;
                        }


                        if ((a > indexCTimewindows && a > indexDTimewindows) || (b < indexCTimewindows && b < indexDTimewindows)) {

                            arrayTempt.push(nextIndex);
                            const lastIndexRouter = routeIndex[routeIndex.length - 1];

                            const result = routeIndex.filter(x => x != 0);
                            if (arrayTempt.length + result.length === orders1.length - 1) {
                                if (lastIndexRouter === 0) {
                                    runWhile = false;
                                }


                                routeIndex.push(0);
                                arrayTempt = [];
                                nextIndex = firstIndex;
                                totalTimeTravel = 0;
                                cargoVolume = 0;

                                arraytime = orders1[0].order.timeWindow;
                            }

                        } else {
                            if (capacity) {
                                const orderWeight = orders1[nextIndex].order.weight;
                                cargoVolume += orderWeight;

                                if (cargoVolume > capacity) {
                                    routeIndex.push(0);
                                    nextIndex = firstIndex;
                                    totalTimeTravel = 0;
                                    cargoVolume = 0;

                                    arrayTempt = [];
                                    arraytime = orders1[0].order.timeWindow;
                                } else {
                                    routeIndex.push(nextIndex);
                                    arrayTempt = [];
                                    if (c > d) {


                                        arrayTempt = [];
                                        routeIndex.push(0);

                                        totalTimeTravel = 0;
                                        cargoVolume = 0;

                                        arraytime = orders1[0].order.timeWindow;
                                    } else {

                                        arraytime = [c, d]

                                    }


                                }

                            }


                        }


                    }

                }

                funcHandleConditions();
            } else {
                runWhile = false;
                routeIndex.push(0);
            }
        }
        return routeIndex;
    },
    run() {
        let orders1 = this.orders;
        let idDepot = this.ids[0].id
        let weight_limit = this.vehicles.weight_limit

        const routeIndex = this.funcIndexRoute(idDepot, weight_limit, -1, orders1);
        //   let Routific= getRoutific(routeIndex);
        return this.getRoutific(routeIndex)
    }
}