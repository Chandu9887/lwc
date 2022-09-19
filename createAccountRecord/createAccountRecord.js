import { LightningElement } from 'lwc';

import myMethod from '@salesforce/apex/createAccountRecordLWC.myMethod' ;

export default class CreateAccountRecord extends LightningElement {

    nameField;
    noeField;

    handleClick()
    {
        this.nameField=this.template.querySelector('[data-id="name"]').value;
        this.noeField=this.template.querySelector('[data-id="emp"]').value;
        console.log(this.nameField)
        myMethod({accountName:this.nameField,numberOfEmployees:this.noeField}).then(result=>{
            console.log('record is created')
        }).catch(error=>{
            console.log('something error');
        });
       
    }
}