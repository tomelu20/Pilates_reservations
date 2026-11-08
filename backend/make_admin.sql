USE pilates;
GO

-- Schimbă rolul în 'admin' pentru adresa ta de email
UPDATE users
SET role = 'admin'
WHERE email = 'mihai05.toma@gmail.com';
GO

-- Verifică dacă s-a actualizat cu succes
SELECT id, nume, prenume, email, role
FROM users
WHERE email = 'mihai05.toma@gmail.com';
GO