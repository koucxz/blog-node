'use strict'
module.exports = app => {
  const { router, controller } = app
  const { createArticle, updateArticle, getArticleList, getArticleById } = controller.article
  router.post('/articles', createArticle)
  router.put('/articles:id', updateArticle)
  router.get('/articles', getArticleList)
  router.get('/articles/:id', getArticleById)
}
