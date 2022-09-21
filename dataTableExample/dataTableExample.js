import { LightningElement,wire } from 'lwc';

import getListOfAccount from '@salesforce/apex/getListOfAccounts.getListOfAccount';

import deletedAccountss from '@salesforce/apex/deletedRecordss.deletedAccountss';

import {refreshApex} from '@salesforce/apex';

export default class DataTableExample extends LightningElement {

    column;
    data;
    selectedRows;
    res;
    column=[
        {
            label:'Name',
            fieldName:'Name',
            type:'text',
           // editable:'true'
           
        },
        {
            label:'Number Of Employees',
            fieldName:'NumberOfEmployees',
            type:'number',
            actions:[
                {label:"All",checked:true,name:"All"},
                {label:"less than 2000",checked:false,name:"less_than_2000"},
                {label:"greater tha 2000",checked:false,name:"greater_than_2000"}
                
            ]
            //sortable:'true'
           
        }
    ]


    @wire(getListOfAccount) mMethod(result)
    {
        console.log('from response')
        console.log(result);
        this.data=result.data;
        this.res=result;
    };

    handleRowSelection(event)
    {
        console.log('record is selected');
        let ev=event.detail.selectedRows;
        this.selectedRows=event.detail.selectedRows;
       // console.log(ev[0].Name)

        for(let i=0;i<ev.length;i++)
        {
            console.log(ev[i].Name);
        }
    }


    // data=[
    //     {
    //         firstName:'kailash',
    //         lastName:'kumar',
    //         id:'1'
    //     },
    //     {
    //         firstName:'sanjay',
    //         lastName:'saxena',
    //         id:'2'
    //     }
    // ]

    handleDelete(event)
    {
       // event.preventDefault();
        console.log(this.selectedRows);

        deletedAccountss({accList:this.selectedRows}).then(result=>{
            console.log('records are deleted');
            return refreshApex(this.res);
        }).catch(error=>{
            console.log(error)
            console.log('something went wrong');
        })

    }

    handleHeaderAction(event)
    {
        console.log('hello from header')

        let actionName=event.detail.action.name;
        console.log(actionName);

        const rows=this.data;

        const filterRows=rows.filter(function(r){
            return(r.NumberOfEmployees<=2000);
        })
       
        this.data=filterRows;
    }
}