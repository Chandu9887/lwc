import { LightningElement } from 'lwc';

export default class ParentEvent extends LightningElement {

   name;
   age;
   email;
   contact;
    getelementfromchild(e)
    {
      this.name=e.detail.Name;
      this.age=e.detail.Age;
      this.contact=e.detail.Contact;
      this.email=e.detail.Email;
      
    }
    extrafunction()
    {
        console.log('hello i from parent')
    }
}