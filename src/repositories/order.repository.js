import db from "../database/database.connection.js";

export function createOrder(clientId, cakeId, quantity ,totalPrice){
    const createdAt = new Date();
    return db.query(
        `INSERT INTO orders (clientId, cakeId, quantity, totalPrice, createdAt)
        VALUES ($1, $2, $3, $4, $5)`,
        [clientId, cakeId, quantity, totalPrice, createdAt]
    );
}

export async function getCakesById(cakeId){
    const resulte = await db.query(`SELECT id FROM cakes WHERE id=$1;`, [cakeId]);
    if (resulte.rows && resulte.rows.length > 0) {
        return resulte.rows[0];
    } else {
        return null;
    }
}

export async function getClientsById(clientId){
    const resulte = await db.query(`SELECT id FROM clients WHERE id=$1;`, [clientId]);
    if (resulte.rows && resulte.rows.length > 0) {
        return resulte.rows[0];
    } else {
        return null;
    }
}

export async function getOrder(date){
    const filter = date ? `WHERE o."createdAt"::DATE = $1` : "";
    const values = date ? [date] : [];
    
    const resulte = await db.query(`
        SELECT
            c.id AS "clientId",
            c.name AS "clientName",
            c.address AS "clientAddress",
            c.phone AS "clientPhone",
            k.id AS "cakeId",
            k.name AS "cakeName",
            k.price AS "cakePrice",
            k.description AS "cakeDescription",
            k.image AS "cakeImage",
            o.id AS "orderId",
            to_char(o.createdat, 'YYYY-MM-DD HH24:MI') AS "createdAt",
            o.quantity,
            o.totalprice AS "totalPrice"
        FROM orders o
        JOIN clients c ON o.clientId = c.id
        JOIN cakes k ON o.cakeId = k.id
        ${filter}
    `, values);

    return resulte.rows;
}

export async function getOrderById(orderId){
    const resulte = await db.query(`
        SELECT
            c.id AS "clientId",
            c.name AS "clientName",
            c.address AS "clientAddress",
            c.phone AS "clientPhone",
            k.id AS "cakeId",
            k.name AS "cakeName",
            k.price AS "cakePrice",
            k.description AS "cakeDescription",
            k.image AS "cakeImage",
            o.id AS "orderId",
            to_char(o.createdat, 'YYYY-MM-DD HH24:MI') AS "createdAt",
            o.quantity,
            o.totalprice AS "totalPrice"
        FROM orders o
        JOIN clients c ON o.clientId = c.id
        JOIN cakes k ON o.cakeId = k.id
        WHERE o.id = $1
    `, [orderId]);

    return resulte.rows[0];
}