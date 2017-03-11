// const models = require('../db/models/index');

// function findFaves(req, res, next) {
//   models.sequelize.query('SELECT "Technologies"."name", "Users"."firstName", "Users"."lastName", "Users"."email", "Users"."profile", "Users"."skills", "Technologies"."id", "Technologies"."category_name", "Favorites"."id" AS fave_id FROM "Technologies" JOIN "Favorites" ON "Favorites"."tech_id" = "Technologies"."id" JOIN "Users" ON "Favorites"."user_id" = "Users"."id" WHERE "Users"."id" = :id;', {
//     replacements: { id: req.user.dataValues.id },
//     type: models.sequelize.QueryTypes.SELECT
//   }).then((faves) => {
//     res.locals.faves = faves;
//     return next();
//   })
// }

// function findEvents(req, res, next) {
//   models.sequelize.query('SELECT "Events"."event_text", "Users"."firstName", "Users"."lastName", "Users"."email", "Events"."id", "Favorites"."id" AS fave_id FROM "Technologies" JOIN "Favorites" ON "Favorites"."tech_id" = "Technologies"."id" JOIN "Users" ON "Favorites"."user_id" = "Users"."id" WHERE "Users"."id" = :id;', {
//     replacements: { id: req.user.dataValues.id },
//     type: models.sequelize.QueryTypes.SELECT
//   }).then((faves) => {
//     res.locals.faves = faves;
//     return next();
//   })
// }
