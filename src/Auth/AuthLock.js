// import { Auth0LockPasswordless } from "auth0-lock";
// import history from "../history";
// import runtimeEnv from "@mars/heroku-js-runtime-env";
// import { omit } from "lodash";
// export const AVAILABLE_SCOPES = {
//   openid: "Standard OAuth scope",
//   profile:
//     "The returned user will contain the user's name and profile photo, name will be provided as https://obos.no/names in first name / last name format.",
//   email:
//     "Returned user will contain the primary email stored in the user's OBOS profile.",
//   phone:
//     "Returned user will contain the primary phone number stored in the user's OBOS profile.",
//   roles:
//     "Will set the claim https://obos.no/roles, which will contain a list of the OBOS roles this user has in ANY organization. This does NOT mean the user has the roles listed here in any specific organization.",
//   owner:
//     "Will set the claim https://obos.no/ownerIn, which will contain a JSON list of the organization numbers (OBOS selskapsnummer) in which the user owns at least 1 section.",
//   boardmember:
//     "Will set the claim https://obos.no/boardmemberIn, which will contain a JSON list of the organization numbers (OBOS selskapsnummer) in which the user has a board role (leder, nestleder, varamedlem, styremedlem, styremedlem/sekretaær).",
//   app_metadata:
//     "Will return the auth0 app_metadata in the token https://auth0.com/app_metadata. Should normally not be used, and is restricted to certain apps (not every app can request this).",
//   user_metadata:
//     "Will return the auth0 user_metadata in the token as claim https://auth0.com/user_metadata, can be requested by any app."
// };
//
// export class AuthLock {
//   constructor() {
//     const env = runtimeEnv();
//
//     this.lock = new Auth0LockPasswordless(
//       env.REACT_APP_AUTH0_CLIENT_ID,
//       env.REACT_APP_AUTH0_DOMAIN,
//       {
//         allowedConnections: ["sms"], // Should match the Email connection name, it defaults to 'email'
//         passwordlessMethod: "code", // If not specified, defaults to 'code'
//         configurationBaseUrl: "https://cdn.eu.auth0.com",
//         language: "no",
//         auth: {
//           redirectUrl: `${window.location.origin}/callback`,
//           responseType: "token id_token",
//           params: {
//             scope: Object.keys(AVAILABLE_SCOPES).join(" ")
//           }
//         }
//       }
//     );
//
//     this.lock.on("authenticated", authResult => {
//       this.setSession(authResult);
//
//       this.lock.hide();
//     });
//
//     this.lock.on("unrecoverable_error", (...args) => {
//       console.log("unrecoverable_error", args);
//     });
//
//     this.lock.on("authorization_error", (...args) => {
//       console.log("authorization_error", args);
//       alert("Authorization error");
//     });
//   }
//
//   renewSession() {
//     this.lock.checkSession(
//       {
//         auth: {
//           redirectUrl: `${window.location.origin}/callback`,
//           responseType: "token id_token",
//           params: {
//             scope: Object.keys(AVAILABLE_SCOPES).join(" ")
//           }
//         }
//       },
//       (err, authResult) => {
//         if (authResult && authResult.accessToken && authResult.idToken) {
//           this.setSession(authResult);
//         } else if (err) {
//           this.logout();
//           alert(
//             `Could not get a new token (${err.error}: ${
//               err.error_description
//             }).`
//           );
//         }
//       }
//     );
//   }
//
//   setSession(authResult) {
//     localStorage.setItem("id_token", authResult.idToken);
//     localStorage.setItem("access_token", authResult.accessToken);
//     localStorage.setItem("isLoggedIn", "true");
//
//     // Set the time that the access token will expire at
//     let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
//     this.accessToken = authResult.accessToken;
//     this.idToken = authResult.idToken;
//     this.expiresAt = expiresAt;
//
//     // navigate to the home route
//     history.replace("/home");
//   }
//
//   login() {
//     this.lock.show();
//   }
//
//   logout() {
//     this.expiresAt = 0;
//     localStorage.removeItem("isLoggedIn");
//
//     this.lock.logout({
//       returnTo: window.location.origin
//     });
//   }
//
//   isAuthenticated() {
//     if (new Date().getTime() < this.expiresAt) {
//       return true;
//     }
//
//     if (localStorage.getItem("isLoggedIn") === "true") {
//       return null;
//     }
//
//     return false;
//   }
//
//   getProfile(cb) {
//     this.lock.getUserInfo(localStorage.getItem("access_token"), (err, user) => {
//       if (err) {
//         cb(err, null);
//       } else {
//         console.dir(user);
//         const app_metadata = user["https://auth0:com/appMetadata"];
//         const user_metadata = user["https://auth0:com/userMetadata"];
//         const profile = omit(user, [
//           "https://auth0:com/appMetadata",
//           "https://auth0:com/userMetadata"
//         ]);
//         cb(null, { app_metadata, user_metadata, profile });
//       }
//     });
//   }
// }
