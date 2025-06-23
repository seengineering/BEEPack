--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: beehives; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.beehives (
    hive_id integer NOT NULL,
    user_id integer,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    hive_name character varying(50) NOT NULL,
    hive_location character varying(100),
    hive_type character varying(50),
    sensor_id character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255) DEFAULT 'assets/img/beehive/bee1.png'::character varying
);


ALTER TABLE public.beehives OWNER TO postgres;

--
-- Name: beehives_hive_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.beehives_hive_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beehives_hive_id_seq OWNER TO postgres;

--
-- Name: beehives_hive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.beehives_hive_id_seq OWNED BY public.beehives.hive_id;


--
-- Name: sensors_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensors_data (
    data_id integer NOT NULL,
    sensor_id character varying(50),
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    temperature numeric(5,2),
    humidity numeric(5,2),
    longitude numeric(9,6),
    latitude numeric(8,6),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    hive_state text
);


ALTER TABLE public.sensors_data OWNER TO postgres;

--
-- Name: sensors_data_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sensors_data_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sensors_data_data_id_seq OWNER TO postgres;

--
-- Name: sensors_data_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sensors_data_data_id_seq OWNED BY public.sensors_data.data_id;


--
-- Name: sms_alert_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sms_alert_settings (
    id integer NOT NULL,
    user_id integer NOT NULL,
    min_temp double precision NOT NULL,
    max_temp double precision NOT NULL,
    min_humidity double precision NOT NULL,
    max_humidity double precision NOT NULL,
    min_weight double precision NOT NULL,
    max_weight double precision NOT NULL,
    is_alerts_on boolean DEFAULT false NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sms_alert_settings OWNER TO postgres;

--
-- Name: sms_alert_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sms_alert_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sms_alert_settings_id_seq OWNER TO postgres;

--
-- Name: sms_alert_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sms_alert_settings_id_seq OWNED BY public.sms_alert_settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(20),
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    current_sensor_id text DEFAULT 'Select Sensor'::text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: beehives hive_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beehives ALTER COLUMN hive_id SET DEFAULT nextval('public.beehives_hive_id_seq'::regclass);


--
-- Name: sensors_data data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_data ALTER COLUMN data_id SET DEFAULT nextval('public.sensors_data_data_id_seq'::regclass);


--
-- Name: sms_alert_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sms_alert_settings ALTER COLUMN id SET DEFAULT nextval('public.sms_alert_settings_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: beehives beehives_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beehives
    ADD CONSTRAINT beehives_pkey PRIMARY KEY (hive_id);


--
-- Name: beehives beehives_sensor_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beehives
    ADD CONSTRAINT beehives_sensor_id_key UNIQUE (sensor_id);


--
-- Name: sensors_data sensors_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_data
    ADD CONSTRAINT sensors_data_pkey PRIMARY KEY (data_id);


--
-- Name: sms_alert_settings sms_alert_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sms_alert_settings
    ADD CONSTRAINT sms_alert_settings_pkey PRIMARY KEY (id);


--
-- Name: sms_alert_settings sms_alert_settings_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sms_alert_settings
    ADD CONSTRAINT sms_alert_settings_user_id_key UNIQUE (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: beehives beehives_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beehives
    ADD CONSTRAINT beehives_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: sms_alert_settings fk_user_float; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sms_alert_settings
    ADD CONSTRAINT fk_user_float FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: sensors_data sensors_data_sensor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_data
    ADD CONSTRAINT sensors_data_sensor_id_fkey FOREIGN KEY (sensor_id) REFERENCES public.beehives(sensor_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

