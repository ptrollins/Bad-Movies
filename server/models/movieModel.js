const sqlDb = require('../../db/sql');
//const mongoDb = require('../../db/mongodb')
const Promise = require('bluebird');
sqlDb.queryAsync = Promise.promisify(sqlDb.query);

module.exports = {
  saveFavorite: (
    { id, title, popularity, poster_path, overview, release_date },
    callback
  ) => {
    const query = `INSERT INTO favorites SET ?`;
    const values = {
      id,
      title,
      popularity,
      poster_path,
      overview,
      release_date,
    };
    sqlDb.query(query, values, callback);
  },

  deleteFavorite: (id, callback) => {
    var query = `
      DELETE FROM favorites
      WHERE \`id\` = ?;
    `;
    sqlDb.query(query, [id], callback);
  },

  getFavorites: (callback) => {
    var query = `
      SELECT * FROM favorites;
    `;
    sqlDb.query(query, callback);
  },
};
