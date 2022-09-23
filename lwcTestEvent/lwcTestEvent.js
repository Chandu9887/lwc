import { LightningElement } from 'lwc';

import getCostumObjects from '@salesforce/apex/getCostumObject.getCostumObjects';

export default class LwcTestEvent extends LightningElement {

    usrnm;
    pswrd;
    handleClick()
    {
        this.usrnm=this.template.querySelector('.user').value;
        this.pswrd=this.template.querySelector('.pass').value;

        getCostumObjects({username:this.usrnm,pswrd:this.pswrd}).then(result=>{

            console.log(result);
        }).catch(error=>{
            console.log('something went wrong');
            console.log(error);
        })

    }
}