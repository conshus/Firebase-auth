$( "#loginSubmit" ).click(function() {
  let email = $("#loginEmail").val();
  let password = $("#loginPassword").val();
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      //alert('Wrong password.');
      $("#errors").html(errorMessage+", meow").fadeIn().delay(2000).fadeOut(2000)
    } else {
      //alert(errorMessage);
      $("#errors").html(errorMessage+", meow").fadeIn().delay(2000).fadeOut(2000)
    }
    console.log(error);
  })
  //.then(user => user.getToken())
  .then(function(user){
    if (user){
      user.getToken()
    }
  })
  .then(JWT => console.log("JWT:",JWT))
});

$( "#signUpSubmit" ).click(function() {
  //console.log("sign up submit clicked");
  let email = $("#signUpEmail").val();
  let password = $("#signUpPassword").val();
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    $("#errors").html(errorMessage+", meow").fadeIn().delay(2000).fadeOut(2000)
    // ...
  })
  .then(function(user){
    if (user){
      console.log("UID:",user.uid);
    }
  });

});

$("#signOutButton").click(function(){
  $("#loginEmail").val('');
  $("#loginPassword").val('');
  $("#signUpEmail").val('');
  $("#signUpPassword").val('');
  firebase.auth().signOut();
})

function postChat(data){
  if($("#" + data.key).length == 0) {
    let val = data.val();
    var container = document.createElement('div');
    container.innerHTML = "<div><p class='chip'>"+val.message+"</p><h6>"+val.email+"</h6></div>";
    div = container.firstChild;
    div.setAttribute('id', data.key);
      $( "#chatMessagesArea" ).append(div);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //load initial messages
    firebase.database().ref('chat/').on('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        postChat(childSnapshot);
      });
    });
    $("#signOutButton").show();
    $("#chat").show();
    $("#loginSignUpForm").hide();
    $("#chatButton").click(function(){
      let chatMessage = $("#chatInput").val();
      let chatRef = firebase.database().ref('chat');
      chatRef.off();
      chatRef.on('child_added',postChat);
      chatRef.on('child_changed',postChat);
      if (chatMessage.length >0){
        chatRef.push({
          email: user.email,
          message: chatMessage
        }).then(function(){
          $("#chatInput").val('');
          setTimeout(function(){
            let punctuation = ['.','?','!']
            let meowNum = getRandomInt(0,5);
            let punRand = getRandomInt(0,2);
            let meowassage = "meow";
            for (i=0; i<meowNum; i++){
              meowassage = meowassage + " meow";
            }
            meowassage = meowassage+punctuation[punRand];
            chatRef.push({
              email: 'me@ow.zzz',
              message: meowassage
            })
          }, 3000);
        })
      }
    })
  } else {
    // No user is signed in.
    $("#errors").html("")
    $("#chat").hide();
    $("#loginSignUpForm").show();
    $("#signOutButton").hide();
  }
});
