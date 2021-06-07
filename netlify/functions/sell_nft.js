// Goal: Provide a function to buy a new NFT

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/buynft?nftId=xxxxxxxxx&userId=xxxxxxxx
exports.handler = async function(event) {

  // variables
  

  let nftId = event.queryStringParameters.nftId
  let salePrice = event.queryStringParameters.salePrice
  
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()
  
  
  let currentNftQuery = await db.collection(`nftCollection`).doc(nftId)
  let nft = await currentNftQuery.get()
 
  console.log(nft)

  await currentNftQuery.update({
    forSale: true,
    price: salePrice
  })


  return {
    statusCode: 200
  }
}
