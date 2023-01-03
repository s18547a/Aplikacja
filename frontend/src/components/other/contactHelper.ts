export function spaceContact(contact:string|undefined){
    if(contact){
    const arr=contact.split('');
    console.log(arr);
    const arr1=arr.slice(0,3).toString().replace(',','').replace(',','');
    const arr2=arr.slice(3,6).toString().replace(',','').replace(',','');
    const arr3=arr.slice(6,9).toString().replace(',','').replace(',','');

    const newContact= `${arr1} ${arr2} ${arr3}`;

    return newContact
    }
     return undefined
}