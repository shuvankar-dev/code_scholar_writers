-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2025 at 04:35 PM
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
-- Table structure for table `price_calculations`
--

CREATE TABLE `price_calculations` (
  `id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `academic_level_id` int(11) DEFAULT NULL,
  `urgency_id` int(11) DEFAULT NULL,
  `units` int(11) DEFAULT NULL,
  `unit_type` varchar(20) DEFAULT NULL,
  `tool_selected` varchar(100) DEFAULT NULL,
  `project_description` text DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `urgency_multiplier` decimal(4,2) DEFAULT NULL,
  `level_multiplier` decimal(4,2) DEFAULT NULL,
  `tool_multiplier` decimal(4,2) DEFAULT 1.00,
  `addons_total` decimal(10,2) DEFAULT NULL,
  `final_price` decimal(10,2) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `service_level_pricing`
--

CREATE TABLE `service_level_pricing` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `academic_level_id` int(11) NOT NULL,
  `base_rate` decimal(10,2) NOT NULL,
  `unit_type` enum('words','pages','hours','fixed') NOT NULL DEFAULT 'pages',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_level_pricing`
--

INSERT INTO `service_level_pricing` (`id`, `service_id`, `academic_level_id`, `base_rate`, `unit_type`, `created_at`) VALUES
(1, 1, 1, 0.05, 'words', '2025-08-29 08:01:44'),
(2, 1, 2, 0.06, 'words', '2025-08-29 08:01:44'),
(3, 1, 3, 0.07, 'words', '2025-08-29 08:01:44'),
(4, 1, 4, 0.09, 'words', '2025-08-29 08:01:44'),
(5, 2, 1, 0.05, 'words', '2025-08-29 08:01:44'),
(6, 2, 2, 0.06, 'words', '2025-08-29 08:01:44'),
(7, 2, 3, 0.07, 'words', '2025-08-29 08:01:44'),
(8, 2, 4, 0.09, 'words', '2025-08-29 08:01:44'),
(9, 5, 1, 20.00, 'fixed', '2025-08-29 08:01:44'),
(10, 5, 2, 25.00, 'fixed', '2025-08-29 08:01:44'),
(11, 5, 3, 30.00, 'fixed', '2025-08-29 08:01:44'),
(12, 5, 4, 40.00, 'fixed', '2025-08-29 08:01:44'),
(13, 6, 1, 25.00, 'fixed', '2025-08-29 08:01:44'),
(14, 6, 2, 30.00, 'fixed', '2025-08-29 08:01:44'),
(15, 6, 3, 40.00, 'fixed', '2025-08-29 08:01:44'),
(16, 6, 4, 55.00, 'fixed', '2025-08-29 08:01:44');

-- --------------------------------------------------------

--
-- Table structure for table `service_tool_options`
--

CREATE TABLE `service_tool_options` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `tool_name` varchar(100) NOT NULL,
  `tool_slug` varchar(50) NOT NULL,
  `price_multiplier` decimal(4,2) DEFAULT 1.00,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_tool_options`
--

INSERT INTO `service_tool_options` (`id`, `service_id`, `tool_name`, `tool_slug`, `price_multiplier`, `is_active`, `sort_order`) VALUES
(1, 5, 'Excel Analysis', 'excel', 1.00, 1, 1),
(2, 5, 'Power BI', 'power-bi', 1.25, 1, 2),
(3, 5, 'Tableau', 'tableau', 1.30, 1, 3),
(4, 5, 'Python (Pandas/NumPy)', 'python', 1.40, 1, 4),
(5, 5, 'R Statistical Analysis', 'r-stats', 1.35, 1, 5),
(6, 5, 'SPSS', 'spss', 1.20, 1, 6),
(7, 5, 'SAS', 'sas', 1.45, 1, 7),
(8, 5, 'Other Tools', 'other', 1.15, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `urgency_options`
--

CREATE TABLE `urgency_options` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `hours` int(11) NOT NULL,
  `days` decimal(3,1) NOT NULL,
  `multiplier` decimal(4,2) NOT NULL DEFAULT 1.00,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `urgency_options`
--

INSERT INTO `urgency_options` (`id`, `name`, `hours`, `days`, `multiplier`, `sort_order`, `is_active`, `created_at`) VALUES
(1, '12 Hours', 12, 0.5, 2.50, 1, 1, '2025-08-29 08:01:44'),
(2, '24 Hours', 24, 1.0, 2.00, 2, 1, '2025-08-29 08:01:44'),
(3, '48 Hours', 48, 2.0, 1.75, 3, 1, '2025-08-29 08:01:44'),
(4, '3 Days', 72, 3.0, 1.50, 4, 1, '2025-08-29 08:01:44'),
(5, '5 Days', 120, 5.0, 1.25, 5, 1, '2025-08-29 08:01:44'),
(6, '7 Days', 168, 7.0, 1.00, 6, 1, '2025-08-29 08:01:44'),
(7, '14 Days', 336, 14.0, 0.90, 7, 1, '2025-08-29 08:01:44'),
(8, '30 Days', 720, 30.0, 0.80, 8, 1, '2025-08-29 08:01:44');

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
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `idx_currencies_active` (`is_active`);

--
-- Indexes for table `price_calculations`
--
ALTER TABLE `price_calculations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `academic_level_id` (`academic_level_id`),
  ADD KEY `urgency_id` (`urgency_id`),
  ADD KEY `idx_price_calc_date` (`created_at`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_services_active` (`is_active`),
  ADD KEY `idx_services_unit_type` (`unit_type`);

--
-- Indexes for table `service_level_pricing`
--
ALTER TABLE `service_level_pricing`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_service_level` (`service_id`,`academic_level_id`),
  ADD KEY `academic_level_id` (`academic_level_id`);

--
-- Indexes for table `service_tool_options`
--
ALTER TABLE `service_tool_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tool_options_service` (`service_id`);

--
-- Indexes for table `urgency_options`
--
ALTER TABLE `urgency_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_urgency_active` (`is_active`);

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
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `price_calculations`
--
ALTER TABLE `price_calculations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `service_level_pricing`
--
ALTER TABLE `service_level_pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `service_tool_options`
--
ALTER TABLE `service_tool_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `urgency_options`
--
ALTER TABLE `urgency_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `price_calculations`
--
ALTER TABLE `price_calculations`
  ADD CONSTRAINT `price_calculations_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `price_calculations_ibfk_2` FOREIGN KEY (`academic_level_id`) REFERENCES `academic_levels` (`id`),
  ADD CONSTRAINT `price_calculations_ibfk_3` FOREIGN KEY (`urgency_id`) REFERENCES `urgency_options` (`id`);

--
-- Constraints for table `service_level_pricing`
--
ALTER TABLE `service_level_pricing`
  ADD CONSTRAINT `service_level_pricing_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_level_pricing_ibfk_2` FOREIGN KEY (`academic_level_id`) REFERENCES `academic_levels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `service_tool_options`
--
ALTER TABLE `service_tool_options`
  ADD CONSTRAINT `service_tool_options_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
