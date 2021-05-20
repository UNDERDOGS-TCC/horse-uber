// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD9jbjSYVnKgv2DZ5u-pjhU-67U8T5R358",
    authDomain: "uberhorse-c5ddf.firebaseapp.com",
    projectId: "uberhorse-c5ddf",
    storageBucket: "uberhorse-c5ddf.appspot.com",
    messagingSenderId: "271139498718",
    appId: "1:271139498718:web:e24d9ce27f5ff721d1704f",
    measurementId: "G-RKLZLS4L4V"
  },
  ibm_cos: {
    apikey: "t7Hv8ASGi-EC9rBS2AeervV475j43GhNcLB02hed3KE8",
    endpoints: "https://s3.us-south.cloud-object-storage.appdomain.cloud",
    bucket: "horse-uber-cos",
    object: "db.json",
    iam_apikey_description: "Auto-generated for key 3cf48c59-398d-4ebd-89a7-b695f02f432b",
    iam_apikey_name: "Service credentials-1",
    iam_role_crn: "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    iam_serviceid_crn: "crn:v1:bluemix:public:iam-identity::a/779f983de3f0497aa95720c4b56b4d33::serviceid:ServiceId-f60aef57-7ec9-4173-b869-ff383a50d332",
    resource_instance_id: "crn:v1:bluemix:public:cloud-object-storage:global:a/779f983de3f0497aa95720c4b56b4d33:f692028b-f580-4a23-b9a4-289866d1cde9::"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
