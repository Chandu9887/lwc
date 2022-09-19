import { LightningElement } from 'lwc';

export default class SecondComponent extends LightningElement {

    fromsecond()
    {
        console.log('hello from second 2');
    }
    fromsecondfirst(e){
        console.log(e.detail);
    }


}