     // var user = result.user.displayName;
     // var pic = result.user.photoURL;
     // this.$store.state.user_displayName = user;
     // this.$store.state.user_pic = pic;

     var user_id = result.additionalUserInfo.profile.id;
     var access_token = result.credential.accessToken;


     // if (result.status === "connected") {
     //   var accessToken = result.authResponse.accessToken;
     //   console.log(accessToken);
     // }
     this.$store.state.user_pic =
         "https://graph.facebook.com/" +
         user_id +
         "/picture?access_token=" +
         access_token;
     console.log(result);
     firebase.auth().onAuthStateChanged((user) => {
         console.log(user);
     });

     //           firebase.auth().signOut().then(function() {
     //   // Sign-out successful.
     // }).catch(function(error) {
     //   // An error happened.
     // });