// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/Home
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all nfts, wait for it to return, store in memory

  let nftQuery = await db.collection(`nftCollection`).get()

  // retrieve the documents from the query
  let nfts = nftQuery.docs

  
  // loop through the nft documents
  for (let nftIndex=0; nftIndex < nfts.length; nftIndex++) {

    // get the id from the document
    let nftId = nfts[nftIndex].id

    // get the data from the document
    let nftData = nfts[nftIndex].data()
    

    // create an Object to be added to the return value of our lambda
    let nftObject = {
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
    returnValue.push(nftObject)

    //sort the items in the array by the timestamp of each element
    returnValue.sort(function(x, y){
    return x.timestampNftCreated - y.timestampNftCreated;})  

    }

 


  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }

}


    // // get the comments for this post, wait for it to return, store in memory
    // let commentsQuery = await db.collection(`comments`).where(`postId`, `==`, postId).get()

    // // get the documents from the query
    // let comments = commentsQuery.docs

    // // loop through the comment documents
    // for (let commentIndex=0; commentIndex < comments.length; commentIndex++) {
    //   // get the id from the comment document
    //   let commentId = comments[commentIndex].id

    //   // get the data from the comment document
    //   let commentData = comments[commentIndex].data()

    //   // create an Object to be added to the comments Array of the post
    //   let commentObject = {
    //     id: commentId,
    //     userName: commentData.userName,
    //     body: commentData.body
    //   }

    //   // add the Object to the post
    //   postObject.comments.push(commentObject)