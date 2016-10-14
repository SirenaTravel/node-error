import * as errors from './../../build/index'

class BaseTestError extends errors.Error {
    name = 'TEST_ERROR';
}

class TestError extends BaseTestError {
    constructor(context:Object, message:string, obj:Object) {
        super(context, 'Test Error created');
        
        this.addName('TEST_ERROR')
            .addItem('1',123)
            .addItem('message',message)
            .addItem('some object passed', obj)
            .prepareMessage();
    }
}

class NestedError extends BaseTestError {
    constructor(context:Object, message: string, e:Error){
        super(context, 'Nested Error', e, message);
        this.addName('NESTED_ERROR')
    }
}

describe('TEST ERRORS', () => {
    let e:Error;
    it('Make', () => {
        e = new NestedError(this, 'some text message',
            new TestError(this, 'internal error message', {a:1,b:3,c:'foo',d:'dsfsadfksgf8397r9uhfudfiuhdjdf  jdsfhiusdf9ds99df9ysd98  98d f9dsyf9ysd9y98y98y98 sd ydsaf9ydsf', f:5555})
        );
    });
    it('Print', () => {
        console.log(e.toString());
    });
});
