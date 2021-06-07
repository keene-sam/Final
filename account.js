// standard event listener for Firebase auth... use instead of DOMContentLoaded
firebase.auth().onAuthStateChanged(async function(user) {

  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // write the user Object to the JavaScript console
    console.log(user)

    // Build the markup for the username and set the HTML in the header
    document.querySelector(`.user-name`).innerHTML = `
    <button class="text-black font-bold">👾 ${user.displayName}</button>
    `
    // get a reference to the account button
    let accountButton = document.querySelector(`.user-name`)

    // handle the sign out button click
    accountButton.addEventListener(`click`, function(event) {
      
      // redirect to the account page
      document.location.href = `account.html`
    })


    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

    let userId = user.uid
    console.log(userId)

    // Build the URL for our nft API
    let url = `/.netlify/functions/nfts`
    

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)


    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Grab a reference to the element 
    let nftsDiv = document.querySelector(`.account`)

    // Loop through the JSON data, for each Object representing a post:
    for (let i=0; i < json.length; i++) {
      // Store each object ("post") in memory
      let nft = json[i]
      let nftId = nft.id

    // Find the NFT's the belong to this user and add it to the return value
    if (nft.ownerId == user.uid) { 

      if(nft.forSale == true ) {
        // Create some markup using the post data, insert into the "nfts" element
      
        nftsDiv.insertAdjacentHTML(`beforeend`, `
          <div class="md:mt-16 mt-8 border-2 rounded border-black-300 bg-blue-100">
            <p class="ml-4 mt-4 capitalize font-bold text-xl">${nft.name}</p>
            <div class="md:flex md:mx-4 mx-2 my-2">
              <img src="${nft.urlNft}" class="w-1/3 border-2 border-blue-400 rounded">
            <div>
                <p class="nft ml-4 font-bold text-yellow-500 pb-4 text-base">CURRENTLY ON THE MARKET FOR SALE</p>
                <div class="flex flex-row">
                  <div class="ml-4 font-bold text-base">Item Description: </div>
                  <div class="ml-2 pb-2 text-base"> ${nft.description} </div>
                </div> 
                <div class="flex flex-row">
                  <div class="ml-4 font-bold text-base">Category: </div>
                  <div class="ml-2 pb-2 text-base"> ${nft.category} </div>
                </div> 
                <div class="flex flex-row">
                  <div class="ml-4 font-bold text-base">NFT Id: </div>
                  <div class="ml-2 pb-2 text-base"> ${nft.id} </div>
                </div> 
                <div class="flex flex-row">
                  <div class="ml-4 font-bold text-base">Current Listing Price: </div>
                  <div class="ml-2 pb-2 text-base"> $${nft.price} </div>
                </div> 
                <form class="w-full mt-8">
                  <div class="flex flex-col mb-4">
                    <label class="ml-4 font-bold text-lg text-grey-darkest" for="sale">Please enter a new price </label>     
                    <input type="text" id="sale-price-${nftId}" class="mr-2 ml-4 rounded-lg border px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Change Listing Price">
                  </div>
                    <button id="sell-button-${nftId}" class="bg-green-500 py-2 px-4 rounded-md ml-4 my-4 hover:bg-green-600 text-white">Confirm and Change Price</button>
                </form>
              </div>
            </div>  
          </div>
        `)
      }

      else {
        // Create some markup using the post data, insert into the "nfts" element
      
        nftsDiv.insertAdjacentHTML(`beforeend`, `
          <div class="md:mt-16 mt-8 border-2 rounded border-black-300 bg-blue-100">
            <p class="ml-4 mt-4 capitalize font-bold text-xl">${nft.name}</p>
            <div class="md:flex md:mx-4 mx-2 my-2">
              <img src="${nft.urlNft}" class="w-1/3 border-2 border-blue-400 rounded">
            <div>
                <p class="nft ml-4 font-bold text-green-500 pb-4 mx-8 text-base">CURRENTLY NOT FOR SALE</p>    
                <div class="flex flex-row">
                <div class="ml-4 font-bold text-base">Item Description: </div>
                <div class="ml-2 pb-2 text-base"> ${nft.description} </div>
              </div> 
              <div class="flex flex-row">
                <div class="ml-4 font-bold text-base">Category: </div>
                <div class="ml-2 pb-2 text-base"> ${nft.category} </div>
              </div> 
              <div class="flex flex-row">
                <div class="ml-4 font-bold text-base">NFT Id: </div>
                <div class="ml-2 pb-2 text-base"> ${nft.id} </div>
              </div> 
                  <form class="w-full mt-8">
                    <div class="flex flex-col mb-4">
                      <label class="ml-4 font-bold text-lg text-grey-darkest" for="sale">Please enter a price to list NFT</label>     
                      <input type="text" id="sale-price-${nftId}" class="mr-2 ml-4 rounded-lg border px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Enter Listing Price">
                    </div>
                    <button id="sell-button-${nftId}" class="bg-green-500 py-2 px-4 rounded-md ml-4 my-4 hover:bg-green-600 text-white">Confirm and List for Sale</button>
                  </form>
              </div>
            </div>  
          </div>
        `)



      }
      

    
      // get a reference to the newly created buy NFT button
      
      let sellNftButton = document.querySelector(`#sell-button-${nftId}`)
      
      

      // event listener for the buy button
      sellNftButton.addEventListener(`click`, async function(event) {
       
        let nftSalePrice = document.querySelector(`#sale-price-${nftId}`)
        let salePrice = nftSalePrice.value

        // Build the URL for our buy API
        let url = `/.netlify/functions/sell_nft?nftId=${nftId}&userId=${user.uid}&salePrice=${salePrice}`
        console.log(url)

        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)

        console.log(response)
        /*/ refresh the page
        location.reload()*/
        
      })

    }
  }

  } else {
    // user is not logged-in, so show login
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: `index.html` // where to go after we're done signing up/in
    }

    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)
  }
})




    