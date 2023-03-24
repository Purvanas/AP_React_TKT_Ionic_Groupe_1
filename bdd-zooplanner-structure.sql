-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 24 mars 2023 à 14:06
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd-zooplanner`
--
CREATE DATABASE IF NOT EXISTS `bdd-zooplanner` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bdd-zooplanner`;

-- --------------------------------------------------------

--
-- Structure de la table `alerte`
--

DROP TABLE IF EXISTS `alerte`;
CREATE TABLE IF NOT EXISTS `alerte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  `Niveau` int(11) NOT NULL,
  `DateHeure` datetime NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1` (`idUtilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `animal`
--

DROP TABLE IF EXISTS `animal`;
CREATE TABLE IF NOT EXISTS `animal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEspece` int(11) NOT NULL,
  `idEnclos` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Sexe` tinyint(1) NOT NULL,
  `Age` int(11) NOT NULL,
  `Poids` double NOT NULL,
  `Taille` double NOT NULL,
  `Etat` int(11) NOT NULL,
  `lienImg` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`idEspece`),
  KEY `fk1` (`idEspece`),
  KEY `fk2` (`idEnclos`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

DROP TABLE IF EXISTS `enclos`;
CREATE TABLE IF NOT EXISTS `enclos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `espece`
--

DROP TABLE IF EXISTS `espece`;
CREATE TABLE IF NOT EXISTS `espece` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Libelle` varchar(255) DEFAULT NULL,
  `tailleMin` double NOT NULL,
  `tailleMax` double NOT NULL,
  `poidsMin` double NOT NULL,
  `poidsMax` double NOT NULL,
  `idRegime` int(11) NOT NULL,
  `dureeGestationJours` int(11) NOT NULL,
  `duréeVie` int(11) NOT NULL,
  `lienImg` varchar(255) NOT NULL,
  `Description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1` (`idRegime`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

DROP TABLE IF EXISTS `fonction`;
CREATE TABLE IF NOT EXISTS `fonction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEnclos` int(11) NOT NULL,
  `idAnimal` int(11) DEFAULT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `Description` varchar(512) NOT NULL,
  `DateHeureAttribution` datetime NOT NULL,
  `DateHeureValidation` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1` (`idEnclos`),
  KEY `fk2` (`idAnimal`),
  KEY `fk3` (`idUtilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `regime`
--

DROP TABLE IF EXISTS `regime`;
CREATE TABLE IF NOT EXISTS `regime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifiant` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `NumTel` varchar(255) NOT NULL,
  `idFonction` int(11) NOT NULL,
  `Admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`,`identifiant`),
  KEY `fk1` (`idFonction`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
