
var extend = require('extend');
var google = require('google');
var objCase = require('obj-case');
var url = require('url');

/**
 * Create a new leader plugin.
 *
 * @returns {Object}
 */

module.exports = function () {
  return { fn: plugin(), wait: wait };
};

/**
 * Create a domain googling leader plugin.
 *
 * @return {Function}
 */

function plugin () {
  return function domainPlugin (person, context, next) {
    var domain = getDomain(person, context);
    if (!domain) return next();
    var query = 'linkedin ' + domain;
    google(query, function (err, nextPage, results) {
      if (err) return next(err);
      if (results.length > 0) {
        var result = results[0];
        var parsed = url.parse(result.link);
        if (parsed.host.indexOf('linkedin.com') !== -1) {
          extend(true, person, {
            company: { linkedin: { url: result.link }}
          });
        }
      }
      next();
    });
  };
}

/**
 * Wait until we have an interesting domain.
 *
 * @param {Object} context
 * @param {Object} person
 * @return {Boolean}
 */

function wait (person, context) {
  return getDomain(person, context);
}

/**
 * Get an interesting domain.
 *
 * @param {Object} context
 * @param {Object} person
 * @return {String}
 */

function getDomain (person, context) {
  if (person.domain && !person.domain.disposable && !person.domain.personal)
    return person.domain.name;
  else
    return null;
}