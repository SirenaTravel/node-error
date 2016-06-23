/// <reference path="mocha/mocha.d.ts" />
/// <reference path="node/node.d.ts" />
interface ErrorConstructor {
    captureStackTrace(targetObject:any, constructorOpt?:any):void;
}
