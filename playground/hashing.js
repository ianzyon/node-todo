const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('Decode', decoded);

// var message = 'I am user number 3';

// var hash = SHA256(message).toString(); // o resultado é um objeto

// console.log(message);
// console.log(hash);

// var data =  {
//     id: 4,

// };
// var token = { 
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() 

// };
 

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Dont trust it!');
// }