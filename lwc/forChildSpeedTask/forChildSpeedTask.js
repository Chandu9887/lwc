import { LightningElement,api } from 'lwc';

export default class ForChildSpeedTask extends LightningElement {

    @api red;
    @api yellow;
    @api green;

    red=false;
    yellow=false;
    green=false;

}