-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 27 mars 2023 à 12:22
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `alerte`
--

INSERT INTO `alerte` (`id`, `Description`, `Niveau`, `DateHeure`, `idUtilisateur`) VALUES
(1, 'Enfant perdu dans la zone tropicale, l\'accompagner à l\'entrée.', 2, '2023-03-24 16:58:31', 2),
(2, 'Ara bleu Lama échappé de son enclos dans la zone 3', 3, '2023-03-24 17:00:05', 4),
(3, 'Ours à lunette échappé de son enclos fouille le stand de fast food e la zone 5', 4, '2023-03-24 17:01:23', 5),
(4, 'Accumulation de déchets dans les allées de la zone aquatique', 1, '2023-03-24 17:02:19', 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `animal`
--

INSERT INTO `animal` (`id`, `idEspece`, `idEnclos`, `Nom`, `Sexe`, `Age`, `Poids`, `Taille`, `Etat`, `lienImg`) VALUES
(1, 3, 5, 'Baloo', 0, 22, 167000, 170, 5, 'Baloo.jpg'),
(2, 3, 5, 'Avaa', 1, 3, 127000, 150, 3, 'Avaa.jpg'),
(3, 2, 2, 'Rico', 0, 7, 1360, 75, 4, 'Rico.jpg'),
(4, 2, 2, 'Ricky', 0, 7, 1450, 88, 5, 'Ricky.jpg'),
(5, 2, 2, 'Roucool', 1, 32, 1360, 88, 4, 'Roucool.jpg'),
(6, 1, 6, 'Bailo', 0, 13, 270000, 268, 4, 'Bailo.jpg'),
(7, 2, 2, 'CoconutDoggo', 1, 10, 50000, 57, 5, 'CoconutDoggo.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

DROP TABLE IF EXISTS `enclos`;
CREATE TABLE IF NOT EXISTS `enclos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `enclos`
--

INSERT INTO `enclos` (`id`) VALUES
(1),
(2),
(3),
(4),
(5),
(6);

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `espece`
--

INSERT INTO `espece` (`id`, `Libelle`, `tailleMin`, `tailleMax`, `poidsMin`, `poidsMax`, `idRegime`, `dureeGestationJours`, `duréeVie`, `lienImg`, `Description`) VALUES
(1, 'Tigre blanc', 200, 280, 250000, 300000, 1, 90, 15, 'tigreBlanc.jpg', 'Félin solitaire, le Tigre du Bengale s’active aux mêmes heures que les proies dont il se nourrit. Il préfère d’ailleurs la chasse en milieu dense, ce qui lui permet de mieux se camoufler. Très bon nageur, le Tigre du Bengale passe de longs moments dans l’eau. Certains Tigres du Bengale naissent avec une mutation génétique dont la conséquence est la couleur blanche de leur pelage. A cause de cette couleur très voyante, ces tigres ne survivent pas dans la nature. Au même titre que les autres sous-espèces de tigres, le Tigre du Bengale est proche de l‘extinction. Sa chasse à des fins commerciales et la disparition de son habitat le condamnent à disparaître des zones sauvages non protégées.'),
(2, 'Ara Ararauna', 80, 90, 900, 1500, 5, 26, 100, 'araBleu.jpg', 'Comme les autres espèces d’aras, l’Ara bleu et jaune est un oiseau bruyant et assez facile à repérer grâce à ses plumes vivement colorées. Cet oiseau vit principalement dans les Varzéas, des forêts périodiquement envahies par les eaux. Sur le continent Sud-Américain, son importante aire de répartition le rend moins vulnérable que d’autres espèces d’Aras. Toutefois, l’Ara bleu et jaune à déjà disparu de certaines régions comme le sud-est du Brésil ainsi que l’île de Tobago. Malgré ses mœurs grégaires, l’Ara bleu et jaune est fidèle en amour. D’ailleurs, dans les groupes, les couples se distinguent bien car les deux amoureux volent aile contre aile.'),
(3, 'Ours à lunettes', 120, 200, 100000, 175000, 1, 240, 30, 'oursLunette.jpg', 'Comme tous les ours, l’ours à lunettes est solitaire. Grimpeur hors pair, il n’hésite pas à monter à la cime des arbres pour y chercher sa nourriture. Il est aussi très agile dans la fabrication de nids en branchages pour se reposer. L’Ours à lunettes doit son nom aux marques claires qui parfois encerclent ses yeux. Elles varient d’un individu à l’autre et descendent parfois jusqu’à la poitrine. Malgré les mesures mises en place, la population de l’Ours à lunettes continue de décroître à cause de la chasse et de la destruction de son environnement.'),
(4, 'Capybara', 50, 65, 35000, 70000, 2, 150, 15, 'capybara.jpg', 'Cousin de la souris, du rat et de la marmotte, le capybara est le plus grand rongeur du monde. Le capybara vit en petit groupe à proximité de zones humides. Actif au crépuscule, il passe une grande partie de sa journée dans l’eau pour se protéger de la chaleur et de ses prédateurs naturels que sont les anacondas, les caïmans et les jaguars. Élevé en grande crèche et nourris par toutes les femelles, les petits deviennent indépendants à l’âge d’un an. La situation du capybara en Amérique du Sud ne semble, à l’heure actuelle, pas préoccupante. Sa surchasse pose toutefois quelques problèmes et pourrait, à terme, menacer cet animal dans certaines zones très localisées');

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

DROP TABLE IF EXISTS `fonction`;
CREATE TABLE IF NOT EXISTS `fonction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `fonction`
--

INSERT INTO `fonction` (`id`, `Libelle`) VALUES
(1, 'Vétérinaire'),
(2, 'Soigneur Animalier'),
(3, 'Chef Animalier'),
(4, 'Fauconnier'),
(5, 'Animateur et résponsable pédagogique'),
(6, 'Jardinier'),
(7, 'Plombier'),
(8, 'Vigil'),
(9, 'Responsable de la sécurité'),
(10, 'Administrateur système');

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
  `DateHeureValidation` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1` (`idEnclos`),
  KEY `fk2` (`idAnimal`),
  KEY `fk3` (`idUtilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mission`
--

INSERT INTO `mission` (`id`, `idEnclos`, `idAnimal`, `idUtilisateur`, `Description`, `DateHeureAttribution`, `DateHeureValidation`) VALUES
(1, 5, 2, 3, 'Nourrir Avaa seule et vérifir son état de santé.', '2023-03-26 15:31:28', NULL),
(2, 2, NULL, 1, 'Vérificaton hebdomadaire des canalisation reliées à l\'enclos.', '2023-03-26 15:34:16', NULL),
(3, 2, NULL, 5, 'Tour de garde de l\'enclos Capybara et rappel des règles de contact', '2023-03-26 15:38:53', NULL),
(4, 2, NULL, 3, 'Rentrer les Ara Bleus pour leur temps de repos, sortir les Ara Chloptères.', '2023-03-26 15:42:58', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `regime`
--

DROP TABLE IF EXISTS `regime`;
CREATE TABLE IF NOT EXISTS `regime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `regime`
--

INSERT INTO `regime` (`id`, `Libelle`) VALUES
(1, 'Carnivore'),
(2, 'Herbivore'),
(3, 'Insectivore'),
(4, 'Omnivore'),
(5, 'Fructivore'),
(6, 'Piscivore'),
(7, 'Charognard'),
(8, 'Hématophage'),
(9, 'Lépidophage'),
(10, 'Nectarivore'),
(11, 'Granivore'),
(12, 'Oophage'),
(13, 'Suspensivore');

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `identifiant`, `mdp`, `Nom`, `Prenom`, `NumTel`, `idFonction`, `Admin`) VALUES
(1, 'Guigasp', 'Ggaspard43', 'Jean', 'Jaquelin', '0606060606', 7, 0),
(2, 'TheAdministrator', 'Admin123', 'Riz', 'Gutgack', '0618170117', 10, 1),
(3, 'IhaveaQuestion', 'AreYouMyDad', 'Gorgug', 'Thiselspring', '0661819303', 2, 0),
(4, 'Ihaveamentalillness', 'anditsokay', 'Adyne', 'Abernant', '0619548245', 9, 0),
(5, 'FabianArameusSEACASTER', 'SONOFBILLSEACASTER', 'Fabian', 'Seacaster', '0699999999', 8, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
