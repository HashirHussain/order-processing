// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: `0oa9z7bw2A3gVJFnT4x6`,
    issuer: `https://dev-277049.okta.com/oauth2/default`,
    redirectUri: "http://localhost:4200/implicit/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    baseApiUrl: 'https://tph-marketthresholdvalueservice.azurewebsites.net/'
  }
};
