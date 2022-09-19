import { LightningElement } from 'lwc';

export default class ThirdComponent extends LightningElement {

    handleClick()
    {
        console.log('hi 2')
        let fromThird=new CustomEvent('gotothird',{
            detail:'from third',
            bubbles:true,
            composed:true                     
        })
        this.dispatchEvent(fromThird);
    }
    
}