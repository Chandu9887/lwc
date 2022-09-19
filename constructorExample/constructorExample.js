import { LightningElement } from 'lwc';

export default class ConstructorExample extends LightningElement {
   
   testproprty=''
    constructor(){
        super();
        console.log('checking constructor');
    }

    connectedCallback()
    {
        console.log('callBack connected');
        testproprty='false'
    }

    renderedCallback()
    {
        console.log('rendered function')
    }

    disconnectedCallback()
    {
        console.log('call from disconnected callback')
    }
}