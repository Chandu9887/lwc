import { LightningElement } from 'lwc';

import createAccountRecord from '@salesforce/apex/toCreateRecords.createAccountRecord';

export default class OuterComponent extends LightningElement {

    handleClick(event)
    {
        var name=this.template.querySelector('[data-id="nameField"]').value;
        var noe=this.template.querySelector('[data-id="noeField"]').value;
        var annual=this.template.querySelector('[data-id="annualField"]').value;
        var rating=this.template.querySelector('[data-id="ratingField"]').value;

        createAccountRecord({Name:name,Noe:noe,Annual:annual,Rating:rating}).then(result=>{

            this.template.querySelector('c-inner-component').displayRecordOnChild(name,noe,annual,rating);

        }).catch(error=>{

        })
        
    }
}