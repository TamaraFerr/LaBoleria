import db from "../database/database.connection.js";

export async function createCake(name, price, image, description) {
    const query = `INSERT INTO cakes (name, price , image, description) VALUES ( $1, $2, $3, $4 );`;
    return db.query(query, [name, price, image, description]);
}
  
export async function findingCakes(id) {
    const query = `SELECT * FROM cakes WHERE id = $1;`;
    const resulte = await db.query(query, [id]);
    return resulte.rows[0];
}
  
export async function registCakes(name) {
    const query = `SELECT * FROM cakes WHERE name = $1;`;
    const resulte = await db.query(query, [name]);
    return resulte.rows[0];
}