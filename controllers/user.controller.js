const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

  //get all users paginated
const usersGet = async(req = request, res = response) => {

  const { limit = 10, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({status: true}),
    User.find({status: true})
      .skip(Number(from))
      .limit(Number(limit))
  ]);

    res.json({
      total: total,
        users: users
    });
  }

  //Create new user
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

  //Update user info
  const usersPut = async(req = request, res = response) => {

    const { id } = req.params
    
    const { _id, password, google, email, ...resto } = req.body;

    if( password ) {
      //Encrypt password
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'User updated successfully on Database',
        user: user
    });
  }

  const usersPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
  }

  const usersDelete = async(req = request, res = response) => {

    const { id } = req.params;

    //Delete fisicamente user from DB
    // const user = await User.findByIdAndDelete(id);

    //Delete user in frontend but not in Database
    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        msg: 'User deleted Successfully',
        user
    });
  }

  const usersDeleteDB = async(req = request, res = response) => {

    const { id } = req.params;

    //Delete fisicamente user from DB
    const user = await User.findByIdAndDelete(id);

    res.json({
        msg: 'User deleted Successfully from DB',
        user
    });
  }

  module.exports = {
      usersGet,
      usersPost,
      usersPut,
      usersPatch,
      usersDelete,
      usersDeleteDB
  }