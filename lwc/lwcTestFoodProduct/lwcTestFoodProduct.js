import { LightningElement, track, api } from 'lwc';

import getListOfProduct from '@salesforce/apex/getListOfProducts.getListOfProduct';

import getCreateOrders from '@salesforce/apex/getCreateOrder.getCreateOrders'

export default class LwcTestFoodProduct extends LightningElement {

    @track ProductData;
    Count=0;
    selection=false;
    ShowBtn=false;
    userId;
    orderPlaced=false;
    @api recordId;
    connectedCallback() {
        //code
        this.handleClick()
    }
    
    handleClick()
    {
        getListOfProduct().then(result=>{
            //result.qty=0;
            console.log(result, '3');
            let res=[...result]
            for(let l in res){
                let tempOb = {...result[l]};
                tempOb.qty=0;
                tempOb.select=false;
                res[l]=tempOb
                console.log(res[l])
            }
             this.ProductData=res;


        }).catch(error=>{
            console.log(error);       
        })
    } 
    
    handlePlus(event)
    {
        //console.log(event.target.value,'plus')
       // let newqty=this.template.querySelectorAll('[data-id={pro.id}]').value;
        for(let p in this.ProductData)
        {
            
            if(this.ProductData[p].Id==event.target.value)
            { 
                this.ProductData[p].qty=this.ProductData[p].qty+1;
                console.log(this.ProductData[p].qty);
                console.log(this.ProductData[p].Id);
            }

        }
        //console.log(newqty,'plus out put');
       //console.log('TEst');
       //this.Count+=1;
    }
    handleMinus(event)
    {
        // //console.log(event.target.value,'minus')
        // //if(this.Count==1)
        // {
        //  this.selection=false;
        //  this.Count=0;
        // }else{
        //     this.Count-=1;

        // }

        for(let p in this.ProductData)
        {
            
            if(this.ProductData[p].Id==event.target.value)
            {
                if(this.ProductData[p].qty==1)
                {
                    this.ProductData[p].qty=0;
                    this.ProductData[p].select=false;
                    //this.selection=false;
                    console.log(this.ProductData[p].qty);
                    console.log(this.ProductData[p].Id);
                }else{
                    this.ProductData[p].qty=this.ProductData[p].qty-1;
                    console.log(this.ProductData[p].qty);
                    console.log(this.ProductData[p].Id);
                }
                
            }

        }
       
        
    }
    handleAdd(event)
    {
        // this.Count=1;
        
        //this.selection=true;

        for(let p in this.ProductData)
        {
            
            if(this.ProductData[p].Id==event.target.value)
            {
                
                    this.ProductData[p].qty=1;
                    this.ProductData[p].select=true;
                    console.log(this.ProductData[p].select);
                    console.log(this.ProductData[p].qty);
                    console.log(this.ProductData[p].Id);
               

            }

        }
        
    }

    handleOrder()
    {
        
        for(let p in this.ProductData)
        {
            if(this.ProductData[p].qty!=0)
            {
                getCreateOrders({customerId:this.recordId,proId:this.ProductData[p].Id,pQuantity:this.ProductData[p].qty}).then(result=>{
                    this.orderPlaced=true;
                    console.log('record is created');

                }).catch(error=>{
                    console.log('something went wrong');
                    console.log(error);
                })
            }
        }
    }
    
    
    

}