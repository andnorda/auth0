import auth0 from 'auth0-js'
import history from '../history'
import { omit } from 'lodash'
import runtimeEnv from '@mars/heroku-js-runtime-env'
export const AVAILABLE_SCOPES = {
  openid: 'Standard OAuth scope',
  profile:
    "The returned user will contain the user's name and profile photo, name will be provided as https://obos.no/names in first name / last name format.",
  email:
    "Returned user will contain the primary email stored in the user's OBOS profile.",
  phone:
    "Returned user will contain the primary phone number stored in the user's OBOS profile.",
  roles:
    'Will set the claim https://obos.no/roles, which will contain a list of the OBOS roles this user has in ANY organization. This does NOT mean the user has the roles listed here in any specific organization.',
  owner:
    'Will set the claim https://obos.no/ownerIn, which will contain a JSON list of the organization numbers (OBOS selskapsnummer) in which the user owns at least 1 section.',
  boardmember:
    'Will set the claim https://obos.no/boardmemberIn, which will contain a JSON list of the organization numbers (OBOS selskapsnummer) in which the user has a board role (leder, nestleder, varamedlem, styremedlem, styremedlem/sekretaær).',
  app_metadata:
    'Will return the auth0 app_metadata in the token https://auth0.com/app_metadata. Should normally not be used, and is restricted to certain apps (not every app can request this).',
  user_metadata:
    'Will return the auth0 user_metadata in the token as claim https://auth0.com/user_metadata, can be requested by any app.',
}

export class Auth {
  accessToken
  idToken
  expiresAt

  constructor() {
    const env = runtimeEnv()

    this.auth0 = new auth0.WebAuth({
      domain: env.REACT_APP_AUTH0_DOMAIN,
      clientID: env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: `${window.location.origin}/callback`,
      responseType: 'token id_token',
      scope: Object.keys(AVAILABLE_SCOPES).join(' '),
    })

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
    this.renewSession = this.renewSession.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log({ err, authResult })
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        history.replace('/home')
        console.log(err)
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    })
  }

  getAccessToken() {
    return this.accessToken
  }

  getIdToken() {
    return this.idToken
  }

  setSession(authResult) {
    // // Set isLoggedIn flag in localStorage
    // localStorage.setItem('isLoggedIn', 'true');
    //
    // // Set the time that the access token will expire at
    // let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    // this.accessToken = authResult.accessToken;
    // this.idToken = authResult.idToken;
    // this.expiresAt = expiresAt;
    //
    // // navigate to the home route
    // history.replace('/home');
    //

    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`,
        )
      }
    })
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    this.auth0.logout({
      returnTo: window.location.origin,
    })

    // navigate to the home route
    history.replace('/home')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }

  getProfile(cb) {
    // console.log(this.auth0.client)
    this.auth0.client.userInfo(
      localStorage.getItem('access_token'),
      (err, user) => {
        if (err) {
          cb(err, null)
        } else {
          console.dir(user)
          const app_metadata = user['https://auth0:com/appMetadata']
          const user_metadata = user['https://auth0:com/userMetadata']
          const profile = omit(user, [
            'https://auth0:com/appMetadata',
            'https://auth0:com/userMetadata',
          ])
          cb(null, { app_metadata, user_metadata, profile })
        }
      },
    )
  }
}
