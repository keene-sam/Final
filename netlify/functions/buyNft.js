// Goal: Provide a function to buy a new NFT

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/buynft?nftId=xxxxxxxxx&userId=xxxxxxxx
exports.handler = async function(event) {

  // variables
  

  let nftId = event.queryStringParameters.nftId
  let userId = event.queryStringParameters.userId
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()
  
  
  let currentNftQuery = await db.collection(`nftCollection`).doc(nftId)
  let nft = await currentNftQuery.get()
 
  console.log(nft)

  let oldOwner = nft.ownerId
  let priceNft = nft.price

  /* create a new transaction, wait for it to return
  await db.collection('transactions').add({
    NFT: nftId,
    seller: oldOwner,
    buyer: userId,
    price: priceNft,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })*/

  await currentNftQuery.update({
    ownerId: userId,
    forSale: false,
    price: ""
  })


  return {
    statusCode: 200
  }
}