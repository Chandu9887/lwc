import { LightningElement, track } from 'lwc';
import getAllo from '@salesforce/apex/getAllob.getAllo';
import getFields from '@salesforce/apex/getAllFieldValues.getFields';
import getField from '@salesforce/apex/getFieldData.getField';
import {NavigationMixin} from 'lightning/navigation';
export default class CustomDataExportWizard extends NavigationMixin(LightningElement) {
    //columnHeader;
    selection = [];
    AccountRedirectPage;
    obk;
    @track data = [];
    @track column = [];
    @track newExportData=[];
    columntwo = [];
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
        getFields({ str: st }).then(result => {
            console.log('from fields');
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                const ot = {
                    label: result[i].Label,
                    value: result[i].QualifiedApiName
                }
                this.lstOptions = [...this.lstOptions, ot];
            }
        })
    }

    @track lstOptions = [];

    handleChangetwo(event) {
        let selectedField = event.target.value;
        //console.log(event.target,'from target');
        //console.log(event.target.label,event.target.Label,'from target');
        //let sLabel=event.target.label;
        //console.log(selectedField,'Selected field');
        for (let i = 0; i < selectedField.length; i++) {
            //console.log(sLabel[i],'inside of a loop');
            const ott = {
                label: selectedField[i],
                fieldName: selectedField[i],
                type: 'text'
            }
            this.selection = [...this.selection, ott];
        }
    }

    handleClick() {
        this.column = this.selection;
        console.log(this.column, 'from selection')
        for (let i = 0; i < this.selection.length; i++) {
            this.columntwo.push(this.selection[i].fieldName);
        }
        //this.column=this.selection;
        console.log(this.column, 'column 2')
        getField({ str: this.obk, cList: this.columntwo }).then(result => {
            console.log('from show record');
            // for(let i=0;i<result.length;i++)
            // { 
            //     // console.log(result[i]'obj')
            //     //     console.log('Test 1')
            //         // console.log(result[i].substr(0,j));
            //         for(let j=0;j<Object.values(result[i]).length;j++)
            //         {
            //             console.log('test');
            //             console.log(Object.keys(result[i])[j]);
            //             console.log(Object.values(result[i])[j]);
            //             //Object.keys(result[i])[j].toLowerCase()
            //             //console.log(result[i]);
            //         }
            //         console.log('tst 2')
            // }
            //console.log(result[0])
            // console.log((Object.keys(result[0])).toLowerCase());
            //this.columnHeader=result[0];
            this.data = result;
            console.log(this.data);
        })

    }


    handleRowSelection(event)
    {
        let ev=event.detail.selectedRows;
        //console.log(ev);
        this.newExportData=ev;
        console.log(this.newExportData,'Export Data');
        // for(let i=0;i<ev.length;i++)
        // {
        //     console.log(ev[i]);
        // }
    }

    handleNewRecord()
    {
        this.AccountRedirectPage={
                type:'standard__objectPage',
                attributes:{
                    //recordId:nameField,
                    objectApiName:this.obk,
                    actionName:'new'

                }
            }
        this[NavigationMixin.Navigate](this.AccountRedirectPage);


    }
    exportContactData() {
        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.column.forEach(element => {
            doc += '<th>' + element.label + '</th>'
        });
        doc += '</tr>';
        // Add the data rows
        this.newExportData.forEach(record => {
            console.log(record,'out of loop');
            console.log(Object.values(record));
                 doc += '<tr>';
                for(let j=0;j<Object.keys(record).length;j++)
                {
                //    if(Object.values(record)[j]==null && Object.keys(record)[j]!=null)
                //    {
                //        console.log(Object.values(record)[j],'test from null')
                //        doc += '<th>' +''+ '</th>';

                //    }else{
                    console.log(Object.values(record)[j],'test from loop')
                    doc += '<td>' + Object.values(record)[j] + '</td>';
                    //doc += '<th>' + record.IsDeleted + '</th>';
                    //doc += '<th>' + record.Name + '</th>';
                //    }
                    
                }
                doc += '</tr>';
            
            
        });
        doc += '</table>';
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'Data.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }






}