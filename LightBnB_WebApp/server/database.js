const pool = require('./db');

// const properties = require('./json/properties.json');
// const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const userEmailQuery = `
  SELECT *
  FROM users
  WHERE users.email = $1;
  `
  return pool.query(userEmailQuery, [email])
    .then(res => {
      if(res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch (err => {
      console.log('query error:', err)
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const userIDQuery = `
  SELECT * FROM users
  WHERE users.id = $1
  `;
  return pool.query(userIDQuery, [id])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.log('query error:', err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const addUserQuery = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return pool.query(addUserQuery, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('error:', err);
    })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const resoQuery = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  console.log(resoQuery);
  const values = [guest_id, limit]
  return pool.query(resoQuery, values)
  .then(res => {
    return res.rows;
  })
  .catch (err => {
    return console.log('error', err);
  });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 5) {
  const queryParams = []
  let allPropertiesQuery = `
      SELECT properties.*, avg(property_reviews.rating) 
      FROM properties 
      JOIN property_reviews ON properties.id = property_id
      `;
    if (options.city) {
      queryParams.push(`%${options.city}`);
      allPropertiesQuery += `WHERE city LIKE $${queryParams.length}`;
    }
    if (options.owner_id) {
      queryParams.push(options.owner_id);
      if (queryParams.length === 1) {
        allPropertiesQuery += `WHERE owner_id = $${queryParams.length} `;
      } else {
        allPropertiesQuery += `AND owner_id = $${queryParams.length} `;
      }
    }

    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
      if (queryParams.length === 2) {
        allPropertiesQuery += `WHERE cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
      } else {
        allPropertiesQuery += `AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
      }
    }

    allPropertiesQuery += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    allPropertiesQuery += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  allPropertiesQuery += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(allPropertiesQuery, queryParams);


  return pool.query(allPropertiesQuery, queryParams)
  .then(res => res.rows);

  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyQuery = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];
  
  return pool.query(propertyQuery, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('query error:', err);
    })
  }
exports.addProperty = addProperty;
