const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt)=> { // tempo de rounds , callback contendo o salt
    bcrypt.hash(password, salt, (err, hash)=> { // hash function recebe a senha, o salt e um call back que recebe o hash pronto
        console.log(hash);
    });
});

var hPassword = '$2a$10$p92VdzPxiw2oDBRCLqO4zO7Y0oPI3/WehvjNiQzApieYlAGdtXyjy';

bcrypt.compare(password, hPassword, (err,res)=>{
    console.log(res);
});



// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('Decode', decoded);

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