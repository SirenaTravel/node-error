import * as util from 'util'
import {NodeErrorItem} from "./NodeErrorItem";

function addTailSpaces(str:string, maxLength:number):string {
    for (let i=str.length; i < maxLength; i++) str += ' ';

    return str;
}

export class NodeError extends Error {
    protected errors:Error[] = [];
    protected items:NodeErrorItem[] = [];
    protected others:any[] = [];

    constructor(protected context:Object, protected errorMessage:string, ...args:any[] ){
        super();
        Error.captureStackTrace(this, this.constructor);

        if (args && args.length){
            for (let arg of args) {
                if (arg instanceof Error){
                    this.addError(arg);
                    continue;
                }
                if (arg instanceof NodeErrorItem){
                    this.items.push(arg);
                    continue;
                }
                this.others.push(arg);
            }
        }

        this.prepareMessage();
    }

    protected prepareMessage():this {
        this.message = 'thrown at ' + this.context.constructor.name + ': \n       ' + this.errorMessage;

        let maxLabelLength = 0;
        for (let item of this.items) {
            if (item.name.length > maxLabelLength) maxLabelLength = item.name.length;
        }

        for (let item of this.items)   this.message += '\n       - ' + addTailSpaces(item.name + ': ', maxLabelLength+2) + item.getInspectValue();
        for (let value of this.others) this.message += '\n       - ' + util.inspect(value, true, 1, true);
        for (let error of this.errors) this.message += '\n   ----------------------------'
                                                     + '\n   Trace: ' + error.stack;

        return this;
    }

    protected addName(name:string):this{
        this.name = super.name + ': '+name;

        return this;
    };

    protected addItem(name:string, value:any, depth:number = 1):this{
        this.items.push(new NodeErrorItem(name, value, depth));

        return this;
    }

    protected addError(value:Error):this{
        this.errors.push(value);

        return this;
    }

    public toString():string{
        return this.stack;
    }
}
