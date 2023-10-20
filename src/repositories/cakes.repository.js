import db from "../database/database.connection.js";

export function createCakes(name, price, image, description){
    return db.query(
        `INSERT INTO cakes (name, price, image, description)
        VALUES ($1, $2, $3, $4)`,
        [name, price, image, description]
    )
}

export async function getCakesByName(name){
    const result = await db.query(
        `SELECT * FROM cakes WHERE name = $1`,
        [name]
    );
    return result.rows[0];
}