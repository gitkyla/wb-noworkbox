const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNBopwdVSC8seSbJgdzVC9kAZcOoYrm3Gc2LgT30_XKZuXUysMpmJ493huJro0EQR3N8JrqRlSRCUBXzXPZ3sUU",
    "privateKey": "6dhH2qGM3l6ky4QqiUbXMCtl30xHfu0ciHRo4JVq2Tw"
 };
  
  
 webPush.setVapidDetails(
    'mailto:agitsyang@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
 )
 let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cbVJORr2a2E:APA91bHyCamXcIYOnqV9VAu0HdDgUZpx0w_sfpRIjEb-ddyRz31CeDDqQRdDJgTA4f5xvkjkn7nR59K-NUjEg7j_UwT8vBLYwE-iZyal33sWeNsKqUDimEyfQ6R_xswkZ1Vy4JerlNjx",
    "keys": {
        "p256dh": "BAHtC44uLCCJ43baKYKNKZIvg3yiIZm1/sG7z+gPyIb7EWdtmfnKxr6p5i8RoUVB6/Fgg+RWgtWrKMasTdTjeZ0=",
        "auth": "YxPn1gCIXI4+mQKOo9gAeQ=="
    }
 };
 let payload = 'Notifikasi dari Push.js';
  
 let options = {
    gcmAPIKey: '475729610339',
    TTL: 60
 };
 webPush.sendNotification(
    pushSubscription,
    payload,
    options
 );