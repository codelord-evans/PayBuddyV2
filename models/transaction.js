const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User',required: 'true'},
    type: { type: 'string', enum: ['deposit', 'payment'], required:'true'},
    amount: {type: 'Number', required:'true'},
    reason: { type: 'string'},
    date: { type: 'Date', default: 'Date.now' }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction