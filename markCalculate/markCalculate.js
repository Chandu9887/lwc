import { LightningElement } from 'lwc';

export default class MarkCalculate extends LightningElement {
   
   
    Message='';
    showDiv=false;
    showResult(event)
    {
        console.log(event);
        console.log('Bug test 2');
        var mm=this.template.querySelector('[data-id="jk"]').value;
        var sm=this.template.querySelector('[data-id="sk"]').value;

        var percentage=((parseInt(mm)+parseInt(sm))/200)*100;
        console.log(percentage);
        this.showDiv=true
        if(percentage>60)
        {
            this.Message='pass';
            console.log('pass')
        }else{
            this.Message='Failed'
            console.log('Failed')
        }

    }
}