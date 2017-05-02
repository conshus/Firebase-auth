$( "#loginSubmit" ).click(function() {
  //console.log("login submit clicked");
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
      $("#errors").html(errorMessage)

    } else {
      alert(errorMessage);
      $("#errors").html(errorMessage)

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
    $("#errors").html(errorMessage)
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

function postChat(data){
  console.log(data.key);
  let val = data.val();
  console.log(val.text);
}

// $("#chatButton").click(function(){
//   let chatMessage = $("#chatInput").val();
//   console.log(chatMessage.length);
//   let chatRef = firebase.database().ref('chat');
//   chatRef.off();
//   chatRef.on('child_added',postChat);
//   chatRef.on('child_changed',postChat);
//   if (chatMessage.length >0){
//     console.log("chat button pressed");
//     chatRef.push({
//       name: 'test',
//       text: chatMessage
//     }).then(function(){
//       $("#chatInput").html('');
//     })
//   }
// })
//

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#signOutButton").show();
    $("#chat").show();
    $("#loginSignUpForm").hide();
    console.log(user);



    $("#chatButton").click(function(){
      let chatMessage = $("#chatInput").val();
      console.log(chatMessage.length);
      let chatRef = firebase.database().ref('chat');
      chatRef.off();
      chatRef.on('child_added',postChat);
      chatRef.on('child_changed',postChat);
      if (chatMessage.length >0){
        console.log("chat button pressed");
        chatRef.push({
          name: user.email,
          text: chatMessage
        }).then(function(){
          $("#chatInput").val('');
        })
      }
    })




    //console.log("logged in", user);
    //user.getToken().then(JWT => console.log("JWT:", JWT))
    // User is signed in.
  } else {
    // No user is signed in.
    //console.log("not logged in");
    $("#chat").hide();
    $("#loginSignUpForm").show();
    $("#signOutButton").hide();

  }
});
