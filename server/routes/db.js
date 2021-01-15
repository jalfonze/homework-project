const spicedPg = require("spiced-pg");

db = spicedPg("postgres:postgres:postgres@localhost:5432/tracks");

module.exports.getInfo = () => {
    return db.query(
        `
        SELECT * FROM homework.shipments
        WHERE creation_timestamp BETWEEN CURRENT_DATE - interval '12 weeks' AND CURRENT_DATE
        `
    );
};
