let password = "password"
let storedPassword = "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."

const bcrypt = require('bcryptjs');

const hashedPassword = bcrypt.hashSync(password, 12);


console.log(bcrypt.compareSync(password, storedPassword))
console.log(bcrypt.compareSync(password, hashedPassword))
console.log(bcrypt.compareSync(password, "password"))

console.log(storedPassword === hashedPassword)