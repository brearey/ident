INSERT INTO appointments (Id, DateAndTime, ClientPhone, ClientEmail, FormName, ClientFullName, PlanStart, PlanEnd, Comment, DoctorId, DoctorName, UtmSource, HttpReferer)
VALUES ('550e8400-e29b-41d4-a716-446655440001', '2025-02-05 14:30:00', '+7 911 123-45-67', 'ivanov@example.com', 'Онлайн-запись с главной страницы', 'Иванов Иван Иванович', '2025-02-10 09:00:00', '2025-02-10 09:30:00', 'Болит верхний зуб справа', 101, 'Смирнов Алексей Петрович', 'google', 'https://stomatologia-example.ru/');

INSERT INTO appointments (Id, DateAndTime, ClientPhone, ClientEmail, FormName, ClientSurname, ClientName, ClientPatronymic, Comment, DoctorId, DoctorName, UtmSource, UtmCampaign)
VALUES ('550e8400-e29b-41d4-a716-446655440002', '2025-02-05 15:45:00', '8(812)555-66-77', 'petrova.s@example.com', 'Запись через виджет', 'Петрова', 'Светлана', 'Михайловна', 'Профилактический осмотр', 105, 'Кузнецова Ольга Сергеевна', 'yandex', 'february_discount');

INSERT INTO appointments (Id, DateAndTime, ClientPhone, ClientName, DoctorName, UtmSource)
VALUES ('550e8400-e29b-41d4-a716-446655440003', '2025-02-05 16:20:00', '7(911)8889900', 'Алексей', 'Смирнов Алексей Петрович', 'direct');

INSERT INTO appointments (Id, DateAndTime, ClientPhone, ClientFullName, PlanStart, PlanEnd, DoctorId, DoctorName, UtmSource, UtmMedium, UtmCampaign, UtmTerm, UtmContent)
VALUES ('550e8400-e29b-41d4-a716-446655440004', '2025-02-05 17:10:00', '(911) 001-01-01', 'Сидоров Дмитрий', '2025-02-12 14:00:00', '2025-02-12 15:00:00', 102, 'Иванова Мария Викторовна', 'vk', 'social', 'implants_q1_2025', 'имплантация', 'post_about_implants');

INSERT INTO appointments (Id, DateAndTime, ClientPhone, ClientFullName, PlanStart, PlanEnd, Comment, DoctorId, DoctorName, HttpReferer)
VALUES ('550e8400-e29b-41d4-a716-446655440005', '2025-02-05 18:30:00', '8812-0000-111', 'Козлова Елена', '2025-02-15 10:00:00', '2025-02-15 12:00:00', 'Лечение двух зубов, требуется анестезия. Аллергия на лидокаин.', 103, 'Попов Сергей Александрович', 'https://stomatologia-example.ru/services/implants/');

select * from appointments;