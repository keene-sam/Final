// standard event listener for Firebase auth... use instead of DOMContentLoaded
firebase.auth().onAuthStateChanged(async function(user) {
   

  
  // Build the URL for our nft API
   let url = `/.netlify/functions/Home`

   // Fetch the url, wait for a response, store the response in memory
   let response = await fetch(url)

   // Ask for the json-formatted data from the response, wait for the data, store it in memory
   let json = await response.json()

   // Write the json-formatted data to the console in Chrome
   console.log(json)

   // Grab a reference to the element 
   let nftDiv = document.querySelector(`.Home`)

   // Loop through the JSON data, for each Object representing a nft:
   for (let i=0; i < json.length; i++) {
     // Store each object ("nft") in memory
     let nft = json[i]

     // Store the nft's ID in memory
     let nftId = nft.id

     // Create some markup using the nft data, insert into the "nft" element
     nftDiv.insertAdjacentHTML(`beforeend`, `
     <div class="md:mt-16 mt-8 border-2 flex-wrap items-center justify-center rounded border-black-300 bg-blue-100">
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
   
  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // write the user Object to the JavaScript console
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `

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


    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

 

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