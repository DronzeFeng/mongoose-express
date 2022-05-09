const errorHandle = require('../services/errorHandle');
const successHandle = require('../services/successHandle');
const postModel = require('../models/post');
const posts = {
  async getPosts(req, res) {
    const post = await postModel.find();

    successHandle(res, post);
  },
  async createPost(req, res) {
    try {
      const { body } = req;

      if (body !== undefined) {
        const newPost = await postModel.create({
          content: body.content,
          image: body.image,
          createdAt: body.createdAt,
          name: body.name,
          likes: body.likes,
        });

        successHandle(res, newPost);
      } else {
        errorHandle(res);
      }
    } catch (error) {
      errorHandle(res, error);
    }
  },
  async deleteAllPosts(req, res) {
    const posts = await postModel.deleteMany({});

    successHandle(res, posts);
  },
  async deleteOnePost(req, res, id) {
    postModel
      .findByIdAndDelete(id)
      .then(async (data) => {
        const posts = await postModel.find();

        if (data === null) {
          errorHandle(res);
        } else {
          successHandle(res, posts);
        }
      })
      .catch((error) => {
        errorHandle(res, error);
      });
  },
  async patchOnePost(req, res, id) {
    try {
      const { body } = req;

      if (body !== undefined && body.content !== '') {
        postModel
          .findByIdAndUpdate(id, body, { new: true })
          .then(async (data) => {
            const posts = await postModel.find();

            if (data === null) {
              errorHandle(res);
            } else {
              successHandle(res, posts);
            }
          })
          .catch((error) => {
            errorHandle(res, error);
          });
      } else {
        errorHandle(res);
      }
    } catch (error) {
      errorHandle(res, error);
    }
  },
};

module.exports = posts;
