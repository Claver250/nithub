const Beneficiary = require('../models/beneficiary');
const Account = require('../models/account');

exports.addBeneficiary = async (req, res) => {
    try{
        const userId = req.user.id;
        const {accountNumber, bankName, alias} = req.body;

        const account = await Account.findOne({where: {accountNumber}});
        if(!account){
            return res.status(404).json({message: 'Account not found'})
        }

        if(account.userId === userId ) { 
            return res.status(400).json({message: 'You cannot add your account as a beneficiary'})}

        const exists = await Beneficiary.findOne({where: {userID: userId, accountNumber}});
        if (exists) {
            return res.status(400).json({message: 'Beneficiary already exists'})
        };

        const beneficiary = await Beneficiary.create({
            userID: userId,
            accountNumber,
            bankName,
            alias
        });

        res.status(201).json({
            message: 'Beneficiary added successfully',
            beneficiary
        });
    }catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getBeneficiary = async(req, res) => {
    try{
        const userId = req.user.id;
        const beneficiaries = await Beneficiary.findAll({
            where: {userID: userId},
            attributes: ['beneficiaryID', 'alias', 'accountNumber', 'bankName', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
        res.json({beneficiaries})    
    }catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.deleteBeneficiary = async(req, res) => {
    try{
        const userId = req.user.id;
        const {id} = req.params;

        const deleted = await Beneficiary.delete({where: {beneficiaryID: id, userID: userId}});
        if(!deleted){
            return res.status(404).json({message: 'Beneficiary not found'})
        };

        res.json({message: 'Beneficiary removed successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}