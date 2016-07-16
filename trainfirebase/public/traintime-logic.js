// NOTE WHEN CREATING DATA SETS WHEN USING THIS CODE ... CODE IS GENERATED IN FIRE BASE FROM THE SCRIPT IN THIS PROGRAM...
//DO NOT MANUALLY INPUT THE DATA CHARTS INTO FIREBASE IF TESTING OR RE-USING THIS CODE...
//*UNLESS YOU WISH TO EDIT THE DATA TABLE / CREATE A NEW DATA TABLE IN THE SCRIPT OR IN FIREBASE

// Steps to complete:
/*
1. Create Firebase link
2. Create initial train data in database
3. Create button for adding new trains - then update the html + update the database
4. Create a way to retrieve trains from the trainlist.
5. Create a way to calculate the time way. Using difference between start and current time.Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)
// NOTE WHEN CREATING DATA SETS WHEN USING THIS CODE ... CODE IS GENERATED IN FIRE BASE FROM THE SCRIPT IN THIS PROGRAM...
DO NOT MANUALLY INPUT THE DATA CHARTS INTO FIREBASE IF TESTING OR RE-USING THIS CODE
*UNLESS YOU WISH TO EDIT THE DATA TABLE / CREATE A NEW DATA TABLE IN THE SCRIPT OR IN FIREBASE

*/
// 1. Link to Firebase
var trainData = new Firebase("https://choo-choo-firetrain.firebaseio.com/");

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)

// 3. Button for adding trains
$("#addTrainBtn").on("click", function() {

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrainUnix,
        frequency: frequency
    }

    // Upload to the database
    trainData.push(newTrain);

    // Log  everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(firstTrainUnix);
    console.log(newTrain.frequency)

    // Alert
    alert("Train successfully added");

    // Clears all text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    //  Calculates when next train arrives.
    return false;
});


// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //bank
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    //Calculate 
    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = parseInt(tFrequency) - parseInt(tRemainder);


    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    console.log(tMinutes);
    console.log(tArrival);

    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

    // Add train's data 
    $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});
