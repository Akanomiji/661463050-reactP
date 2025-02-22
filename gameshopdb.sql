-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2025 at 02:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gameshopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(11) NOT NULL,
  `game_name` varchar(100) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `platform` enum('PC','Mobile') NOT NULL,
  `game_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `genre`, `platform`, `game_image`) VALUES
(1, 'Game 1', 'Action', 'PC', 'image1.jpg'),
(2, 'Game 2', 'Adventure', 'Mobile', 'image2.jpg'),
(3, 'Game 3', 'RPG', 'PC', 'image3.jpg'),
(4, 'Game 4', 'Simulation', 'Mobile', 'image4.jpg'),
(5, 'Game 5', 'Puzzle', 'PC', 'image5.jpg'),
(6, 'Game 6', 'Strategy', 'Mobile', 'image6.jpg'),
(7, 'Game 7', 'Action', 'PC', 'image7.jpg'),
(8, 'Game 8', 'Adventure', 'Mobile', 'image8.jpg'),
(9, 'Game 9', 'RPG', 'PC', 'image9.jpg'),
(10, 'Game 10', 'Simulation', 'Mobile', 'image10.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `game_accounts`
--

CREATE TABLE `game_accounts` (
  `game_accounts_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `account_username` varchar(100) NOT NULL,
  `account_password` varchar(50) NOT NULL,
  `descriptions` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_accounts`
--

INSERT INTO `game_accounts` (`game_accounts_id`, `game_id`, `account_username`, `account_password`, `descriptions`, `price`) VALUES
(1, 1, 'user1', 'password1', 'Account for Game 1', 10.00),
(2, 2, 'user2', 'password2', 'Account for Game 2', 15.00),
(3, 3, 'user3', 'password3', 'Account for Game 3', 20.00),
(4, 4, 'user4', 'password4', 'Account for Game 4', 25.00),
(5, 5, 'user5', 'password5', 'Account for Game 5', 30.00),
(6, 6, 'user6', 'password6', 'Account for Game 6', 35.00),
(7, 7, 'user7', 'password7', 'Account for Game 7', 40.00),
(8, 8, 'user8', 'password8', 'Account for Game 8', 45.00),
(9, 9, 'user9', 'password9', 'Account for Game 9', 50.00),
(10, 10, 'user10', 'password10', 'Account for Game 10', 55.00);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_accounts_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_status` enum('กำลังดำเนินการ','สำเร็จ','ไม่สำเร็จ') NOT NULL DEFAULT 'กำลังดำเนินการ',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`order_id`, `user_id`, `game_accounts_id`, `total_price`, `order_status`, `created_at`) VALUES
(1, 1, 1, 10.00, 'กำลังดำเนินการ', '2025-02-21 20:05:40.000'),
(2, 2, 2, 15.00, 'สำเร็จ', '2025-02-21 20:05:40.000'),
(3, 3, 3, 20.00, 'ไม่สำเร็จ', '2025-02-21 20:05:40.000'),
(4, 4, 4, 25.00, 'กำลังดำเนินการ', '2025-02-21 20:05:40.000'),
(5, 5, 5, 30.00, 'สำเร็จ', '2025-02-21 20:05:40.000'),
(6, 6, 6, 35.00, 'ไม่สำเร็จ', '2025-02-21 20:05:40.000'),
(7, 7, 7, 40.00, 'กำลังดำเนินการ', '2025-02-21 20:05:40.000'),
(8, 8, 8, 45.00, 'สำเร็จ', '2025-02-21 20:05:40.000'),
(9, 9, 9, 50.00, 'ไม่สำเร็จ', '2025-02-21 20:05:40.000'),
(10, 10, 10, 55.00, 'กำลังดำเนินการ', '2025-02-21 20:05:40.000');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method` enum('Master Card','paypal','promptpay') NOT NULL,
  `payment_status` enum('กำลังดำเนินการ','สำเร็จ','ไม่สำเร็จ') NOT NULL DEFAULT 'กำลังดำเนินการ',
  `transaction_id` varchar(191) DEFAULT NULL,
  `paid_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `order_id`, `user_id`, `payment_method`, `payment_status`, `transaction_id`, `paid_at`) VALUES
(1, 1, 1, 'Master Card', 'สำเร็จ', 'txn1', '2025-02-21 20:05:53.000'),
(2, 2, 2, 'paypal', 'สำเร็จ', 'txn2', '2025-02-21 20:05:53.000'),
(3, 3, 3, 'promptpay', 'ไม่สำเร็จ', 'txn3', '2025-02-21 20:05:53.000'),
(4, 4, 4, 'Master Card', 'กำลังดำเนินการ', 'txn4', '2025-02-21 20:05:53.000'),
(5, 5, 5, 'paypal', 'สำเร็จ', 'txn5', '2025-02-21 20:05:53.000'),
(6, 6, 6, 'promptpay', 'ไม่สำเร็จ', 'txn6', '2025-02-21 20:05:53.000'),
(7, 7, 7, 'Master Card', 'กำลังดำเนินการ', 'txn7', '2025-02-21 20:05:53.000'),
(8, 8, 8, 'paypal', 'สำเร็จ', 'txn8', '2025-02-21 20:05:53.000'),
(9, 9, 9, 'promptpay', 'ไม่สำเร็จ', 'txn9', '2025-02-21 20:05:53.000'),
(10, 10, 10, 'Master Card', 'กำลังดำเนินการ', 'txn10', '2025-02-21 20:05:53.000');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_accounts_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `user_id`, `game_accounts_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 1, 5, 'Great game!', '2025-02-21 20:06:06.000'),
(2, 2, 2, 4, 'Really enjoyed it.', '2025-02-21 20:06:06.000'),
(3, 3, 3, 3, 'It was okay.', '2025-02-21 20:06:06.000'),
(4, 4, 4, 5, 'Loved it!', '2025-02-21 20:06:06.000'),
(5, 5, 5, 2, 'Not my favorite.', '2025-02-21 20:06:06.000'),
(6, 6, 6, 4, 'Pretty good.', '2025-02-21 20:06:06.000'),
(7, 7, 7, 5, 'Amazing!', '2025-02-21 20:06:06.000'),
(8, 8, 8, 4, 'Had fun playing.', '2025-02-21 20:06:06.000'),
(9, 9, 9, 3, 'It was fine.', '2025-02-21 20:06:06.000'),
(10, 10, 10, 5, 'Best game ever!', '2025-02-21 20:06:06.000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `role`) VALUES
(1, 'user1', 'user1@example.com', 'password1', 'user'),
(2, 'user2', 'user2@example.com', 'password2', 'user'),
(3, 'user3', 'user3@example.com', 'password3', 'user'),
(4, 'user4', 'user4@example.com', 'password4', 'user'),
(5, 'user5', 'user5@example.com', 'password5', 'user'),
(6, 'user6', 'user6@example.com', 'password6', 'user'),
(7, 'user7', 'user7@example.com', 'password7', 'user'),
(8, 'user8', 'user8@example.com', 'password8', 'user'),
(9, 'user9', 'user9@example.com', 'password9', 'user'),
(10, 'user10', 'user10@example.com', 'password10', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `game_accounts`
--
ALTER TABLE `game_accounts`
  ADD PRIMARY KEY (`game_accounts_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_accounts_id` (`game_accounts_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `userid` (`user_id`),
  ADD KEY `gameaccountsid` (`game_accounts_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `game_accounts`
--
ALTER TABLE `game_accounts`
  MODIFY `game_accounts_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_accounts`
--
ALTER TABLE `game_accounts`
  ADD CONSTRAINT `game_id` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `game_accounts_id` FOREIGN KEY (`game_accounts_id`) REFERENCES `game_accounts` (`game_accounts_id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `gameaccountsid` FOREIGN KEY (`game_accounts_id`) REFERENCES `game_accounts` (`game_accounts_id`),
  ADD CONSTRAINT `userid` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
