import { LightningElement,api} from 'lwc';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LightningRecordFormExample extends LightningElement {

    @api recordId;
    @api objectApiName;
    fields=['Name','NumberOfEmployees'];

    handleSuccess()
    {
        let ev=new ShowToastEvent({

            title:'Record is created',
            message:'congrats',
            variant:'Success'


        })
        this.dispatchEvent(ev);
    }
}