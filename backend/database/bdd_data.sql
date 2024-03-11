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
);

INSERT INTO articles (
  nom, image, prix, ajout_date, nb_ventes, taille, vendeuse, quantité
) VALUES (
  "BOUCLE D’OREILLES FEUILLES LOTUS", "/static/boucles_oreilles.png", 25.00, NOW(), 10, 5, "Elya", 12
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 49.99, NOW(), 1, 15, "Achlys", 9
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 19.49, NOW(), 6, 32, "Doireann", 3
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 25.49, NOW(), 8, 15, "Achlys", 9
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 25.00, NOW(), 2, 32, "Doireann", 3
) , (
  "ILLUSTRATION SIRENE", "/static/illustration_sirene.png", 25.99, NOW(), 20, 15, "Achlys", 9
) , (
  "PELUCHE CHAMPIGNON", "/static/peluche_champignon.png", 25.00, NOW(), 2, 32, "Doireann", 3
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
  5, 1
), (
  4, 1
), (
  7, 3
), (
  5, 2
), (
  1, 5
), (
  1, 4
), (
  2, 6
);

INSERT INTO thematiques (
  thematique
) VALUES (
  "bijoux"
),
(
  "decoration"
),
(
  "illustration"
),
(
  "vetement"
),
(
  "accessoire"
);

INSERT INTO thematiques_has_articles (
  thematiques_id, articles_id
) VALUES (
  1, 2
), (
  1, 3
), (
  3, 2
), (
  5, 6
), (
  3, 4
);

INSERT INTO types (
  type
) VALUES (
  "steampunk"
),
(
  "fantasy"
),
(
  "medieval"
),
(
  "magie"
),
(
  "feerie"
),
(
  "cottage-core"
);

INSERT INTO types_has_articles (
  types_id, articles_id
) VALUES (
  1, 2
), (
  1, 3
), (
  3, 2
), (
  5, 6
), (
  3, 4
);