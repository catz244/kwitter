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
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function add_room(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on(
       'value', 
       function (snapshot) {
        document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(
                  function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(Room_names);
                  row = "<div class='room_name'id ="+ Room_names +" onclick = 'redirectRoomName(this.id)'>#" + Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML += row; 
            });
      });
}
getData();

function redirectRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.HTML";
}

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}