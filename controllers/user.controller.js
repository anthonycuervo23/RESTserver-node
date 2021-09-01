const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req = request, res = response) => {

    const {q} = req.query;

    res.json({
        msg: 'get API - controller',
        query: q
    });
  }

const usersPost = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;
    // we parse the body with our user model
    const user = new User({ name, email, password, role });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save to DB
    await user.save();

    //Send the response
    res.json({
        user: user
    });
  }

  const usersPut = (req = request, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'put API /// controller',
        id: id
    });
  }

  const usersPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API // controller'
    });
  }

  const usersDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API -. controller'
    });
  }

  module.exports = {
      usersGet,
      usersPost,
      usersPut,
      usersPatch,
      usersDelete
  }