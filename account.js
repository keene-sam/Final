// standard event listener for Firebase auth... use instead of DOMContentLoaded
firebase.auth().onAuthStateChanged(async function(user) {

  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // write the user Object to the JavaScript console
    console.log(user)

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

    // Find the NFT's the belong to this user and add it to the return value
    if (nft.ownerId == userId) { 

      // Create some markup using the post data, insert into the "nfts" element
      nftsDiv.insertAdjacentHTML(`beforeend`, `
        <div class="md:mt-16 mt-8 border-2 rounded border-black-300 bg-blue-100">
        <p class="ml-4 mt-4 capitalize font-bold text-xl">${nft.name}</p>

          <div class="md:flex md:mx-4 mx-2 my-2">
            <img src="${nft.urlNft}" class="w-1/3 border-2 border-blue-400 rounded">
           <div>
              <p class="ml-4 font-bold text-base">Item Description: ${nft.description}</p>
              <p class="ml-4 font-bold text-base">Category: ${nft.category} </p>
              <p class="ml-4 font-bold text-base">Price: $${nft.price}</p>

          </div>
          </div>  

        </div>
      `)
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




      // // Create an empty string for the comments
      // let comments = ``

      // // Loop through the post's comments
      // for (let i=0; i < post.comments.length; i++) {
      //   // Create a variable for each comment
      //   let comment = post.comments[i]

      //   // Add HTML markup for the comment to the comment string
      //   comments = comments + `<div><strong>${comment.userName}</strong> ${comment.body}</div>`
      // }