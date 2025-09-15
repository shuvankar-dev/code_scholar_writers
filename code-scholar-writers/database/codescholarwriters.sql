-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2025 at 05:06 PM
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
-- Database: `codescholarwriters`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_levels`
--

CREATE TABLE `academic_levels` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(30) NOT NULL,
  `multiplier` decimal(4,2) NOT NULL DEFAULT 1.00,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academic_levels`
--

INSERT INTO `academic_levels` (`id`, `name`, `slug`, `multiplier`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'High School', 'high-school', 1.00, 1, 1, '2025-08-29 08:01:44'),
(2, 'Undergraduate', 'undergraduate', 1.25, 2, 1, '2025-08-29 08:01:44'),
(3, 'Graduate/Masters', 'graduate', 1.50, 3, 1, '2025-08-29 08:01:44'),
(4, 'PhD/Doctorate', 'phd', 1.80, 4, 1, '2025-08-29 08:01:44');

-- --------------------------------------------------------

--
-- Table structure for table `addons`
--

CREATE TABLE `addons` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `price_type` enum('fixed','percentage','per_page','per_word') NOT NULL DEFAULT 'fixed',
  `price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addons`
--

INSERT INTO `addons` (`id`, `name`, `slug`, `description`, `price_type`, `price`, `is_active`, `sort_order`, `created_at`) VALUES
(1, 'Plagiarism Report', 'plagiarism-report', 'Detailed plagiarism check report', 'fixed', 5.00, 1, 1, '2025-08-29 08:01:44'),
(2, 'Grammarly Check', 'grammarly-check', 'Professional grammar and style check', 'per_word', 0.01, 1, 2, '2025-08-29 08:01:44'),
(3, 'Turnitin Report', 'turnitin-report', 'Turnitin originality report', 'fixed', 10.00, 1, 3, '2025-08-29 08:01:44'),
(4, 'Additional References', 'additional-references', 'Extra academic references (per 10 refs)', 'fixed', 8.00, 1, 4, '2025-08-29 08:01:44'),
(5, 'Charts & Graphs', 'charts-graphs', 'Professional charts and visualizations', 'fixed', 15.00, 1, 5, '2025-08-29 08:01:44'),
(6, 'Expedited Delivery', 'expedited-delivery', 'Rush delivery service', 'percentage', 25.00, 1, 6, '2025-08-29 08:01:44'),
(7, 'Multiple Drafts', 'multiple-drafts', 'Additional revision drafts', 'fixed', 12.00, 1, 7, '2025-08-29 08:01:44'),
(8, 'PowerPoint Slides', 'powerpoint-slides', 'Professional presentation slides (per 10 slides)', 'fixed', 20.00, 1, 8, '2025-08-29 08:01:44');

-- --------------------------------------------------------

--
-- Table structure for table `admin_sessions`
--

CREATE TABLE `admin_sessions` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_sessions`
--

INSERT INTO `admin_sessions` (`id`, `admin_id`, `session_token`, `expires_at`, `created_at`, `ip_address`, `user_agent`) VALUES
(1, 2, '6595fd7e198bdd3c4dc7923a9b7205835fdd7f1eca316bb74c35e552e5decec6', '2025-09-14 03:47:44', '2025-09-13 07:17:44', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(2, 2, '61d2b08f36f58a30aad364ff8229f892f0403ed18523f1baa4e5ecdec879b10b', '2025-09-14 04:22:13', '2025-09-13 07:52:13', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(3, 3, 'a5aebdd0866598cd908ae13bacb629b4367f9361379ab89579accb60f57aa552', '2025-09-14 04:30:14', '2025-09-13 08:00:14', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(4, 3, '97a7bcf8a40bedf77df885b0b7d328bde885b081e1490f10f7f2092781ad86c0', '2025-09-14 04:40:47', '2025-09-13 08:10:47', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(5, 3, '4e460433aa05de6243b6088c4e3cebc1beb545812d18bc289f9fffac7e63873c', '2025-09-14 04:51:55', '2025-09-13 08:21:55', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(6, 3, '4e0a48a86db56c1aa182ffe548fbeda53821396baff811ee7889f54bfdfbaaed', '2025-09-14 05:18:04', '2025-09-13 08:48:04', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(7, 3, 'e6467b961062f94ba38288a12173545c92f0755cba45d9910cfbedc3faba8526', '2025-09-14 05:28:58', '2025-09-13 08:58:58', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(8, 3, '332aba3587023e83405a27a0ead94cd44b67a7870b9e60410fb7ff8c121bb79f', '2025-09-14 05:29:04', '2025-09-13 08:59:04', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(9, 3, 'bafac6f855141ee03a8dc0144de92b615b5ba30ef78c9a4b94e5b61e48e7298d', '2025-09-14 05:51:01', '2025-09-13 09:21:01', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(10, 3, 'bd5ab4986357974ef04f3c3c4776b039e78bb09282ee79817b482ba964644dca', '2025-09-14 05:58:42', '2025-09-13 09:28:42', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(11, 3, '5353db0d8eb867f913cdb51ad54a22891e0e2f0f670d948a5383706665ecacca', '2025-09-14 06:00:41', '2025-09-13 09:30:41', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(12, 3, '821edb873f14489940305c2a237ca95845d550fa0b31dea645feea26b3c3e036', '2025-09-14 06:01:20', '2025-09-13 09:31:20', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(13, 3, '0787f5df1e36ac01554f58c0b7edc6ce59f25d315d5f23ffee7c273f22443a19', '2025-09-14 06:02:05', '2025-09-13 09:32:05', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(14, 3, '34c56f6c6dcccbef34a518e2193e40a9376e88ffc279defc01a6b13650cb8c70', '2025-09-14 06:08:22', '2025-09-13 09:38:22', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(15, 3, 'fea20bc444eec180262e7e1899beb3ab9056bc121a85832193c9949277f25004', '2025-09-14 10:11:10', '2025-09-13 13:41:10', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'),
(16, 3, '0516d5edcc93573aafa9d58d04f66296051471fe5c4ffc70801b2bbde7daa4f4', '2025-09-14 11:25:42', '2025-09-13 14:55:42', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0');

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('super_admin','admin','moderator') DEFAULT 'admin',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `email`, `password`, `full_name`, `role`, `is_active`, `created_at`, `updated_at`, `last_login`) VALUES
(1, 'admin', 'admin@codescholarwriters.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'super_admin', 1, '2025-09-13 07:11:20', '2025-09-13 07:11:20', NULL),
(2, 'Shuvankar-Dev', 'shuvankar.dev01@gmail.com', '$2y$10$1E/lfc9R5YBBAVd/SwWiH.jEQ/N6Hn8ChvQJdCr5f3tZepaRnQcEG', 'exampl', 'admin', 1, '2025-09-13 07:17:15', '2025-09-13 07:52:13', '2025-09-13 07:52:13'),
(3, 'Shuvankar-Dev2', 'shuvankar.dev02@gmail.com', '$2y$10$.kYnQ.RFdSfcGd/Kn0OxiOSaQOg3cagJvidsYQvZEGsbPb./fnI2y', 'Shuvankar Das', 'admin', 1, '2025-09-13 07:59:51', '2025-09-13 14:55:42', '2025-09-13 14:55:42');

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` int(11) NOT NULL,
  `code` varchar(3) NOT NULL,
  `name` varchar(50) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `exchange_rate` decimal(10,4) NOT NULL DEFAULT 1.0000,
  `is_default` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `code`, `name`, `symbol`, `exchange_rate`, `is_default`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'USD', 'US Dollar', '$', 1.0000, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(2, 'INR', 'Indian Rupee', '₹', 83.2500, 1, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(3, 'EUR', 'Euro', '€', 0.9200, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(4, 'GBP', 'British Pound', '£', 0.7900, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44');

-- --------------------------------------------------------

--
-- Table structure for table `master_prices`
--

CREATE TABLE `master_prices` (
  `id` int(11) NOT NULL,
  `price_type` varchar(50) NOT NULL,
  `price_key` varchar(100) NOT NULL,
  `price_value` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'INR',
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_prices`
--

INSERT INTO `master_prices` (`id`, `price_type`, `price_key`, `price_value`, `currency`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'base', 'price_per_word', 2.00, 'INR', 'Base price per word for writing services', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(2, 'base', 'data_analysis_base', 2000.00, 'INR', 'Base price for data analysis projects', 1, '2025-09-13 13:54:19', '2025-09-13 15:02:49'),
(3, 'base', 'programming_base', 10000.00, 'INR', 'Base price for programming projects', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(4, 'academic_level', 'high_school', 1.00, 'INR', 'High School level multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(5, 'academic_level', 'undergraduate', 1.25, 'INR', 'Undergraduate level multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(6, 'academic_level', 'graduate', 1.50, 'INR', 'Graduate/Masters level multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(7, 'academic_level', 'phd', 1.80, 'INR', 'PhD/Doctorate level multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(8, 'urgency', '30_days', 0.80, 'INR', '30+ days urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(9, 'urgency', '14_days', 0.90, 'INR', '14-29 days urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(10, 'urgency', '7_days', 1.00, 'INR', '7-13 days urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(11, 'urgency', '5_days', 1.25, 'INR', '5-6 days urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(12, 'urgency', '3_days', 1.50, 'INR', '3-4 days urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(13, 'urgency', '2_days', 1.75, 'INR', '2 days urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(14, 'urgency', '1_day', 2.00, 'INR', '24 hours urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(15, 'urgency', '12_hours', 2.50, 'INR', '12 hours urgency multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(16, 'addon', 'plagiarism_report', 500.00, 'INR', 'Plagiarism report add-on price', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(17, 'addon', 'grammarly_check', 10.00, 'INR', 'Grammarly check per word', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(18, 'addon', 'turnitin_report', 1000.00, 'INR', 'Turnitin report add-on price', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(19, 'addon', 'additional_references', 800.00, 'INR', 'Additional references add-on price', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(20, 'addon', 'charts_graphs', 1500.00, 'INR', 'Charts and graphs add-on price', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(21, 'addon', 'expedited_delivery', 25.00, 'INR', 'Expedited delivery percentage', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(22, 'addon', 'multiple_drafts', 1200.00, 'INR', 'Multiple drafts add-on price', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(23, 'addon', 'powerpoint_slides', 2000.00, 'INR', 'PowerPoint slides add-on price', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(24, 'tool', 'excel_analysis', 1.00, 'INR', 'Excel Analysis tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(25, 'tool', 'power_bi', 1.25, 'INR', 'Power BI tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(26, 'tool', 'tableau', 1.30, 'INR', 'Tableau tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(27, 'tool', 'python_pandas', 1.40, 'INR', 'Python (Pandas/NumPy) tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(28, 'tool', 'r_statistical', 1.35, 'INR', 'R Statistical Analysis tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(29, 'tool', 'spss', 1.20, 'INR', 'SPSS tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(30, 'tool', 'sas', 1.45, 'INR', 'SAS tool multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19'),
(31, 'tool', 'other_tools', 1.15, 'INR', 'Other Tools multiplier', 1, '2025-09-13 13:54:19', '2025-09-13 13:54:19');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `service_type` varchar(100) NOT NULL,
  `assignment_type` varchar(100) DEFAULT NULL,
  `academic_level` varchar(50) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `words` int(11) DEFAULT NULL,
  `deadline_date` date DEFAULT NULL,
  `deadline_time` time DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `status` enum('pending','confirmed','in_progress','completed','cancelled') DEFAULT 'pending',
  `payment_status` enum('unpaid','paid','refunded') DEFAULT 'unpaid',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `customer_name`, `customer_email`, `customer_phone`, `service_type`, `assignment_type`, `academic_level`, `pages`, `words`, `deadline_date`, `deadline_time`, `subject`, `instructions`, `total_price`, `currency`, `status`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 'ORD-20250913-7ABBAE', 'Shuvankar Das', 'shuvankardas.2910@gmail.com', '7630955747', 'Assignment Help', 'Assignment Help', 'High School', 4, 1000, '2025-09-14', '14:17:51', 'PhD', 'I want 90%+ Marks', 4005.00, 'INR', 'confirmed', 'unpaid', '2025-09-13 08:47:51', '2025-09-13 09:12:51'),
(2, 'ORD-20250913-4372C0', 'Shuvankar Das', 'shuvankardas.2910@gmail.com', '07630955747', 'Assignment Help', 'Assignment Help', 'High School', 4, 1000, '2025-09-13', '02:19:24', 'assdf', 'asdf', 5005.00, 'INR', 'in_progress', 'unpaid', '2025-09-13 08:49:24', '2025-09-13 09:12:46'),
(3, 'ORD-20250913-038B56', 'Shuvankar Das', 'shuvankardas.2910@gmail.com', '123456789', 'Essay Writing', 'Essay Writing', 'High School', 4, 1000, '2025-09-13', '02:28:08', 'qwer', 'asdf asef', 5005.00, 'INR', 'completed', 'refunded', '2025-09-13 08:58:08', '2025-09-13 09:13:08'),
(4, 'ORD-20250913-D6CFE7', 'exampl', 'example.@gmail.com', '123456789', 'Report Writing', 'Report Writing', 'Undergraduate', 4, 1000, '2025-09-14', '14:41:25', 'asdf', 'qwer asdf', 5005.00, 'INR', 'pending', 'paid', '2025-09-13 09:11:25', '2025-09-13 09:13:10'),
(5, 'ORD-20250913-7BF632', 'Shuvankar Dev', 'shuvankar.dev01@gmail.com', '1234567890', 'Assignment Help', 'Assignment Help', 'High School', 21, 5200, '2025-09-13', '02:42:07', 'LAW', 'asdf asdf', 26052.00, 'INR', 'cancelled', 'unpaid', '2025-09-13 09:12:07', '2025-09-13 09:13:00'),
(6, 'ORD-20250913-E98475', 'Shuvankar Dev', 'shuvankar.dev01@gmail.com', '1234567890', 'Assignment Help', 'Assignment Help', 'Undergraduate', 36, 9000, '2025-09-15', '14:51:50', 'LAW', 'asdf', 39465.00, 'INR', 'pending', 'unpaid', '2025-09-13 09:21:50', '2025-09-13 09:21:50'),
(7, 'ORD-20250913-C618CA', 'Shuvankar Dev', 'shuvankar.dev01@gmail.com', '123456789', 'Assignment Help', 'Assignment Help', 'High School', 20, 5000, '2025-09-14', '14:55:48', 'qwer', 'qwer wqwwe ', 20050.00, 'INR', 'pending', 'unpaid', '2025-09-13 09:25:48', '2025-09-13 09:25:48'),
(8, 'ORD-20250913-8A1483', 'Shuvankar Das', 'shuvankardas.2910@gmail.com', '07630955747', 'Assignment Help', 'Assignment Help', 'High School', 5, 1200, '2025-09-13', '03:07:44', 'LAW', 'asdf asdf asdf ', 6012.00, 'INR', 'cancelled', 'refunded', '2025-09-13 09:37:44', '2025-09-13 09:39:24');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `base_rate` decimal(10,2) NOT NULL,
  `unit_type` enum('words','pages','tools','description','hours') NOT NULL DEFAULT 'pages',
  `unit_label` varchar(50) NOT NULL,
  `min_units` int(11) DEFAULT 1,
  `max_units` int(11) DEFAULT 10000,
  `words_per_page` int(11) DEFAULT 250,
  `requires_description` tinyint(1) DEFAULT 0,
  `has_tool_options` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `slug`, `description`, `base_rate`, `unit_type`, `unit_label`, `min_units`, `max_units`, `words_per_page`, `requires_description`, `has_tool_options`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Assignment Help', 'assignment-help', 'Academic assignments across all subjects', 0.06, 'words', 'Total Word Count', 250, 25000, 250, 0, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(2, 'Essay Writing', 'essay-writing', 'Custom essays crafted by expert writers', 0.06, 'words', 'Total Word Count', 250, 12500, 250, 0, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(3, 'Report Writing', 'report-writing', 'Professional reports and case studies', 0.07, 'words', 'Total Word Count', 500, 50000, 250, 0, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(4, 'Editing & Proofreading', 'editing-proofreading', 'Professional editing services', 0.03, 'words', 'Total Word Count', 250, 100000, 250, 0, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(5, 'Data Analysis', 'data-analysis', 'Statistical analysis and data interpretation', 25.00, 'tools', 'Select Analysis Tool', 1, 1, 250, 0, 1, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(6, 'Coding Projects', 'coding-projects', 'Programming and software development', 30.00, 'description', 'Project Description', 1, 1, 250, 1, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(7, 'Dissertation Writing', 'dissertation-writing', 'Complete dissertation support', 0.08, 'words', 'Total Word Count', 12500, 250000, 250, 0, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44'),
(8, 'Thesis Writing', 'thesis-writing', 'Professional thesis writing services', 0.07, 'words', 'Total Word Count', 2500, 125000, 250, 0, 0, 1, '2025-08-29 08:01:44', '2025-08-29 08:01:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_levels`
--
ALTER TABLE `academic_levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_academic_levels_active` (`is_active`);

--
-- Indexes for table `addons`
--
ALTER TABLE `addons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_addons_active` (`is_active`);

--
-- Indexes for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `idx_session_token` (`session_token`),
  ADD KEY `idx_expires_at` (`expires_at`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_username` (`username`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_is_active` (`is_active`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `idx_currencies_active` (`is_active`);

--
-- Indexes for table `master_prices`
--
ALTER TABLE `master_prices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_price_key` (`price_key`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_services_active` (`is_active`),
  ADD KEY `idx_services_unit_type` (`unit_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_levels`
--
ALTER TABLE `academic_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `addons`
--
ALTER TABLE `addons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `master_prices`
--
ALTER TABLE `master_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD CONSTRAINT `admin_sessions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE;
COMMIT;
-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer LONGTEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample FAQ data
INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES 
('What services do you offer?', 'We offer a wide range of academic writing services including essay writing, assignment help, report writing, data analysis, coding projects, and editing & proofreading services.', 'Services', 1, 1),

('How do I place an order?', 'You can place an order by using our price calculator to get a quote, then filling out the order form with your details and requirements. You can also contact us directly for custom quotes.', 'Ordering', 1, 1),

('What are your payment methods?', 'We accept various payment methods including credit cards, debit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.', 'Payment', 1, 1),

('How long does it take to complete an order?', 'Delivery time depends on your selected deadline. We offer urgent delivery in as little as 12 hours, or you can choose longer deadlines up to 30 days for better pricing.', 'Delivery', 1, 1),

('Do you provide revisions?', 'Yes, we provide free revisions within 7 days of delivery if the work doesn''t meet your original requirements. We want to ensure you are completely satisfied with our service.', 'Revisions', 1, 1),

('Is my personal information secure?', 'Absolutely! We take privacy seriously. All personal information is encrypted and stored securely. We never share your details with third parties and follow strict confidentiality protocols.', 'Privacy', 1, 1),

('What if I''m not satisfied with the work?', 'We offer a satisfaction guarantee. If you''re not happy with the delivered work, we provide free revisions. In rare cases where we cannot meet your requirements, we offer partial or full refunds.', 'Quality', 1, 1),

('Do you handle urgent orders?', 'Yes, we specialize in urgent orders. Our team can handle assignments with deadlines as short as 12 hours. However, urgent orders may have higher pricing due to the expedited nature.', 'Urgent Orders', 1, 1),

('What academic levels do you cover?', 'We cover all academic levels from high school to PhD/Doctorate level. Our writers are qualified to handle assignments across different educational levels and subjects.', 'Academic Levels', 1, 1),

('How do I communicate with my writer?', 'Once your order is assigned, you can communicate with your writer through our secure messaging system. This allows you to provide additional instructions or ask questions about your project.', 'Communication', 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
