
export function validateContact(contact:string){
    const isNumber=/^\d+$/.test(contact);
    
    if(contact.length!=9||!isNumber){
        throw Error('');
    }


    return contact;

}