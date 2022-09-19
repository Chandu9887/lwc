import { LightningElement } from 'lwc';

export default class DecorateExample extends LightningElement {

    nameOnParent=''
    testFunction()
    {

        this.nameOnParent=this.template.querySelector('c-decorate-child-example').childTestProperty;
        //console.log(value)
       // console.log(childTestProperty);
    }
}