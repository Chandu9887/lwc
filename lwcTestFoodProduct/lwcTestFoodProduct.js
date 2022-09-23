import { LightningElement } from 'lwc';

import getListOfProduct from '@salesforce/apex/getListOfProducts.getListOfProduct'

export default class LwcTestFoodProduct extends LightningElement {

    ProductData;
    Count;
    selection=false;
    handleClick()
    {
        getListOfProduct().then(result=>{
            console.log(result);
            this.ProductData=result;


        }).catch(error=>{

            console.log(error);
            
        })
    } 
    
    handlePlus()
    {
       console.log('TEst');
       this.Count+=1;
    }
    handleMinus()
    {
        if(this.Count===1)
        {
         this.selection=false;
        }else{
            this.Count-=1;

        }
       
        
    }
    handleAdd()
    {
        this.Count=1;
        
        this.selection=true;
    }
    

}