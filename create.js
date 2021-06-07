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
      
      // redirect to the home page
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
  

  // get a reference to the "Create" button
  let createButton = document.querySelector(`#create-button`)

  // handle the clicking of the "Create" button
  createButton.addEventListener(`click`, async function(event) {
    // prevent the default behavior (submitting the form)
    event.preventDefault()
console.log(`is it working`)
    // get a reference to the input holding the URL, name, description and category
    let nftUrlInput = document.querySelector(`#nft-url`)
    let nftNameInput = document.querySelector(`#nft-name`)
    let nftDescriptionInput = document.querySelector(`#nft-description`)
    let nftCategoryInput = document.querySelector(`#nft-category`)
console.log(nftCategoryInput)

    // store the user-inputted image URL in memory
    let nftUrl = nftUrlInput.value
    let nftName = nftNameInput.value
    let nftDescription = nftDescriptionInput.value
    let nftCategory = nftCategoryInput.value


    // create the URL for our "create post" lambda function
    let url = `/.netlify/functions/create_nft?userId=${userId}&nftUrl=${nftUrl}&nftName=${nftName}&nftDescription=${nftDescription}&nftCategory=${nftCategory}`
    
    // fetch the URL, wait for the response, store the response in memory
    let response = await fetch(url)

    // redirect to the account page
    document.location.href = `account.html`
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



  
  
  