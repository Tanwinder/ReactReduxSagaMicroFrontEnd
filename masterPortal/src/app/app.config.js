import userAccess from 'json-loader!./user.group.json';
import userAccessLLE from 'json-loader!./user.group.test.json';
import config from 'json-loader!./app.config.json';

export function getUserAccess(userGroup,appName) {
  let env = process.env.NODE_ENV;
  if (env == 'production') {
    if (userAccess[appName][0][userGroup] != undefined) {
      return userAccess[appName][0][userGroup];
    }
  } else {
    if (userAccessLLE[appName][0][userGroup] != undefined) {
      return userAccessLLE[appName][0][userGroup];
    }
  }
}

function getEnvironmentVariables() {
  let env = process.env.NODE_ENV;
  return config[env];
}

export function userPreferenceService() {
  let env_obj = getEnvironmentVariables();
  let baseUrl = env_obj["ims"];
  // let baseUrl = process.env.fuse_app_url;
  return baseUrl;
}

export function App1Url() {
  let env_obj = getEnvironmentVariables();
  let baseUrl = env_obj["app1url"];
  // let baseUrl = process.env.fuse_app_url;
  return baseUrl;
}
export function App2Url() {
  let env_obj = getEnvironmentVariables();
  let baseUrl = env_obj["app2url"];
  // let baseUrl = process.env.opc_allocation_url;
  return baseUrl;
}
