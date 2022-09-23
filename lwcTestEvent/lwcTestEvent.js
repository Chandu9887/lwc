import { LightningElement } from 'lwc';

import getCostumObjects from '@salesforce/apex/getCostumObject.getCostumObjects';

import {NavigationMixin} from 'lightning/navigation';

export default class LwcTestEvent extends NavigationMixin(LightningElement) {

    usrnm;
    pswrd;
    AccountRedirectPage;
    handleClick()
    {
        this.usrnm=this.template.querySelector('.user').value;
        this.pswrd=this.template.querySelector('.pass').value;

        getCostumObjects({username:this.usrnm,pswrd:this.pswrd}).then(result=>{

            console.log(result.id);
            this.AccountRedirectPage={
                type: 'standard__webPage',
                attributes: {
                    url: "https://cyntexa-5c8-dev-ed.lightning.force.com/lightning/r/zomato_customer__c/"+result[0].id+"/view"
                }
            }
            this[NavigationMixin.Navigate](this.AccountRedirectPage);

        }).catch(error=>{
            console.log('something went wrong');
            console.log(error);
        })

    }
}