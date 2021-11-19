const { createHash } = require('crypto')
const { DIFFICULTY } = require('../config')
class Block{
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash,
        this.data = data
        this.nonce = nonce
    }

    toString(){
        return `
                Block -
                Timestamp: ${this.timestamp}
                Last Hash: ${this.lastHash.substring(0, 10)}
                Hash     : ${this.hash.substring(0, 10)}
                Nonce    : ${this.nonce}
                Data     : ${this.data}
        `
    }

    static genesis(){
        return new this('Genesis time', '------', 'f1r57-h45h',[], 0)
    }

    static mineBlock(lastBlock, data){
        let hash, timestamp
        const lastHash = lastBlock.hash
        let nonce = 0

        do{
            nonce++
            timestamp = Date.now()
            hash = Block.hash(timestamp, lastHash, data, nonce)
        }
        while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))
        
        return new this(timestamp, lastHash, hash, data, nonce)
    }

    static hash(timestamp, lastHash, data){
        return createHash('sha256').update(`${timestamp}${lastHash}${data}`).digest('hex')
    }

    static blockHash(block){
        const { timestamp, lastHash, data } = block

        return Block.hash(timestamp, lastHash, data)
    }
}

module.exports = Block