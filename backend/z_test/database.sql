CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.product_category (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	category_name varchar(255) NOT NULL,
	CONSTRAINT product_category_category_name_key UNIQUE (category_name),
	CONSTRAINT product_category_pkey PRIMARY KEY (id)
);

CREATE TABLE public.order_history (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	product_id uuid NULL,
	order_date date NULL DEFAULT CURRENT_DATE,
	total_cost numeric(15, 2) NOT NULL DEFAULT 0.00,
	ship_address varchar(255) NOT NULL,
	ship_date date NULL DEFAULT CURRENT_DATE + 7,
	CONSTRAINT order_history_pkey PRIMARY KEY (id)
);

CREATE TABLE public.product_database (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	product_name varchar(255) NOT NULL,
	price numeric(15, 2) NOT NULL,
	prod_version varchar NULL,
	prod_category uuid NOT NULL,
	prod_desc text NOT NULL,
	product_photo text NOT NULL,
	is_secondhand bool NULL DEFAULT false,
	created_date date NOT NULL DEFAULT CURRENT_DATE,
	creator_vendor uuid NULL,
	creator_user uuid NULL,
	CONSTRAINT product_database_pkey PRIMARY KEY (id)
);

ALTER TABLE public.order_history ADD CONSTRAINT order_history_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product_database(id);


ALTER TABLE public.product_database ADD CONSTRAINT product_database_creator_user_fkey FOREIGN KEY (creator_user) REFERENCES public.users(id);
ALTER TABLE public.product_database ADD CONSTRAINT product_database_creator_vendor_fkey FOREIGN KEY (creator_vendor) REFERENCES public.vendors(id);
ALTER TABLE public.product_database ADD CONSTRAINT product_database_prod_category_fkey FOREIGN KEY (prod_category) REFERENCES public.product_category(id);

CREATE TABLE public.shopping_cart2 (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	product_ids _uuid NULL,
	order_date date NULL DEFAULT CURRENT_DATE,
	total_cost numeric(15, 2) NOT NULL DEFAULT 0.00,
	ship_address varchar(255) NOT NULL,
	ship_date date NULL DEFAULT CURRENT_DATE + 7,
	CONSTRAINT shopping_cart2_pkey PRIMARY KEY (id)
);

CREATE TABLE public.vendors (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar(255) NOT NULL,
	hash_pwd varchar(255) NOT NULL,
	vendor_name varchar(255) NOT NULL,
	is_active bool NULL DEFAULT true,
	CONSTRAINT vendors_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar(255) NOT NULL,
	hash_pwd varchar(255) NOT NULL,
	wallet_id uuid NULL,
	shop_cart_id uuid NULL,
	is_active bool NULL DEFAULT true,
	reviews uuid NULL,
	order_history _uuid NULL,
	message_id uuid NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE public.users ADD CONSTRAINT users_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id);
ALTER TABLE public.users ADD CONSTRAINT users_reviews_fkey FOREIGN KEY (reviews) REFERENCES public.reviews(id);
ALTER TABLE public.users ADD CONSTRAINT users_shop_cart_id_fkey FOREIGN KEY (shop_cart_id) REFERENCES public.shopping_cart(id);
ALTER TABLE public.users ADD CONSTRAINT users_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallet(id);