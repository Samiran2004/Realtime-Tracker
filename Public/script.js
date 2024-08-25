const socket = io();

//Check the browser support navigation or not...
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Sending location: ${latitude}, ${longitude}`);
        socket.emit("send-location", {
            latitude,
            longitude
        });
    }, (error) => {
        console.log(error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    });
}else{
    console.log("Geolocation not supported by this browser.");
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);


//Create empty marker...
const markers = {};

socket.on("receive-location", (users) => {
    console.log("Locations received from server:", users);
    users.forEach(user => {
       const { id, latitude, longitude } = user;
       console.log(`User ${id} at ${latitude}, ${longitude}`);
       map.setView([latitude, longitude], 16)
       if (!markers[id]) {
          markers[id] = L.marker([latitude, longitude]).addTo(map);
       } else {
          markers[id].setLatLng([latitude, longitude]);
       }
    });
 });


socket.on("user-disconnect",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})