import { LightningElement } from 'lwc';

export default class ChildEvent extends LightningElement {


handleClick()
{
    var name=this.template.querySelector('.nameField').value;
    var age=this.template.querySelector('.ageField').value;
    var contact=this.template.querySelector('.contactField').value;
    var email=this.template.querySelector('.emailField').value;


    let getInformation=new CustomEvent('getelement',{
        detail:{
            'Name':name,
            'Age':age,
            'Email':email,
            'Contact':contact

        },
        bubbles:true
    })

    this.dispatchEvent(getInformation);
}
    

}