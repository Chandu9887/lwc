import { LightningElement,track } from 'lwc';

import youtubeData from '@salesforce/apex/getYoutubeSearchData.youtubeData';
export default class YoutubeSearchData extends LightningElement {
    @track allData;
   
    handleClick()
    {
        var search=this.template.querySelector('.ytb').value;
        youtubeData({str:search}).then(result=>{
            console.log('from result',result);
            
            
           // console.log(result, '3');
            let res=[...result]
            for(let l in res){
                let tempOb = {...result[l]};
                tempOb.select=false;
                res[l]=tempOb
                console.log(res[l])
            }
            this.allData=res;

        }).catch(error=>{
             console.log('from error',error);
           
        })

    }

    handleClickl(event)
    {
        console.log(event.target)
        console.log(event.target.className);
        console.log('Test 1')
        // var mod = this.template.querySelector(".mymodal");
        // console.log(mod)
        // mod.style.display = "block";

        for(let p in this.allData)
        {
            
            if(this.allData[p].open_video__c==event.target.className)
            { 
                // this.ProductData[p].qty=this.ProductData[p].qty+1;
                // console.log(this.ProductData[p].qty);
                // console.log(this.ProductData[p].Id);
                this.allData[p].select=true;
            }else{
                this.allData[p].select=false;

            }

        }
    }

    handleClickz(event){
         console.log('Test 22',event.target.className)
        // var modal = this.template.querySelector(".mymodal");
        // console.log(modal)
        // modal.style.display = "none";
        for(let p in this.allData)
        {
            
            if(this.allData[p].open_video__c==event.target.className)
            { 
                // this.ProductData[p].qty=this.ProductData[p].qty+1;
                // console.log(this.ProductData[p].qty);
                // console.log(this.ProductData[p].Id);
                this.allData[p].select=false;
            }

        }
    }
   
  i=1;
   handleBook(event)
   {
       for(let p in this.allData)
        {
        
            if(this.allData[p].open_video__c==event.target.className)
            { 
                // this.ProductData[p].qty=this.ProductData[p].qty+1;
                // console.log(this.ProductData[p].qty);
                // console.log(this.ProductData[p].Id);
                localStorage.setItem("thumbnails"+this.i,this.allData[p].thumbnails__c);
                localStorage.setItem("title"+this.i,this.allData[p].video_title__c);
                localStorage.setItem("description"+this.i,this.allData[p].youtube_description__c);
                localStorage.setItem("channel Name"+this.i,this.allData[p].Name);
                localStorage.setItem("Video Id"+this.i,this.allData[p].open_video__c);
                console.log('in bookmark');
                this.i++;
            }

        }
   }

    // openModal = false;
    // handleOpenModal() {
    //     this.openModal = true;
    // }
    // handleCloseModal() {
    //     this.openModal = false;
    // }

    


}