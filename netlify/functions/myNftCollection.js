// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/Home
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnMyNfts = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()
  let userId = event.queryStringParameters.userId


  // perform a query against firestore for all nfts, wait for it to return, store in memory

  let myNftQuery = await db.collection(`nftCollection`).where('userId', '==', userId ).get()

  // retrieve the documents from the query
  let myNfts = myNftQuery.docs

  myNfts.sort()
  console.log(myNfts.length)
  
  // loop through the nft documents
  for (let nftIndex=0; nftIndex < myNfts.length; nftIndex++) {
    // get the id from the document
    let nftId = myNfts[nftIndex].id

    // get the data from the document
    let nftData = myNfts[nftIndex].data()

    // create an Object to be added to the return value of our lambda
    let releaseObject = {
      id: nftId,
      imageUrl: nftData.urlNftFile,
      description: nftData.description,
    }

    // add the Object to the return value
    returnMyNfts.push(releaseObject)
  }

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnMyNfts)
  }
}


