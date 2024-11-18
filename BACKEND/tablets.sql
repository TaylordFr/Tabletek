-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2024 at 07:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webbolt`
--

-- --------------------------------------------------------

--
-- Table structure for table `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `ram` varchar(100) DEFAULT NULL,
  `processor` varchar(100) DEFAULT NULL,
  `storage_space` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tablets`
--

INSERT INTO `tablets` (`id`, `name`, `ram`, `processor`, `storage_space`, `price`) VALUES
(1, 'Samsung Galaxy Tab S8', '8GB', 'Snapdragon 8 Gen 1', '128GB', 700),
(2, 'Apple iPad Pro 11', '8GB', 'Apple M1', '256GB', 799),
(3, 'Amazon Fire HD 10', '3GB', 'Mediatek MT8183', '32GB', 150),
(4, 'Lenovo Tab P11 Pro', '6GB', 'Snapdragon 730G', '128GB', 400),
(5, 'Microsoft Surface Go 3', '4GB', 'Intel Pentium Gold 6500Y', '64GB', 400),
(6, 'Xiaomi Pad 5', '6GB', 'Snapdragon 860', '128GB', 330);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
