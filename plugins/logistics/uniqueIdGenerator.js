
export function makeid(length, type = 'alphanumeric') {
   var result           = '';
   if(type == null || type == '' || type == 'alphanumeric') {
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
   }
   else {
    var characters       = '0123456789';
    var charactersLength = characters.length;
   }

   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
