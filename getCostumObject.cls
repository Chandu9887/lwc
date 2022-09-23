public with sharing class getCostumObject {
    
    @AuraEnabled(cacheable=true)
    public static boolean getCostumObjects(string username,string pswrd)
    {
        List<zomato_customer__c> cstmr=[select username__c,password__c from zomato_customer__c where username__c=:username and password__c=:pswrd];

        if(cstmr==null)
        {
            return false;
        }else{
            return true;
        }
    
        
        
    }
}
