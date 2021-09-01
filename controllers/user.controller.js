const { response } = require('express');


const usersGet = (req, res = response) => {

    const {q} = req.query;

    res.json({
        msg: 'get API - controller',
        query: q
    });
  }

const usersPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API = controller', 
        body: body
    });
  }

  const usersPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'put API /// controller',
        id: id
    });
  }

  const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API // controller'
    });
  }

  const usersDelete = (req, res = response) => {
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