// Goal: Provide a function to create a new nft in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_post?userName=Brian&imageUrl=https://images.unsplash.com/...
exports.handler = async function(event) {

  // get the two querystring parameters and store in memory
  
  let ownerId = event.queryStringParameters.userId
  let name = event.queryStringParameters.nftName
  let category = event.queryStringParameters.nftCategory
  let description = event.queryStringParameters.nftDescription
  let urlNft = event.queryStringParameters.nftUrl
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new nft, wait for it to return
  await db.collection('nftCollection').add({
    name: name,
    ownerId: ownerId,
    category: category,
    description: description,   
    forSale: false,
    urlNft: urlNft,
    price: 0,
    timestampNftCreated: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}