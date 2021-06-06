// Goal: Provide a function to create a new nft in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_post?userName=Brian&imageUrl=https://images.unsplash.com/...
exports.handler = async function(event) {

  // get the two querystring parameters and store in memory
  let nftIdentifier = event.queryStringParameters.nftIdentifier
  let price = event.queryStringParameters.salePrice
  let forSale = event.queryStringParameters.forSale
  
  

  console.log(price)
  console.log(forSale)
  console.log(nftIdentifier)

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  
  let nftQuery = await db.collection(`nftCollection`).get()

  // retrieve the documents from the query
  let nfts = nftQuery.docs

  for (let nftIndex=0; nftIndex < nftIndex.length; nftIndex++) {
    // get the id from the document
    let nftId = nfts[nftIndex].id

    // get the data from the document
    let nftData = nfts[nftIndex].data()

    if(nftId == nftIdentifier){

        await db.collection('nftCollection').update({
      
            forSale: forSale,
            price: price
          })
         }
        }
        
    

  // create a new nft, wait for it to return
  

  return {
    statusCode: 200
  }
}
