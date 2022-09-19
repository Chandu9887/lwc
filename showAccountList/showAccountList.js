import { LightningElement,wire,track } from 'lwc';

import getListOfAccount from '@salesforce/apex/getListOfAccounts.getListOfAccount';

export default class ShowAccountList extends LightningElement {

       @track accountList;

       //@wire(getListOfAccount,{nameOfAccount:'Acc record4 Batch Batch'}) AccountList;

       @wire(getListOfAccount,{nameOfAccount:'Acc record0Child Record Batch Batch'}) 
       wiredFunction({error,data})
       {
              this.accountList=data;
       }


}