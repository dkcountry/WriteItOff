/**
 * @desc Global Parameters
 */
export const PROJECT_NAME = 'Keepers'; // Project Name
export const GOOGLE_LOGIN_CLIENT_ID = '1029777365032-becq276fq24vqjmfjr0cc27scpq77fmm.apps.googleusercontent.com'; // Google + API client ID
export const GOOGLE_LOGIN_SECERET_ID = ''; // Google + API client seceret ID

/**
 * @desc Get server URL based on host name
 */
export function serverUrl() {
  let hostDetails = window.location;
  if (hostDetails.hostname === 'localhost') {
    return 'https://writeitoff.herokuapp.com/';
  } else {
    return 'https://writeitoff.herokuapp.com/';
  }
}

/**
 * @desc Get APP url based on host name
 */
export function appUrl() {
  let hostDetails = window.location;
  if (hostDetails.hostname === 'localhost') {
    return 'http://localhost:3000';
  } else {
    return 'https://keepertax.com/';
  }
}
