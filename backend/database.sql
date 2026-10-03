USE master;
GO

-- Verifica daca db exista si o sterge daca da
-- Mai intai seteaza baza de date pe single user pentru a o putea sterge
IF DB_ID('pilates') IS NOT NULL
BEGIN
    ALTER DATABASE pilates SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE pilates; 
END
GO

CREATE DATABASE pilates;
GO

Use pilates;
GO

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(255) NOT NULL,
    prenume VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role ENUM('admin', 'instructor', 'client') NOT NULL DEFAULT 'client',
    is_verified TINYINT(1) DEFAULT 0,
    verification_code_expires_at DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
GO

CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    instructor_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
);
GO

CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_credits INT NOT NULL, -- Câte ședințe a cumpărat
    remaining_credits INT NOT NULL, -- Câte ședințe mai are disponibile
    expires_at DATE NOT NULL, -- Data de expirare a abonamentului
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
GO

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    status ENUM('confirmed', 'cancelled', 'attended') DEFAULT 'confirmed',
    reminder_sent TINYINT(1) DEFAULT 0, -- 0 = ne trimis, 1 = trimis cu 24h înainte
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);
GO

CREATE TABLE waitlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    position INT NOT NULL, -- Ordinea în rând (1, 2, 3...)
    status ENUM('waiting', 'promoted', 'cancelled') DEFAULT 'waiting',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);
GO
