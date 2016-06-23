import * as util from 'util'

export class NodeErrorItem {
    constructor(public name:string, public value:any, protected depth:number = 1) {}

    getInspectValue(depth:number = 1):string {
        return util.inspect(this.value, true, depth || this.depth, true);
    }
}