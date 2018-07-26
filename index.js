'use strict'
console.log("EOS Pub Address Encryption")

import Eos from 'eosjs'
import ecc from 'eosjs-ecc'

var keys = {}
var message = "Let's crypto dm!"

ecc.randomKey().then(privateKey => {
  // Generating Alice's keys
  keys.alicePrivKey = privateKey
  keys.alicePubKey = ecc.privateToPublic(privateKey)
})
ecc.randomKey().then(privateKey => {
  // Generating Alice's keys
  keys.bobPrivKey = privateKey
  keys.bobPubKey = ecc.privateToPublic(privateKey)
})
.then(() => {
  // Encrypting...
  let encryptedMessage = ecc.Aes.encrypt(keys.alicePrivKey, keys.bobPubKey, message)
  // Decrypting...
  let decryptedMessage = ecc.Aes.decrypt(keys.bobPrivKey, keys.alicePubKey, encryptedMessage.nonce, encryptedMessage.message, encryptedMessage.checksum)
  console.log("Original: " + message, "Received: " + decryptedMessage.toString())
})


