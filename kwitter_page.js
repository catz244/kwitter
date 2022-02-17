var firebaseConfig = {
      apiKey: "AIzaSyBk_4heVlwGDYGVL-iE9j-VbAZS8kNMZGI",
      authDomain: "kwitter-35ec2.firebaseapp.com",
      databaseURL: "https://kwitter-35ec2-default-rtdb.firebaseio.com",
      projectId: "kwitter-35ec2",
      storageBucket: "kwitter-35ec2.appspot.com",
      messagingSenderId: "544197924140",
      appId: "1:544197924140:web:9f9bf85e7dafa5ea0f0889",
      measurementId: "G-9Q720937NE"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        msg = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name + "<img src='tick.png' class = 'user_tick'> </h4>";
                        msg_with_tag = "<h5>" + msg + "</h5>";
                        like_button = "<button class='btn btn-success' id= " + firebase_message_id + "value = " + like + " onclick = 'update_like(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : " + like + "<span><hr></button>";
                        row = name_with_tag + msg_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML = row;

                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function send() {
      message = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({ name: user_name, message: message, like: 0 });
      document.getElementById("msg").value = " ";
}

function back() {
      window.location = "kwitter_room.html";
}

function update_like(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({ like: updated_likes });
}
