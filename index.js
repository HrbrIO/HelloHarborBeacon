/*********************************

 File:       index.js
 Function:   HelloHarborBeacon!
 Copyright:  hrbr.io
 Date:       11/1/18 2:49 PM
 Author:     Mitch Kahn

 Example to properly use the beacon message post endpoint in Harbor.

 **********************************/

const request = require('superagent');
const util = require('util');

const SERVERS = {
    production: 'https://harbor-stream.hrbr.io/beacon',
    staging: 'https://harbor-stream-staging.hrbr.io/beacon'
};

// Normally you would never use staging. So don't. Seriously, it will get you nowhere.
const USE_SERVER = 'production';

// Dictionary abuse
const POST_URL = SERVERS[USE_SERVER];


// You find your API key on the website by clicking on the icon with your avatar (far right of nav bar) then
// selecting API Keys. Enter it here.
const API_KEY = 'GET_YOUR_API-KEY_FROM_WEBSITE';

// Now you need to have a valid appVersionId. To get one, create an app in your account. appVersionId's use a naming
// convention similar to a lot of bundle/docker ids which is a combination of RDNS and semantic versioning. Example:
// io.hrbr.mycoolapp:1.0.0. Feel free to use the appVersionId shown below for this tutorial.

const APP_VERSION_ID = 'io.hrbr.helloapp:1.0.0';

// You also need to have a beacon registered to your app in order for Harbor to accept the post. Beacons have a
// beaconVersionId which follows the same convention as the appVersionId, above. Let's use: io.hrbr.howdybeacon:1.0.0.

// You will need to add this beacon to your app by going to the app details page on the website, then clicking + BEACON.
// The beaconVersionId must match EXACTLY with what is below.

const BEACON_VERSION_ID = 'io.hrbr.howdybeacon:1.0.0';

// Each Beacon can have any number of beaconMessageTypes (BMT). Some beacons send only one type. That's the case with this
// example. A beacon message type is simply a string to help us identify different streams of monitoring data. Beacon Message
// Types *do not* need to be pre-registered in order for Harbor to accept the message.

const BEACON_MESSAGE_TYPE = 'HELLO_HARBOR';

// beaconInstanceId is used to tie a message to a specific device. It could be a server name, a phone's UUID, maybe a
// serial number for an IOT device. For this app, it doesn't matter much...

const BEACON_INSTANCE_ID = 'MY-COOL-COMPUTER';


// This function POSTs up a JSON message.
function sendBeaconMessage(payload){

    request.post(POST_URL)
        .send(payload)
        // always a good idea to be explicit about what you want back!
        .set('Accept', 'application/json')
        // API Key goes in the header like so.
        .set('apikey', API_KEY)
        // So does beacon message type
        .set('beaconMessageType', BEACON_MESSAGE_TYPE)
        // dataTimestamp is optional. If you don't set it, Harbor will mark it with the arrival time of the message.
        // However, if you are caching messages for a while before sending, you will want to set this with the time
        // at which the parameters were actually measured.
        .set('dataTimestamp', new Date().getTime())
        // beaconVersionId also goes in the header
        .set('beaconVersionId', BEACON_VERSION_ID)
        // appVersionId does too
        .set('appVersionId', APP_VERSION_ID)
        // and beaconInstanceId
        .set('beaconInstanceId', BEACON_INSTANCE_ID)
        .then(resp => {
            console.log("Yay! You said hello!!!");
            // Uncomment the below line to get a full inspection of your body printed to the console
            // console.log(util.inspect(resp.body));
        })
        .catch(err => {
            // If this barfs out a 400, odds are you have: 1) the wrong API key, 2) the wrong appVersionId setup in your account,
            // 3) the wrong beaconVersionId in your app in your account.
            console.error(`Uh oh, something bad happened! ${err.message}`);
            console.error(`Code: ${err.status}`)
            if (err.status === 400) console.log('A 400 error is usually a mismatch between API Key, appVersionId and beaconVersionId. Check these in the code and online.');
        });

}

// We'll need a data payload for our beacon message. Let's send something very useful like a random number.
const DATA_PAYLOAD = {
    random: Math.random(),
    message: "Hello Harbor, what's shaking?"
};

// Send it
sendBeaconMessage(DATA_PAYLOAD);

// The below section sends the beacon message every 3 seconds for 5 minutes allowing you to test Foghorn and View functionality

function sendLoop(count){

     for (let idx=0; idx<count; idx++){
         setTimeout(()=>{
             const message = `Hello #${idx} from Harbor`;
             console.log(message);
             const payload = { message, random: Math.random() };
             sendBeaconMessage(payload);
         }, 3000*idx);
     }

 }

 sendLoop(100);


