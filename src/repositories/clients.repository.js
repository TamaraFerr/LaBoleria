import db from "../database/database.connection.js";

export function createClients(name, address, phone){
    return db.query(
        `INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`, 
        [name, address, phone]
    )
}

export async function getClientsOrdersById(clientId){
    const resulte = await db.query(
        `SELECT 
            o.id AS "orderId",
            o.quantity,
            to_char(o.createdat, 'YYYY-MM-DD HH24:MI') AS "createdAt",
            o.totalprice AS "totalPrice",
            k.name AS "cakeName"
        FROM orders o
        JOIN clients c ON o.clientid = c.id
        JOIN cakes k ON o.cakeid = k.id
        WHERE o.clientid = $1
    `, [clientId])

    return resulte.rows || []
}