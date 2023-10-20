import db from "../database/database.connection.js";

const findingOrders =`
    SELECT
        jsonb_build_object(
        'client', jsonb_build_object('id', cl."id", 'name', cl."name", 'address', cl."address", 'phone', cl."phone"),
        'cake', jsonb_build_object('id', ca."id", 'name', ca."name", 'price', ca."price", 'description', ca."description", 'image', ca."image"),
        'orderId', o."id",
        'createdAt', o."createdAt",
        'quantity', o."quantity",
        'totalPrice', o."totalPrice"
        ) AS resulte
    FROM orders o
    JOIN clients cl ON o."clientId" = cl."id"
    JOIN cakes ca ON o."cakeId" = ca."id"
`;

export async function createOrder(clientId, cakeId, quantity, totalPrice) {
    const query = `INSERT INTO orders
      ("clientId", "cakeId" , quantity, "totalPrice")
      VALUES ( $1, $2, $3, $4 );`;
    return db.query(query, [clientId, cakeId, quantity, totalPrice]);
}
  
export async function findingDays(date) {
  const query = `${findingOrders} 
    WHERE SUBSTRING(TO_CHAR("createdAt", 'YYYY-MM-DD HH24:MI:SS')
    FROM 1 FOR 10) = $1;`;
  const resulte = await db.query(query, [date]);
  return resulte.rows;
}

export async function findingOrderById(id) {
  const query = `${findingOrders} WHERE o.id = $1;`;
  const resulte = await db.query(query, [id]);
  return resulte.rows;
}

export async function findingAllOrders() {
  const query = findingOrders;
  const resulte = await db.query(query);
  return resulte.rows;
}