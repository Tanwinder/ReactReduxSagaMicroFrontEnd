export const endPoints = {
  DEPT_SALES: Symbol("DEPT_SALES"),
  USER_PREFERENCES: Symbol("USER_PREFERENCES")
};

export function getApiBaseUrl(endpoint) {
  var environment = !!process.env.NODE_ENV ? String(process.env.NODE_ENV) : "ci";
  const DEV = "development";
  const CI = "ci";
  const STAGE = "stage1";
  const STRESS = "stress1";
  const PROD = "production";
  const PREPOD = "preproduction";
  const UAT = "uat";

  const urlsObj = JSON.parse(sessionStorage.getItem('rocOrderOptimizationUrls'));

  if(endpoint === endPoints.USER_PREFERENCES) {
    switch (environment) {
      case DEV:
        return "serviceurl";
    }
  } else if (endpoint === endPoints.DEPT_SALES) {
    switch (environment) {
      case DEV:
        return "serviceurl";
    }
  }
}
