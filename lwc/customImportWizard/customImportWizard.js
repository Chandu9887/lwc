import { LightningElement,track} from 'lwc';
//import getAllo from '@salesforce/apex/getAllob.getAllo';
import saveFile from '@salesforce/apex/lwcCSVUploaderController.saveFile';
import uploadFile from '@salesforce/apex/lwcCSVUploaderController.uploadFile';
import getAllo from '@salesforce/apex/getAllob.getAllo';
import getFields from '@salesforce/apex/getAllFieldValues.getFields';


import {ShowToastEvent} from 'lightning/platformShowToastEvent';



export default class CustomImportWizard extends LightningElement {

   @track fieldData;
   @track fileName = '';
   @track fieldLabel;
  text=[];
   @track UploadFile = 'Upload CSV File';

   @track showLoadingSpinner = false;

   @track isTrue = false;

   obk;
   newFieldData;
   selectedRecords;
   globalElement=[];
   filesUploaded = [];

   file;

   fileContents;

   fileReader;

   content;

   MAX_FILE_SIZE = 1500000;

   connectedCallback() {

        getAllo().then(result => {
            console.log('from wixard');
            for (let i = 0; i < result.length; i++) {
                //console.log(result[i]);
                const op = {
                    label: result[i],
                    value: result[i]
                };
                this.soptions = [...this.soptions, op];
            }
        })
    }

    @track soptions = [
        // { label: 'New', value: 'new' },
        // { label: 'In Progress', value: 'inProgress' },
        // { label: 'Finished', value: 'finished' },
    ];

    handleChange(event) {
        console.log(event.target.value);
        let st = event.target.value;
        this.obk = event.target.value;
        // getFields({ str: st }).then(result => {
        //     console.log('from fields');
        //     console.log(result);
        //     for (let i = 0; i < result.length; i++) {
        //         const ot = {
        //             label: result[i].Label,
        //             value: result[i].QualifiedApiName
        //         }
        //         this.lstOptions = [...this.lstOptions, ot];
        //     }
        // })
        getFields({ str: st }).then(result => {
            console.log('from fields');
            console.log(result);
            this.fieldLabel=result;
            
        })
    }
 

   handleFilesChange(event) {
      

       if(event.target.files.length > 0) {

           this.filesUploaded = event.target.files;

           this.fileName = event.target.files[0].name;

       }

   }

 

   handleSave() {

       

       if(this.filesUploaded.length > 0) {

           this.uploadHelper();

       }

       else {

           this.fileName = 'Please select a CSV file to upload!!';

       }

   }


   uploadHelper() {

       this.file = this.filesUploaded[0];

      if (this.file.size > this.MAX_FILE_SIZE) {

           window.console.log('File Size is to long');

           return ;

       }

       this.showLoadingSpinner = true;

 

       this.fileReader= new FileReader();

 

       this.fileReader.onloadend = (() => {

           this.fileContents = this.fileReader.result;

           this.saveToFile();
           

       });

 

       this.fileReader.readAsText(this.file);

   }

   saveToFile() {

       saveFile({ base64Data: JSON.stringify(this.fileContents),str:this.obk})

       .then(result => {

           window.console.log('result ====> ');

           window.console.log(result);

           this.fileName = this.fileName + ' - Uploaded Successfully';

           this.isTrue = false;

           this.showLoadingSpinner = false;
           this.fieldData=result;
           this.newFieldData=result;
 

           this.dispatchEvent(

               new ShowToastEvent({

                   title: 'Success!!',

                   message: this.file.name + ' - Uploaded Successfully!!!',

                   variant: 'success',

               }),

           );

       }).catch(error => {

 

           window.console.log(error);

           this.dispatchEvent(

               new ShowToastEvent({

                   title: 'Error while uploading File',

                   message: error.message,

                   variant: 'error',

               }),

           );

       });

   }

  handleToSave()
  {
      console.log('from handle to save');
      if(this.filesUploaded.length > 0) {

           this.uploadHelperTwo();

       }

       else {

           this.fileName = 'Please select a CSV file to upload!!';

       }

  }

   

   uploadHelperTwo() {

       this.file = this.filesUploaded[0];

      if (this.file.size > this.MAX_FILE_SIZE) {

           window.console.log('File Size is to long');

           return ;

       }

       this.showLoadingSpinner = true;

 

       this.fileReader= new FileReader();

 

       this.fileReader.onloadend = (() => {

           this.fileContents = this.fileReader.result;

           this.uploadToFile();
           

       });

 

       this.fileReader.readAsText(this.file);

   }
 

    uploadToFile() {

       uploadFile({ base64Data: JSON.stringify(this.fileContents),str:this.obk,sList:this.globalElement})

       .then(result => {

           window.console.log('result ====> ');

           window.console.log(result);

           this.fileName = this.fileName + ' - Uploaded Successfully';

           this.isTrue = false;

           this.showLoadingSpinner = false;
           //this.fieldData=result;
 

           this.dispatchEvent(

               new ShowToastEvent({

                   title: 'Success!!',

                   message: this.file.name + ' - Uploaded Successfully!!!',

                   variant: 'success',

               }),

           );

       }).catch(error => {

 

           window.console.log(error);

           this.dispatchEvent(

               new ShowToastEvent({

                   title: 'Error while uploading File',

                   message: error.message,

                   variant: 'error',

               }),

           );

       });

   }
 

   

  
   drag(event){
        console.log('In Drag : ');
        event.dataTransfer.setData("divId", event.target.id);
    }
    allowDrop(event){
        event.preventDefault();
        console.log('In allow Drop : ');
    }
    drop(event){
        // event.preventDefault();
        console.log('In drop : ');
        var divId = event.dataTransfer.getData("divId");
        console.log('divId : ',divId);
        //this.text=divId.split('-42');
        

        //console.log(this.text);
        this.globalElement.push(divId);
        console.log(this.globalElement);

       // console.log(sList);
        var draggedElement = this.template.querySelector('#' +divId);
        
        //var copydata=[...draggedElement];
        //console.log('OUTPUT : ',copydata);
        console.log('draggedElement : ',draggedElement);
        draggedElement.classList.add('completed'); 
        event.target.appendChild(draggedElement);
    }

}
/*
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https://www.googleapis.com/auth/youtube.readonly&
 access_type=offline&
 include_granted_scopes=true&
 state=state_parameter_passthrough_value&
 redirect_uri=http://localhost&
 response_type=code&
 client_id=283606585093-q6068avi7ootgctjf9oct682n5ihjf48.apps.googleusercontent.com




 http://localhost/?state=state_parameter_passthrough_value&code=4/0ARtbsJoUIE48OqFPoFDT9gN8KDs9wczSPItgbZZx_wTUqmVy7NcT79jcPe11UF2ZdM52UA&scope=https://www.googleapis.com/auth/youtube.readonly


 POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-Type: application/x-www-form-urlencoded

code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
client_id=your_client_id&
client_secret=your_client_secret&
redirect_uri=https%3A//oauth2.example.com/code&
grant_type=authorization_code

https://oauth2.googleapis.com/token?code=4/0ARtbsJoUIE48OqFPoFDT9gN8KDs9wczSPItgbZZx_wTUqmVy7NcT79jcPe11UF2ZdM52UA&client_id=283606585093-q6068avi7ootgctjf9oct682n5ihjf48.apps.googleusercontent.com&client_secret=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&redirect_uri=https://localhost&grant_type=authorization_code




"access_token": "ya29.a0Aa4xrXMmUYDgHcakud4W70RP_AeTbhBtKNPMwclpiEXufPwUoeEEALXv2JAudEvLEWElE_KcitMoxZv717c5qPyRnB5ff6xZk5BrwsH9BQY07GNogfrf1ZB34qubaobWdHrT58RRM4wsAeMXlpjGyYxvbAvNaCgYKATASARASFQEjDvL9h5xEAkwwUI2OKCgBxeLcIw0163"*/