const Web3 = require('web3');

class BlockchainService {
    constructor() {
        this.web3 = new Web3(process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org:443');
        this.contractAddress = process.env.CONTRACT_ADDRESS;
        this.privateKey = process.env.PRIVATE_KEY;
    }
    
    // 验证交易
    async verifyTransaction(txHash) {
        try {
            const receipt = await this.web3.eth.getTransactionReceipt(txHash);
            return receipt && receipt.status;
        } catch (error) {
            console.error('Transaction verification failed:', error);
            return false;
        }
    }
    
    // 获取账户余额
    async getBalance(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Get balance failed:', error);
            return 0;
        }
    }
    
    // 发送奖励
    async sendReward(toAddress, amount) {
        try {
            const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
            const tx = {
                from: account.address,
                to: toAddress,
                value: this.web3.utils.toWei(amount.toString(), 'ether'),
                gas: 21000,
                gasPrice: await this.web3.eth.getGasPrice()
            };
            
            const signedTx = await account.signTransaction(tx);
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            
            return receipt.transactionHash;
        } catch (error) {
            console.error('Send reward failed:', error);
            throw error;
        }
    }
}

module.exports = new BlockchainService();