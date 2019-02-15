'use strict';

const express = require('express');
const User = require('../../models/User');

const httpResponses = {
  onValidationError: {
    success: false,
    message: 'Please enter username, password and email.'
  },
  onUserSaveError: {
    success: false,
    message: 'That username already exists.'
  },
  onUserSaveSuccess: {
    success: true,
    message: 'Successfully created new user.'
  }
}

// Register new users
function registerUser(request, response) {
  let { username, password, email, name } = request.body;

  if (!username || !password || !email) {
    response.json(httpResponses.onValidationError);
  } else {
    new User({
      username, password, email, name
    }).save(error => {
      if (error) {
        return response.json(httpResponses.onUserSaveError);
      }
      response.json(httpResponses.onUserSaveSuccess);
    });
  }
}

module.exports = {
  registerUser: registerUser
};
