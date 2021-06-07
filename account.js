// standard event listener for Firebase auth... use instead of DOMContentLoaded
firebase.auth().onAuthStateChanged(async function (user) {

  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // write the user Object to the JavaScript console
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class=" text-pink-500 underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function (event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

    let userId = user.uid

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
    for (let i = 0; i < json.length; i++) {
      // Store each object ("post") in memory
      let nft = json[i]

      // Find the NFT's the belong to this user and add it to the return value
      if (nft.ownerId == userId) {


        //Adding an if statement to mainpulate only show price if the item is marked for sale. otherwise don't show it
        if (nft.forSale == true) {
          // Create some markup using the post data, insert into the "nfts" element
          nftsDiv.insertAdjacentHTML(`beforeend`, `
          <div class="md:flex md:mt-4 mt-2 capitalize border-2 rounded border-black-600 bg-blue-200">

          <div class="md:w-1/5 mx-2 my-auto font-bold text-xl"> ${nft.name}</div>
          
          <div class="md:w-2/5 my-2 border-blue-400 rounded">
            <img src="${nft.urlNft}">
          </div>  
    
          <div class=" md:w-2/5 md:my-auto ">
            <p class="ml-4 text-base">Item Description: ${nft.description}</p>
            <p class="ml-4 text-base">Category: ${nft.category} </p>
        <p class="ml-4 text-base">For Sale: Yes </p>
        <p class="ml-4 text-base">Price: $${nft.price}</p>
      </div>

      </div>
      `)
        }
        else {
          // Create some markup using the post data, insert into the "nfts" element
          nftsDiv.insertAdjacentHTML(`beforeend`, `
          <div class="md:flex md:mt-4 mt-2 capitalize border-2 rounded border-black-600 bg-blue-200">

          <div class="md:w-1/5 mx-2 my-auto font-bold text-xl"> ${nft.name}</div>
          
          <div class="md:w-2/5 my-2 border-blue-400 rounded">
            <img src="${nft.urlNft}">
          </div>  
    
          <div class=" md:w-2/5 md:my-auto ">
            <p class="ml-4 text-base">Item Description: ${nft.description}</p>
            <p class="ml-4 text-base">Category: ${nft.category} </p>
        <p class="ml-4 text-base">For Sale: No </p>
        </div>

             </div>
             `)
        }
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