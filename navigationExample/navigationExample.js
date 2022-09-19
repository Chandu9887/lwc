import { LightningElement,wire } from 'lwc';

import {CurrentPageReference} from 'lightning/navigation';

import {NavigationMixin} from 'lightning/navigation';

import { createRecord } from 'lightning/uiRecordApi';

export default class NavigationExample extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference) pageRef;
    AccountRedirectPage;
    navigateToObject;
    handleClick()
    {

        console.log(this.pageRef);
        let nameField=this.template.querySelector('.nameField').value;
        let noeField=this.template.querySelector('.noeField').value;
        console.log(nameField);
        let fields={};

        fields['Name']=nameField;
        fields['NumberOfEmployees']=noeField;

        createRecord({'apiName':'Account',fields}).then(result=>{

            console.log(result)
            this.AccountRedirectPage={
                type:'standard__objectPage',
                attributes:{
                    //recordId:nameField,
                    objectApiName:'Contact',
                    actionName:'new'

                },
                state:{
                    defaultFieldValues:'LastName=kumar'
                }
            }
            this[NavigationMixin.Navigate](this.AccountRedirectPage);

        }).catch(error=>{

            console.log(error);
        });

    }

    navigateToObj()
    {
        this.navigateToObject={
            type:'standard__objectPage',
            attributes:{
                //recordId:nameField,
                objectApiName:'Account',
                actionName:'new'

            },
            state:{
                defaultFieldValues:'Name=ABX ,NumberOfEmployees=8000'

            }
        }
        this[NavigationMixin.Navigate](this.navigateToObject);
    }

}