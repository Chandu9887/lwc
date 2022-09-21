import Email from '@salesforce/schema/Contact.Email';
import { LightningElement ,track} from 'lwc';

export default class TreeGridTableExample extends LightningElement {

    newRows;
    @track expandRows=['78','90']
    @track column=[
        {
            label:'Name',
            fieldName:'Name',
            type:'text'
        },
        {
            label:'Number Of Employees',
            fieldName:'NumberOfEmployees',
            type:'number',
            actions:[
                {label:'All',name:'All',checked:true},
                {label:'check',name:'check',checked:false}
            ]
        },
        {
            label:'Mobile Number',
            fieldName:'PhoneNumber',
            type:'phone'
        },
        {
            label:'Last Name',
            fieldName:'lastName',
            type:'text'
        },
        {
            label:'Email',
            fieldName:'Email',
            type:'email'
        }
    ]

    @track rows=[
        {
            id:'78',
            Name:'raju',
            NumberOfEmployees:'8008',
            PhoneNumber:'7854878485',
            _children:[
                {
                    id:'79',
                    Name:'johny lever',
                    NumberOfEmployees:'80878',
                    PhoneNumber:'7854234345'
                },
                {
                    id:'70',
                    Name:'akshay kumar',
                    NumberOfEmployees:'802378',
                    PhoneNumber:'7854342345',
                    Email:'akki@gmail.com'
                }
            ]

        },
        {
            id:'90',
            Name:'rohit sharma',
            NumberOfEmployees:'8238',
            PhoneNumber:'7854123485',
            _children:[
                {
                    id:'67',
                    Name:'srk',
                    NumberOfEmployees:'802348',
                    PhoneNumber:'78545644345',
                    Email:'srk@gmail.com'
                    
                },
                {
                    id:'23',
                    Name:'rajnikant',
                    NumberOfEmployees:'8024938',
                    PhoneNumber:'78543242345'
                }
            ]

        }
    ]



    handleRowSelection(event)
    {
        console.log('row is selected')
        console.log(event.detail.selectedRows)

    }

    handleClick()
    {
        let getElement=this.template.querySelector('lightning-tree-grid');
        //this.newRows=getElement.getCurrentExpandedRows();

       // getElement.collapseAll();
        getElement.expandAll();


    }
    handleAction()
    {
        console.log('from header')
    }

    handleToggle(event)
    {
        console.log(event.detail.isExpanded);
        console.log('collapse or expand')
    }


}