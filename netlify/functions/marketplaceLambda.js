// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/Home
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  let userId = event.queryStringParameters.userId
  // perform a query against firestore for all nfts, wait for it to return, store in memory

  let nftQuery =  await db.collection(`nftCollection`)
                          .where(`forSale`,`==`,true)
                          .get()


/*let nftQuery =  await db.collection(`nftCollection`)
                          .where(`forSale`,`==`,true)
                          .where(`ownerId`,`!=`,userId)
                          .get()*/
  // retrieve the documents from the query
  let nfts = nftQuery.docs

  nfts.sort()

  //define minimum of releases to show
  let minNftView = nfts.length
  
  // loop through the nft documents
  for (let nftIndex=0; nftIndex < minNftView; nftIndex++) {
    // get the id from the document
    let nftId = nfts[nftIndex].id

    // get the data from the document
    let nftData = nfts[nftIndex].data()

    // create an Object to be added to the return value of our lambda
    let releaseObject = {
      id: nftId,
      name: nftData.name,
      ownerId: nftData.ownerId,
      category: nftData.category,
      description: nftData.description,
      forSale: nftData.forSale,
      urlNft: nftData.urlNft,
      price: nftData.price,
      timestampNftCreated: nftData.timestampNftCreated
    }

    // add the Object to the return value
    returnValue.push(releaseObject)
  }

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}