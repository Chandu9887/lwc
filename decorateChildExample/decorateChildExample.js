import { LightningElement,api,track } from 'lwc';

export default class DecorateChildExample extends LightningElement {

    @api childTestProperty='intial part'
    @track trackchild=''
    handleChange(event)
    {
       // this.childTestProperty=event.target.value;
       this.trackchild='anything for test'
       console.log(this.trackchild);
    }

    renderedCallback()
    {
       // this.trackchild='test'
        console.log('from rendered ')
    }
}