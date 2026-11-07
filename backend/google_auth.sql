USE pilates;
GO

-- 1. Permitem ca parola să fie nulă pentru utilizatorii care se autentifică prin Google
ALTER TABLE users ALTER COLUMN password_hash VARCHAR(255) NULL;
GO

-- 2. Adăugăm o coloană pentru a identifica furnizorul de autentificare (ex: 'local' sau 'google')
ALTER TABLE users ADD auth_provider VARCHAR(50) DEFAULT 'local' NOT NULL;
GO

-- 3. Adăugăm o coloană pentru a stoca ID-ul unic returnat de Google
ALTER TABLE users ADD google_id VARCHAR(255) NULL;
GO