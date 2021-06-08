\c tentadb
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Guard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Guard" (id, username, password, "createdAt", "updatedAt") VALUES (1, 'Invigilator1', 'tenta1', '2021-05-16 16:59:13.851712+02', '2021-05-16 16:59:13.851712+02');


--
-- Data for Name: Ping; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Room" (id, name, grid, "createdAt", "updatedAt") VALUES (1, 'K204', '{3,3}', '2021-05-16 17:01:55.868995+02', '2021-05-16 17:01:55.868995+02');
INSERT INTO public."Room" (id, name, grid, "createdAt", "updatedAt") VALUES (2, 'K208', '{4,4}', '2021-05-16 17:01:55.868995+02', '2021-05-16 17:01:55.868995+02');
INSERT INTO public."Room" (id, name, grid, "createdAt", "updatedAt") VALUES (3, 'K304', '{5,5}', '2021-05-16 17:01:55.868995+02', '2021-05-16 17:01:55.868995+02');
INSERT INTO public."Room" (id, name, grid, "createdAt", "updatedAt") VALUES (4, 'SalC', '{6,6}', '2021-05-16 17:01:55.868995+02', '2021-05-16 17:01:55.868995+02');


--
-- Data for Name: Status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Status" (id, name, "createdAt", "updatedAt") VALUES (1, 'Active', '2021-05-16 16:55:31.059095+02', '2021-05-16 16:55:31.059095+02');
INSERT INTO public."Status" (id, name, "createdAt", "updatedAt") VALUES (2, 'Inactive', '2021-05-16 16:55:44.066018+02', '2021-05-16 16:55:44.066018+02');


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: UsbClient; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (1, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (2, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (3, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (4, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (5, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (6, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (7, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (8, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (9, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (10, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (11, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (12, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (13, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (14, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (15, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (16, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (17, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (18, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (19, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');
INSERT INTO public."UsbClient" (id, "createdAt", "updatedAt") VALUES (20, '2021-05-16 16:58:03.281085+02', '2021-05-16 16:58:03.281085+02');


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: Guard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Guard_id_seq"', 1, false);


--
-- Name: Ping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ping_id_seq"', 1, false);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 1, false);


--
-- Name: Session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Session_id_seq"', 1, false);


--
-- Name: Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Status_id_seq"', 1, false);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Student_id_seq"', 1, false);


--
-- Name: UsbClient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UsbClient_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

