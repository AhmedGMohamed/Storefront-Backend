CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  product_id BIGINT NOT NULL REFERENCES products(id)
);