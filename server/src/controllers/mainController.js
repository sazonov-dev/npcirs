const { User, Post } = require('../../db/models');

class MainController {
  async getInfo(req, res, next) {
    try {
      const users = await User.findAll();
      const posts = await Post.findAll();

      const usersArray = users.map((user) => ({
        id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, birthdate: user.birthdate.toDateString(),
      }));

      const postsArray = posts.map((post) => ({
        id: post.id, user_id: post.user_id, title: post.title, description: post.description, rating: post.rating, like_count: post.like_count, hidden: post.hidden
      }))

      if (usersArray.length > 0 && postsArray.length > 0) {
        return res.send({ user: usersArray, post: postsArray});
      }
      return res.sendStatus(400);
    } catch (e) {
      console.log(e.message);
      return res.send(400);
    }
  }

  async addNote(req, res, next) {
    const {firstName, lastName, email, birthdate} = req.body.body

    try {
      const users = await User.create({first_name: firstName, last_name: lastName, email: email, birthdate: birthdate});
      return res.sendStatus(200);
    } catch (e) {
      console.log(e.message);
      return res.send(400);
    }
  }

  async editNote(req, res, next) {
    const {id, firstName, lastName, email, birthdate} = req.body.body

    try {
      const users = await User.update({first_name: firstName, last_name: lastName, email: email, birthdate: birthdate}, {where: {id: id}});
      console.log(users)
      return res.sendStatus(200);
    } catch (e) {
      console.log(e.message);
      return res.send(400);
    }
  }

  async deleteNote(req, res, next) {
    const {id} = req.body.body

    try {
      const posts = await Post.destroy({where: {user_id: id}})
      const users = await User.destroy({where: {id: id}})
      console.log(users)
      return res.sendStatus(200);
    } catch (e) {
      console.log(e.message);
      return res.send(400);
    }
  }
  
}

module.exports = new MainController();
