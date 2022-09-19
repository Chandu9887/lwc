import { LightningElement ,api} from 'lwc';

import getListOfAccounts from '@salesforce/apex/toCreateRecords.getListOfAccounts';

export default class InnerComponent extends LightningElement {

    Name;
    Noe;
    Revenue;
    Rating;
    ListOfAccount;
    
    @api displayRecordOnChild(name,noe,revenue,rating)
    {
        getListOfAccounts().then(result=>{

            this.ListOfAccount=result;

        }).catch(error=>{
            console.log('You have error')
            console.log(error);
        })
    }


    // getAccountRecordJS()
    // {
    //     getListOfAccounts().then(result=>{

    //         this.ListOfAccount=result;

    //     }).catch(error=>{
    //         console.log('You have error')
    //     })
    // }

    connectedCallback(){

        getListOfAccounts().then(result=>{

            this.ListOfAccount=result;

        }).catch(error=>{
            console.log('You have error')
        })
    }

    


}