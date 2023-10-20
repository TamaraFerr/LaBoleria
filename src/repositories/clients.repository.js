import db from "../database/database.connection.js";

export async function createClient(name, address, phone) {
    const query = `INSERT INTO clients (name, address, phone) VALUES ( $1, $2, $3 );`;
    return db.query(query, [name, address, phone]);
}

export async function findingClients(id) {
    const query = `SELECT * FROM clients WHERE id = $1;`;
    const resulte = await db.query(query, [id]);
    return resulte.rows[0];
}
  
export async function findingClientsOrders(id) {
    const query = `
        SELECT o."id" AS "orderId", o."quantity", o."createdAt", o."totalPrice", c."name" AS "cakeName"
        FROM orders o
        JOIN cakes c ON o."cakeId" = c."id"
        WHERE o."clientId" = $1;`;
    const resulte = await db.query(query, [id]);
    return resulte.rows;
}