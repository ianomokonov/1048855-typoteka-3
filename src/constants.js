'use strict';

module.exports = {
  API_PREFIX : `/api`,
  MAX_ID_LENGTH : 6,
  Env : {
    DEVELOPMENT: `development`,
    PRODUCTION: `production`
  },
  HttpCode : {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
  },
  ExitCode : {
    error: 1,
    success: 0,
  },
  USER_ARGV_INDEX : 2,
  DEFAULT_COMMAND : `--help`
};