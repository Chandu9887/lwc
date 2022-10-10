import { LightningElement,track,wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {CurrentPageReference} from 'lightning/navigation';
import document from '@salesforce/apex/getListOfDocument.document';
import filterone from '@salesforce/apex/getListOfDocument.filterone';
//import { refreshApex } from '@salesforce/apex';
import filtertwo from '@salesforce/apex/getListOfDocument.filtertwo';
import filtertwoo from '@salesforce/apex/getListOfDocument.filtertwoo';
import newYear from '@salesforce/apex/getListOfDocument.newYear';
import { subscribe, unsubscribe, onError}  from 'lightning/empApi';
import currentUserId from '@salesforce/user/Id';

export default class Document extends NavigationMixin(LightningElement) {
    
    value='PDF';
    values='true';
    @track editMode=false;
    openEditForm;
    @wire(CurrentPageReference) pageRef;
    handleClick()
    {
        this.AccountRedirectPage={
                type:'standard__objectPage',
                attributes:{
                    //recordId:nameField,
                    objectApiName:'Document__c',
                    actionName:'new'
                },
                state:
                {
                    navigationLocation:'RELATED_LIST'
                }
            }
            this[NavigationMixin.Navigate](this.AccountRedirectPage);
    }
    @track data=[];
    @track column=[
        {
            label:'Name',
            fieldName:'Name',
            type:'text',
            sortable: "true",
            editable: this.editMode
        },
        {
            label:'Document Type',
            fieldName:'Document_Type__c',
            type:'picklist',
            sortable: "true",
            editable: this.editMode,
            actions:[
                {label:'All',name:'All',checked:true},
                {label:'check',name:'check',checked:false}
            ]
        },
        {
            label:'isActive',
            fieldName:'isActive__c',
            type:'checkbox',
            sortable: "true",
            editable: this.editMode
        },
        {
            label:'Valid From',
            fieldName:'Valid_From_Date__c',
            type:'number',
            sortable: "true",
            editable: this.editMode
        },
        {
            label:'Valid Till',
            fieldName:'Valid_To_Date__c',
            type:'number',
            sortable: "true",
            editable: this.editMode
        },
        {
            type: 'button-icon',
            typeAttributes:
            {
                iconName: 'utility:preview',
                name: 'edit'
            }
        }

    ]
    
    @track sortBy='Name';
    @track sortDirection='asc';
    
    // connectedCallback() {
    //         document().then(result=>{
    //             console.log(result,'from data');
    //             this.data=result;
    //             console.log(this.data);
    //         }).catch(error=>{
    //             console.log(error);
    //         })  
    // }

    @wire(document,{field:'$sortBy',sortOrder:'$sortDirection'})
    doc(result){
        if(result.data)
        {
           this.data=result.data;
           console.log(result.data,'from data');
        }else if(result.error)
        {
            console.log(result.error);
        }
    }

    doSorting(event) {
        // calling sortdata function to sort the data based on direction and selected field
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }


    get options() {
        return [
            { label: 'PDF', value: 'PDF' },
            { label: 'DOC and DOCX', value: 'DOC and DOCX' },
            { label: 'HTML', value: 'HTML' },
            { label: 'XLS and XLSX', value: 'XLS and XLSX' },
            { label: 'TXT', value: 'TXT' }
        ];
    }
    get optionss() {
        return [
                { label: 'true', value: 'true' },
                { label: 'false', value: 'false' },
                
            ];
    }

    handleChange(event) {
        console.log('OUTPUT : form uper',);
        this.value = event.detail.value;
        console.log('OUTPUT : form uper',this.value);
        filterone({va:this.value,vas:this.values}).then(result=>{
            console.log(result,'from filter');
            this.data=result;
        }).catch(error=>{
            console.log('error');
        })

    }
    handleChanges(event) {
        console.log('OUTPUT : form u',);
        this.values = event.detail.value;
        console.log('OUTPUT : form upe',this.values);
        filtertwoo({va:this.value,vas:this.values}).then(result=>{
            console.log(result,'from filter2');
            this.data=result;
        }).catch(error=>{
            console.log('error');
       })

    }
    handleRowAction(event) {
        console.log('on row action',event.detail.row.Id);
        console.log('on row action',event.target.dataset.recordId);
        this.recordId=event.detail.row.Id;
        if (event.detail.action.name === 'edit') {
            this.editMode = true;
            console.log('teset')
            //this.openEditForm(event.detail.row);
            this.AccountRedirectPages={
                type:'standard__recordPage',
                attributes:{
                    recordId:event.detail.row.Id,
                    //objectApiName:'Document__c',
                    actionName:'edit'
                },
                state:
                {
                    navigationLocation:'RELATED_LIST'
                }
            }
            this[NavigationMixin.Navigate](this.AccountRedirectPages);
        }
    }
    
    // async refresh() {
    //     await refreshApex(this.data);
    // }\
    CHANNEL_NAME = '/event/editrecord__e';
    connectedCallback() {
        //this.isLoading = true;
        this.fetchAccounts();
        subscribe(this.CHANNEL_NAME, -1, this.manageEvent).then(response => {
            console.log('Subscribed Channel');
            //this.subscription = response;
        });
        onError(error => {
            console.error('Server Error--->'+error);
        });
    }

    manageEvent = event=> {
        const refreshRecordEvent = event.data.payload;
        //this.isLoading = true;
        console.log('Event--->'+JSON.stringify(refreshRecordEvent));
        if (refreshRecordEvent.Record_id__c === this.recordId && refreshRecordEvent.user_id__c === currentUserId) {
            this.fetchAccounts();
        }
        else if (refreshRecordEvent.user_id__c === currentUserId) {            
            this.fetchAccounts();
        }
    }

    fetchAccounts() {
        filtertwo()
            .then(result => {
                console.log('form dataa',result)
                this.data = result;
               // this.error = undefined;
                //this.isLoading = false;
            })
            .catch(error => {
                //this.error = error;
                //this.data = undefined;
                //this.isLoading = false;
            });
    }
    @track newData;
    connectedCallback()
    {
        newYear().then(result=>{
            this.newData=result;
        }).catch(error=>{
            console.log('error');
        })
        
    }
    
}