import { LightningElement } from 'lwc';

export default class CalculaterTest extends LightningElement {

    result=""
    
    handleClickone()
    {
        if(this.result=="0")
        {
            this.result="1";
        }else{
            this.result+="1";
        }
        this.template.querySelector(".inputClass").value=this.result;
        

    }
    handleClicktwo()
    {
        if(this.result=="0")
        {
            this.result="2";
        }else{
            this.result+="2";
        }
        this.template.querySelector(".inputClass").value=this.result;

    }
    handleClickthree()
    {
        if(this.result=="0")
        {
            this.result="3";
        }else{
            this.result+="3";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickfour()
    {
        if(this.result=="0")
        {
            this.result="4";
        }else{
            this.result+="4";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickfive()
    {
        if(this.result=="0")
        {
            this.result="5";
        }else{
            this.result+="5";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClicksix()
    {
        if(this.result=="0")
        {
            this.result="6";
        }else{
            this.result+="6";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickseven()
    {
        if(this.result=="0")
        {
            this.result="7";
        }else{
            this.result+="7";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickeight()
    {
        if(this.result=="0")
        {
            this.result="8";
        }else{
            this.result+="8";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClicknine()
    {
        if(this.result=="0")
        {
            this.result="9";
        }else{
            this.result+="9";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickzero()
    {
        this.result+="0";
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickplus()
    {
        if(this.result=="0")
        {
            this.result="+";
        }else{
            this.result+="+";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickminus()
    {
        if(this.result=="0")
        {
            this.result="-";
        }else{
            this.result+="-";
        }
        this.template.querySelector(".inputClass").value=this.result;    
    }
    handleClickslash()
    {
        if(this.result=="0")
        {
            this.result="/";
        }else{
            this.result+="/";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickresult()
    {
        if(this.result[0]=="0" || this.result[0]=="/" || this.result[0]=="*" || this.result[0]=="+" || this.result[0]=="-" || this.result[this.result.length-1]=="/" || this.result[this.result.length-1]=="+" || this.result[this.result.length-1]=="-" || this.result[this.result.length-1]=="*" )
        {
            this.template.querySelector(".inputClass").value="Syntex error";
        }else{
            if(this.result==""){
                
                var res=this.template.querySelector(".inputClass").value;
                this.template.querySelector(".inputClass").value=eval(res);

            }else{
               
                this.result=eval(this.result);
                
                this.template.querySelector(".inputClass").value=this.result;

            }   
        }
    }
    handleClickstar()
    {
        if(this.result=="0")
        {
            this.result="*";
        }else{
            this.result+="*";
        }
        this.template.querySelector(".inputClass").value=this.result;
    }
    handleClickclear()
    {
        this.result="0";
        this.template.querySelector(".inputClass").value=this.result;
    }

}