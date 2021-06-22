const validator = require("validator")
console.log(validator.isEmail("srikanth@gmail.com.gmail.com"))
console.log(validator.contains("sri", "i", { ignoreCase: true }))

/* console.log(merge({ ignoreCase: false }, { ignoreCase: true })) */
console.log(validator.isAfter("12-07-1999", "12/06/1998"));

console.log(validator.isLowercase("this is lowercase"))
