# Apollo Commerce

Project developed for a technical test of an Apollo selection process.

## Run locally

In order to run the project on your machine, follow the instructions inside each subfolder of the project root.

## Questions

1.  What would be your first improvements if you had more implementation time?

    A: As the project already has an initial structure and functionalities implemented, at this point I believe the best thing to do would be to proceed with unit test coverage, which would facilitate maintenance and future extensions. In addition, it would complete the filtering of products via the server, implement batch operations, such as deletions for example, and add more feedback on errors during communication with the server.

2.  Thinking about your solution, how would maintenance be in case of adding new product
    categories? What would need to be changed?

        A: As I implemented the categories as a separate model, adding new categories would be as simple as adding a new record to a database table

3.  What changes would need to be made to support updates in the product category's discount
    percentage so that whenever the discount percentage was changed, the new price would be
    reflected in all products of the same category?

        A: As I did, implementing the promotional price of orders as a computed field that depends on the price and discount of the product category. Thus, if the discount for a category changes, the value of all products related to it will be automatically updated. Likewise, if the price of a product changes, its promotional price is also updated.
