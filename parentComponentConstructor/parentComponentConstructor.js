import { LightningElement } from 'lwc';

export default class ParentComponentConstructor extends LightningElement {

    display=true
    
  
    handleClick()
    {
        if(this.display)
        {
            this.display=false
        }else{
            this.display=true
        }
    }

    constructor(){
        super();
        console.log('checking const');
    }

    connectedCallback()
    {
        console.log('callBack conne');
    }

    renderedCallback()
    {
        console.log('rendered function')
    }

    errorCallback(error,stuck){
        console.log(error);
        console.log('erron form error call back')
    }
}