CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.product_category (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	category_name varchar(255) NOT NULL,
	CONSTRAINT product_category_category_name_key UNIQUE (category_name),
	CONSTRAINT product_category_pkey PRIMARY KEY (id)
);

CREATE TABLE public.product_database (
	id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_name varchar(255) NOT NULL,
	price numeric(15, 2) NOT NULL,
	prod_version float4 NULL,
	prod_category uuid NULL,
	prod_demo text NULL,
	product_photo text NULL,
	is_secondhand bool NULL default false,
	created_date date NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT product_database_prod_category_fkey FOREIGN KEY (prod_category) REFERENCES public.product_category(id)
);

CREATE TABLE public.shopping_cart (
	id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid NULL,
	order_date date NULL DEFAULT CURRENT_DATE,
	total_cost numeric(15, 2) NOT NULL DEFAULT 0.00,
	ship_address varchar(255) NOT NULL,
	ship_date date NULL DEFAULT CURRENT_DATE + 7,
	CONSTRAINT shopping_cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product_database(id)
);

CREATE TABLE public.actions (
	action_name varchar(255) UNIQUE NOT NULL,
	CONSTRAINT actions_pkey PRIMARY KEY (action_name)
);

CREATE TABLE public.messages (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	message text NOT NULL,
	CONSTRAINT messages_pkey PRIMARY KEY (id)
);

CREATE TABLE public.moderator_logs (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	action_name varchar(255) NULL,
	action_comments text NOT NULL,
	CONSTRAINT moderator_logs_pkey PRIMARY KEY (id),
	CONSTRAINT moderator_logs_action_name_fkey FOREIGN KEY (action_name) REFERENCES public.actions(action_name)
);



CREATE TABLE public.order_history (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	shop_cart_id uuid NULL,
	CONSTRAINT order_history_pkey PRIMARY KEY (id),
	CONSTRAINT order_history_shop_cart_id_fkey FOREIGN KEY (shop_cart_id) REFERENCES public.shopping_cart(id)
);



CREATE TABLE public.reviews (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	review text NOT NULL,
	CONSTRAINT reviews_pkey PRIMARY KEY (id)
);



CREATE TABLE public.vendors (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar(255) not null,
	hash_pwd varchar(255) not null,
	product_id uuid NULL,
  vendor_name varchar(255) NOT NULL,
	is_active bool default true,
	CONSTRAINT vendors_pkey PRIMARY KEY (id),
	CONSTRAINT vendors_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product_database(id)
);

CREATE TABLE public.wallet (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	hash_card_number varchar(255) NOT NULL,
	hash_card_exp_date varchar(255) NOT NULL,
	hash_card_cvv varchar(255) NOT NULL,
	CONSTRAINT wallet_hash_card_number_key UNIQUE (hash_card_number),
	CONSTRAINT wallet_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar(255) NOT NULL,
	hash_pwd varchar(255) NOT NULL,
	selling_prod_id uuid NULL,
	wallet_id uuid NULL,
	shop_cart_id uuid NULL,
	is_active bool NULL DEFAULT true,
	reviews uuid NULL,
	order_history uuid NULL,
	message_id uuid NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id),
	CONSTRAINT users_order_history_fkey FOREIGN KEY (order_history) REFERENCES public.order_history(id),
	CONSTRAINT users_reviews_fkey FOREIGN KEY (reviews) REFERENCES public.reviews(id),
	CONSTRAINT users_selling_prod_id_fkey FOREIGN KEY (selling_prod_id) REFERENCES public.product_database(id),
	CONSTRAINT users_shop_cart_id_fkey FOREIGN KEY (shop_cart_id) REFERENCES public.shopping_cart(id),
	CONSTRAINT users_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallet(id)
);

CREATE TABLE public.moderator (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar(255) NOT NULL,
	hash_pwd varchar(255) NOT NULL,
	moderator_log uuid NULL,
	user_id uuid NULL,
	product_id uuid NULL,
	is_active bool NULL DEFAULT true,
	CONSTRAINT moderator_pkey PRIMARY KEY (id),
	CONSTRAINT moderator_moderator_log_fkey FOREIGN KEY (moderator_log) REFERENCES public.moderator_logs(id),
	CONSTRAINT moderator_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product_database(id),
	CONSTRAINT moderator_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);