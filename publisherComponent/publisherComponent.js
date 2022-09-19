import { LightningElement,wire } from 'lwc';

import lmsExample from '@salesforce/messageChannel/lmsExample__c'

import { publish,messageContext, MessageContext } from 'lightning/messageService';

export default class PublisherComponent extends LightningElement {


    @wire(MessageContext) msgContext;

    handleClick()
    {
        let jsonMsg={detail:'hello siblings'}

        publish(this.msgContext,lmsExample,jsonMsg)

    }

}