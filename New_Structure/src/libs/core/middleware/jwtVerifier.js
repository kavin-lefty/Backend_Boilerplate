const { jwtVerify } = require("../helpers/jwtServices");
const { decryptString } = require("../helpers/cryptoService");
const { match } = require("path-to-regexp");
const {
  STR_COMMON_DB_TENANT_ID,
  objOpenAPI,
} = require("../../common/constants");

const jwtTokenChecking = async function (req, res, next) {
  const objResponseType = {
    "Content-Type": "application/json",
    "Last-Modified": new Date().toUTCString(),
  };

  try {
    const strEncryptedToken =
      req.headers["x-access-token"] || req.headers["authorization"];

    // Check if the route matches any open route pattern
    const isOpenRoute = Object.keys(objOpenAPI).some((pattern) => {
      const routeMatch = match(pattern, { decode: decodeURIComponent });

      return routeMatch(req.originalUrl);
    });

    if (!isOpenRoute) {
      // Protected routes require a token
      if (strEncryptedToken) {
        const strToken = await decryptString(strEncryptedToken);

        if (strToken) {
          const objOption = {
            issuer: "issuer",
            subject: "IP",
            audience: "USERS",
          };
          const objTokenDecoded = await jwtVerify(strToken, objOption);

          // Add decoded token details to the request
          req["strUserId"] = objTokenDecoded["strUserId"];
          req["strTenantId"] =
            objTokenDecoded["strTenantId"] || "maimicroservice";
          req["strType"] = objTokenDecoded["strType"];
          req["strEmail"] = objTokenDecoded["strEmail"];
          req["chrStatus"] = objTokenDecoded["chrStatus"];
          req["strEncryptedToken"] = strEncryptedToken;

          next();
        } else {
          return res
            .status(401)
            .set(objResponseType)
            .send("INVALID_TOKEN_PROVIDED");
        }
      } else {
        // No token provided for protected route
        return res.status(401).set(objResponseType).send("MISSING_TOKEN");
      }
    } else {
      // Allow open routes without a token
      req["strTenantId"] = req.headers["authorization"] || "maimicroservice";
      next();
    }
  } catch (error) {
    console.error("JWT validation error:", error.message);
    return res
      .status(401)
      .set(objResponseType)
      .send("UNAUTHORIZED_CREDENTIALS");
  }
};

module.exports = jwtTokenChecking;
