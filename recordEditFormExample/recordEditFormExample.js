import { LightningElement,api } from 'lwc';

export default class RecordEditFormExample extends LightningElement {

    @api recordId;

    handleClickReset(){
        const inputField=this.template.querySelectorAll('.accountField');
        inputField.forEach(field=>{
            field.reset();
            
        })
    }   
}