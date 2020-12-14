import {
    forkJoin,
    Observable,
    from, of, fromEvent,
    combineLatest
} from 'https://dev.jspm.io/rxjs@6/_esm2015';
import * as operators from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';
import { ajax } from 'https://dev.jspm.io/rxjs@6/_esm2015/ajax';


let db = [
[0,4,5,2,4,9,5,5,6,7,2,1,5,3,8,3,8],
[4,0,3,3,8,5,1,9,3,4,6,4,2,8,1,8,4],
[5,3,0,1,2,3,4,5,6,7,8,9,3,6,7,5,1],
[2,3,1,0,1,4,3,7,5,6,7,8,2,5,9,2,6],
[4,8,2,1,0,5,6,6,1,5,3,3,9,2,3,1,2],
[9,5,3,4,5,0,7,3,2,6,7,5,3,1,6,3,4],
[5,1,4,3,6,7,0,1,4,8,9,5,2,4,3,2,4],
[5,9,5,7,6,3,1,0,7,1,5,4,7,8,7,4,3],
[6,3,6,5,1,2,4,7,0,6,4,6,4,2,3,6,3],
[7,4,7,6,5,6,8,1,6,0,9,1,5,1,2,8,5],
[2,6,8,7,3,7,9,5,4,9,0,2,1,7,2,7,4],
[1,4,9,8,3,5,5,4,6,1,2,0,6,5,3,9,7],
[5,2,3,2,9,3,2,7,4,5,1,6,0,4,4,7,9],
[3,8,6,5,2,1,4,8,2,1,7,5,4,0,6,4,2],
[8,1,7,9,3,6,3,7,3,2,2,3,4,6,0,6,1],
[3,8,5,2,1,3,2,4,6,8,7,9,7,4,6,0,8],
[8,4,1,6,2,4,4,3,3,5,4,7,9,2,1,8,0]
];

let customers =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

function reducer(db, resArr)
{
    let tempArr = []
    for(let i = 0; i < db.length; i++)
    {
        tempArr.push(i)
    }
    
    let currentCus = resArr[0];
    let nextArrCusToConsider = db[currentCus].filter(x => x != db[currentCus][0])

    return nextArrCusToConsider;

    
    
}

console.log(reducer(db, customers))







 