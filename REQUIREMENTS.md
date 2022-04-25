# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `'/products/' [GET]`
- Show: `'/products/:id' [GET]`
- Create (args: Product)[token required]: `'/products/' [POST] (token)`
- Update (args: id, Product)[token required]: `'/products/:id' [PUT]`
- Delete (args: id)[token required]: `'/products/:id [DELETE]`
- [OPTIONAL] Products by category: `'/products/category/:category' [GET]`
- [OPTIONAL] Top 5 most popular products: `'/dashboard/top-five [GET]`

#### Users

- Index [token required]: `'/users/' [GET] (token)`
- Show [token required]: `'/users/:id' [GET] (token)`
- Create (args: User): `'/users/' [POST]`
- Update (args: id, User)[token required]: `'/users/:id' [PUT] (token)`
- Delete [token required]: `'/users/:id' [DELETE] (token)`
- Authenticate (args: id, password): `'/users/authenticate/:id'`

#### Orders

- Index [token required]: `'orders/' [GET] (token)`
- Show [token required]: `'orders/:id' [GET] (token)`
- Create (args: Order)[token required]: `'/orders/' [POST] (token)`
- Update (args: id, Order)[token required]: `'/orders/:id' [PUT] (token)`
- Delete (args: id)[token required]: `'/orders/:id' [DELETE] (token)`
- Completed orders by user (args: user_id)[token required]: `'/orders/user/:user_id' [GET] (token)`
- Add product to order (args: product_id, ProductOrder)[token required]: `'/orders/product/:product_id' [POST] (token)`

## Data Shapes

#### products

| Columns       |         id         |     name     |  price  |   category   | order_counter |
| :------------ | :----------------: | :----------: | :-----: | :----------: | :-----------: |
| <b>Values</b> | SERIAL PRIMARY KEY | VARCHAR(255) | INTEGER | VARCHAR(128) |    BIGINT     |

#### users

| Columns       |       email        |  firstName   |  lastName   | password |
| :------------ | :----------------: | :----------: | :---------: | :------: |
| <b>Values</b> | SERIAL PRIMARY KEY | VARCHAR(255) | VARCHAR(32) |   TEXT   |

#### orders

| Columns       |         id         |   status    | user_id |
| :------------ | :----------------: | :---------: | :-----: |
| <b>Values</b> | SERIAL PRIMARY KEY | VARCHAR(64) | BIGINT  |

#### order_product

| Columns       |         id         | quantity | order_id | product_id |
| :------------ | :----------------: | :------: | :------: | :--------: |
| <b>Values</b> | SERIAL PRIMARY KEY | INTEGER  |  BIGINT  |   BIGINT   |

