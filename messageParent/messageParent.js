import { LightningElement,api } from 'lwc';

export default class MessageParent extends LightningElement {

    @api testProperty;

    handleClick()
    {
        this.testProperty=this.template.querySelector('.inputFieldClass').value;
    }
}
