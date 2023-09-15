<a name="readme-top"></a>
<h1 align="center">
HOU-ASSEMBLY
</h1>

## Table of Contents
1. [Introduction](#intro)
2. [The Platform](#platform)
3. [How to use](#use)
4. [Languages & Technology & Packages & Frameworks](#languages)
5. [Resources & References](#resources)

***
<a name="intro"></a>
## Introduction
An e-commerce platform for buying and selling products between users and vendors.
***
<a name="platform"></a>
## The Platform

#### Register & Login
Users and vendors can register and login to start using the app.


To register, users will be able to create an account with username and password.
Vendors will be able to create an account with username, password and company name.


To login, users and vendors can log in using their registered username and password.


If users try to login with an incorrect username or password, they will be prompt of an unauthorised login in the console.


#### Explore Page - Shop

On the explore page, user and vendor created content will be displayed. A filter function on the side of the page will pull data from the database based on the user needs. Each individual product has an 'Add to cart' button that will add the product to the cart.



#### User Page - Created Product / Edit Product / Delete Product

At the User Page, the logged in entity can add product, and only edit and delete products originally created by them.



#### Shopping Cart

In the sopping cart, accessed by the trolley icon at the top right, the products added to the cart will be displayed with the quantity of the product displayed. The total cost of the entire shopping cart will also be displayed to show the logged in user. On click of the `Checkout` button, the user would have 'purchased' the products. 

***
<a name="use"></a>
## How to Use / View
1. Download frontend folder, backend folder and .gitignore
2. Add individual .env files to both frontend folder and backend folder
3. .env file for frontend folder should include:
   >
   > VITE_SERVER=http://localhost:[port]
5. .env file for backend folder should include:
   >
   > PORT=[port]
   >
   > ACCESS_SECRET=[any alphanumerical string]
   >
   >
7. npm install then npm run dev for both frontend and backend folders.
8. Run psql in your machine's terminal and create database
9. cd into the created directory and run the sql file from backend/z_test/datbase.sql
    
## Languages & Technology & Packages & Frameworks
- HTML
- CSS
- Typescript
- React (VITE)
- Express
- PostgreSQL
- ImgBB
- Bootstrap CSS
***
<a name="resources"></a>
## Resources & References

<p align="right">(<a href="#readme-top">back to top</a>)</p>
