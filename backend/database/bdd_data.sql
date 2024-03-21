INSERT INTO utilisateurs (
  nom,  prénom, date_de_naissance, telephone, email, password, adresse1, CP, ville, pays, seelie
) VALUES (
  "Poulet", "Alex", "2001-09-29", 0607593244, "alex@gmail.com", "1234", "6 rue de la Moutarde", 67000, "Strasbourg", "France", 1 
), (
  "Poulet", "Abdou", "2000-06-19", 0607593244, "abdou@gmail.com", "4321", "6 rue de la Moutarde", 67000, "Strasbourg", "France", 1 
), (
  "Hippopotame", "Lion", "2001-09-29", 0607593244, "alex@gmail.com", "1234", "6 rue de la Moutarde", 67000, "Strasbourg", "France", 1 
), (
  "Hippopotame", "Girafe", "2000-06-19", 0607593244, "abdou@gmail.com", "4321", "6 rue de la Moutarde", 67000, "Strasbourg", "France", 1 
), (
  "admin", "seelie", "2000-06-19", 0607593244, "admin@gmail.com", "$2b$10$qjVeymvkdHT9NWcxGsLSGujegcHnWWv/GFEcWhQMYiS9JqT6hohYa", "6 rue de la Moutarde", 67000, "Strasbourg", "France", 1 
);

INSERT INTO paiements (
  titulaire, numero, expiration, cvv
) VALUES (
  'Fée Clochette', '1111222233334444', '2026-07-01 00:00:00', '235'
),(
  'Peter pan', '5555666677778888', '2027-03-01 00:00:00', '457'
), (
  'Capitaine Crochet', '9999111122223333', '2028-05-01 00:00:00', '679'
);

INSERT INTO articles (
  nom, image, prix, ajout_date, nb_ventes, vendeuse
) VALUES (
  "BOUCLE D OREILLES FEUILLES LOTUS", "/static/boucles_oreilles.png", 25.00, NOW(), 10, "Elya"
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 49.99, NOW(), 1, "Achlys"
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 19.49, NOW(), 6, "Doireann"
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 25.49, NOW(), 8, "Achlys"
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 25.00, NOW(), 2, "Doireann"
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 25.99, NOW(), 20, "Achlys"
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 25.00, NOW(), 2, "Doireann"
);

INSERT INTO couleurs (
  couleur
) VALUES (
  "vert"
),
(
  "noir"
),
(
  "marron"
),
(
  "jaune"
),
(
  "orange"
),
(
  "rouge"
),
(
  "bleu"
),
(
  "rose"
),
(
  "violet"
);

INSERT INTO couleurs_has_articles (
  couleurs_id, articles_id
) VALUES (
  4, 1
), (
  7, 3
), (
  5, 2
), (
  6, 5
), (
  1, 4
),(
  3, 7
), (
  2, 6
);

INSERT INTO thematiques (
  thematique
) VALUES 
(
  "STEAMPUNK"
),
(
  "FANTASY"
),
(
  "MEDIEVAL"
),
(
  "MAGIE"
),
(
  "FEERIE"
),
(
  "COTTAGE CORE"
);

INSERT INTO thematiques_has_articles (
  thematiques_id, articles_id
) VALUES (
  1, 1
), (
  2, 3
), (
  3, 2
), (
  5, 6
), (
  4, 4
), (
  6, 5
), (
  4, 7
);

INSERT INTO types (
  type
) VALUES 
(
  "BIJOUX"
),
(
  "DECORATION"
),
(
  "ILLUSTRATION"
),
(
  "VETEMENT"
),
(
  "ACCESSOIRE"
);

INSERT INTO types_has_articles (
  types_id, articles_id
) VALUES (
  1, 1
), (
  2, 3
), (
  3, 2
), (
  5, 6
), (
  4, 4
), (
  1, 5
), (
  5, 7
);