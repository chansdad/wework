SyncedCron.add({
  name: 'Randomize Profile Random Sorter',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 2 hours');
  }, 
  job: function() {
    Profiles.find({}).forEach(function(profile){
      Profiles.update({_id:profile._id},{$set:{
            randomSorter:Math.floor(Math.random()*1000000)
        }});
    });
  }
});

console.log(Meteor.settings);

// SyncedCron.add({
//   name: 'Prerender.io Recache Main Pages',
//   schedule: function(parser) {
//     // parser is a later.parse object
//     return parser.text('every 4 hours');
//   }, 
//   job: function() {
//     if(Meteor.settings && Meteor.settings.PrerenderIO && Meteor.settings.PrerenderIO.token){ 
//       var sendRecacheRequest = function(url){
//         var result = HTTP.post("http://api.prerender.io/recache",{data:{
//           prerenderToken: Meteor.settings.PrerenderIO.token,
//           url: url
//         }});
//         if(result.statusCode !== 200){
//           console.log("Error - PrerenderIO Recache Failed");
//           console.log(result);
//         }
//       }

//       sendRecacheRequest(Meteor.absoluteUrl());
//       sendRecacheRequest(Meteor.absoluteUrl("jobs"));
//       sendRecacheRequest(Meteor.absoluteUrl("profiles"));
    
//     }else{
//       console.log('Missing PrerenderIO Token in settings - skipping recache')
//     }
//   }
// });

SyncedCron.options = {
  //Log job run details to console
  log: true,

  //Name of collection to use for synchronisation and logging
  collectionName: 'cronHistory',

  //Default to using localTime
  utc: true, 

  //TTL in seconds for history records in collection to expire
  //NOTE: Unset to remove expiry but ensure you remove the index from 
  //mongo by hand
  collectionTTL: 172800
};

SyncedCron.start();
