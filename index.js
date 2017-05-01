$( "#loginSubmit" ).click(function() {
  console.log("login submit clicked");
  let email = $("#loginEmail").val();
  let password = $("#loginPassword").val();
  //console.log(email,password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  })
  .then(user => user.getToken())
  //.then(user.getToken())
  .then(JWT => console.log("JWT:",JWT))
});



$( "#signUpSubmit" ).click(function() {
  //console.log("sign up submit clicked");
  let email = $("#signUpEmail").val();
  let password = $("#signUpPassword").val();
  //console.log(email,password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  })
  .then(function(user){
    console.log("UID:",user.uid);
  });

});

$("#signOutButton").click(function(){
  //console.log("sign out button clicked");
  firebase.auth().signOut();
})


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#signOutButton").show();
    console.log(user);
    //console.log("logged in", user);
    //user.getToken().then(JWT => console.log("JWT:", JWT))
    // User is signed in.
  } else {
    // No user is signed in.
    //console.log("not logged in");
    $("#signOutButton").hide();

  }
});
