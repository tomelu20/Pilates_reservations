USE master;
GO

-- Verifică dacă baza de date există și o șterge dacă da
IF DB_ID('pilates') IS NOT NULL
BEGIN
    ALTER DATABASE pilates SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE pilates; 
END
GO

CREATE DATABASE pilates;
GO

USE pilates;
GO

-- 1. Tabelul de Utilizatori
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nume VARCHAR(255) NOT NULL,
    prenume VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'instructor', 'client')) NOT NULL DEFAULT 'client',
    is_verified TINYINT DEFAULT 0,
    verification_code VARCHAR(100) NULL,
    verification_code_expires_at DATETIME NULL,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- 2. Tabelul pentru Ședințe / Sloturi Orare
CREATE TABLE classes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    instructor_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
);
GO

-- 3. Tabelul pentru Abonamente / Pachete de ședințe (Credite)
CREATE TABLE subscriptions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    total_credits INT NOT NULL,
    remaining_credits INT NOT NULL,
    expires_at DATE NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
GO

-- 4. Tabelul pentru Rezervări (Bookings)
CREATE TABLE bookings (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('confirmed', 'cancelled', 'attended')) DEFAULT 'confirmed',
    reminder_sent TINYINT DEFAULT 0,
    booked_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE NO ACTION
);
GO

-- 5. Tabelul pentru Lista de Așteptare (Waitlist)
CREATE TABLE waitlist (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    position INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('waiting', 'promoted', 'cancelled')) DEFAULT 'waiting',
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE NO ACTION
);
GO