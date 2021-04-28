INSERT INTO users (name, email, password)
VALUES ('George Costanza', 'georgy@porgy.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Radioactive Man', 'lookoutRadioactiveMan@ Springfield.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Jake Piralta', 'beatsy@boi.gov.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Dwight Shrute', 'beetsBearsBattlestarGalactica@Mifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES ('Speed Lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4 ,8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
('Speed Lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4 ,8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
('Speed Lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4 ,8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
('Speed Lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4 ,8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
('Speed Lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4 ,8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1,1,28,4, 'message'),
(2,2,29,5, 'message'),
(3,3,33,4, 'message'),
(4,4,36,5, 'message'),
(2,2,29,5, 'message'),
(3,3,33,4, 'message'),
(4,4,36,5, 'message'),
(2,2,29,5, 'message'),
(3,3,33,4, 'message'),
(4,4,36,5, 'message');