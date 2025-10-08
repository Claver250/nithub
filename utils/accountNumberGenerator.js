const Account = require('../models/account')

exports.generateUniqueAccountNumber = async () => {
    let accountNumber;
    let exists = true;

    while (exists) {
        const year = new Date().getFullYear().toString().slice(-2);
        const randomDigits = Math.floor(100000000 + Math.random() * 900000000)
        accountNumber = `30$(year)$(randomDigits)`;

        const existingAccount = await Account.findOne({ where: {accountNumber} });
        if (!existingAccount) exists = false;
    }

    return accountNumber;
};