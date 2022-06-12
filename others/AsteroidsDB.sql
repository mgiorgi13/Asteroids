-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Lug 24, 2021 alle 00:12
-- Versione del server: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `asteroids`
--
CREATE DATABASE IF NOT EXISTS `asteroids` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `asteroids`;

-- --------------------------------------------------------

--
-- Struttura della tabella `classifica`
--

DROP TABLE IF EXISTS `classifica`;
CREATE TABLE IF NOT EXISTS `classifica` (
  `name` varchar(50) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `classifica`
--

INSERT INTO `classifica` (`name`, `score`) VALUES
('Alex96', 2000),
('Alice98', 2000),
('Federico99', 3700),
('Giulia95', 600),
('Luca96', 1500),
('Marco00', 1000),
('Matteo96', 2100),
('Michele96', 1400),
('Micol98', 1200),
('Samuele96', 1600),
('Silvia97', 1800);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

DROP TABLE IF EXISTS `utenti`;
CREATE TABLE IF NOT EXISTS `utenti` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`username`, `password`) VALUES
('Alex96', '780fcf8c2631cc4a2ca173cd32147333'),
('Alice98', '927b9be2a9588732f70184eaa3524838'),
('Federico99', 'edac7752aa4975dc5dcb0797a0431e75'),
('Giulia95', 'fc6981b8d42a8174f567c5fcfc85f37c'),
('Luca96', 'd3e474a8faa2d7be75974dc2a96d5595'),
('Marco00', 'd5a04eae3ea63822a6f4fe87f49428aa'),
('Matteo96', '5356cbf953feabf34e74753b55cf85bc'),
('Michele96', '932d2ff9117acd47dd6721634f32d18f'),
('Micol98', '6b50b344988081c7a0e195bfc39e3a2e'),
('Samuele96', '746dbd806c2742b630f4798486970b4a'),
('Silvia97', '12ff811c448bd2dcc7ad75484bc99246');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classifica`
--
ALTER TABLE `classifica`
 ADD PRIMARY KEY (`name`);

--
-- Indexes for table `utenti`
--
ALTER TABLE `utenti`
 ADD PRIMARY KEY (`username`);
