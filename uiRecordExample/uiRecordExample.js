import { LightningElement ,wire} from 'lwc';

import {createRecord,getRecord} from 'lightning/uiRecordApi';

import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class UiRecordExample extends LightningElement {
    
    @wire(getRecord,{recordId:'0015i00000PITbfAAH',fields:['Account.Name','Account.NumberOfEmployees']}) accountRecord;
    nameVar;
    handleClick()
    {

    this.nameVar=this.accountRecord.data.fields.Name.value;

    console.log('Test')
    let name=this.template.querySelector('.nameField').value;
    console.log('Test 2')
    let noe=this.template.querySelector('.noeField').value;
    console.log('Test 3')

    console.log(name)
    let objectApiName='Account';
    let fields={};
    fields['Name']=name;
    fields['NumberOfEmployees']=noe;

    let recordJson={
        'apiName':objectApiName,
        fields

    }

    createRecord(recordJson).then(result=>{
        console.log(result.id)

        let toastMessage= new ShowToastEvent({
            title:'Success',
            variant:'Warning',
            message:'Record is Successfully Created'+result.id
        })
        this.dispatchEvent(toastMessage);
    }).catch(error=>{
        console.log(error);
        let toastMsg=new ShowToastEvent({
            title:'Error',
            variant:'info',  //we can also success and error
            message:'There is some error'+error
        })

        this.dispatchEvent(toastMsg);
    });

    }

}    