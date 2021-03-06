"use strict";

/**
 * Module dependencies.
 */
var acl = require("acl");

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Admin Permissions
 */
exports.invokeRolesPolicies = function() {
  acl.allow([
    {
      roles: ["superadmin"],
      allows: [
        {
          resources: "/api/rrs/user",
          permissions: "*"
        },
        {
          resources: "/api/rrs/user/:userId",
          permissions: "*"
        },
        {
          resources: "/api/rrs/userpermission",
          permissions: "*"
        }
      ]
    },
    {
      roles: ["admin", "manager"],
      allows: [
        {
          resources: "/api/rrs/user",
          permissions: ["get"]
        },
        {
          resources: "/api/rrs/user/:userId",
          permissions: ["get", "put"]
        },
        {
          resources: "/api/rrs/userpermission",
          permissions: ["post"]
        }
      ]
    },
    {
      roles: ["staff"],
      allows: [
        {
          resources: "/api/rrs/userpermission",
          permissions: ["post"]
        },
      ]
    }

  ]);
};

/**
 * Check If Admin Policy Allows
 */
exports.isAllowed = function(req, res, next) {
  var roles = req.user ? req.user.roles : ["guest"];

  // console.log(req.body);

  // Check for user roles
  acl.areAnyRolesAllowed(
    roles,
    req.route.path,
    req.method.toLowerCase(),
    function(err, isAllowed) {
      if (err) {
        // An authorization error occurred.
        return res.status(500).json({
          status: 403,
          message: "Unexpected authorization error"
        });
      } else {
        if (isAllowed) {
          // Access granted! Invoke next middleware
          return next();
        } else {
          return res.status(403).json({
            status: 403,
            message: "User is not authorized"
          });
        }
      }
    }
  );
};
