import { LightningElement,wire } from 'lwc';

import lmsExample from '@salesforce/messageChannel/lmsExample__c'

import { subscribe,unsubscribe,MessageContext,APPLICATION_SCOPE } from 'lightning/messageService';

export default class RecieverComponent extends LightningElement {

    @wire(MessageContext) msgContext;

    subscribe;
    textMsg;

   subscribeToChannel()
   {
    this.subscribe=subscribe(this.msgContext,lmsExample,(message)=>this.listenfunction(message),{scope:APPLICATION_SCOPE})
   }

   handleClickSubscribe()
   {
    this.subscribeToChannel();
   }

   listenfunction(message)
   {
    console.log(message);
    this.textMsg=message.detail;
    console.log('I am able to listen')
   }

    connectedCallback()
    {
        this.subscribeToChannel();
    }

    handleClickunSubscribe()
    {
        unsubscribe(this.subscribe)
    }
}
