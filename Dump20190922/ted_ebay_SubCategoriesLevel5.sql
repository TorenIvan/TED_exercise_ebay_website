CREATE DATABASE  IF NOT EXISTS `ted_ebay` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ted_ebay`;
-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ted_ebay
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SubCategoriesLevel5`
--

DROP TABLE IF EXISTS `SubCategoriesLevel5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubCategoriesLevel5` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_Father` int(10) unsigned NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoriesLevel5`
--

LOCK TABLES `SubCategoriesLevel5` WRITE;
/*!40000 ALTER TABLE `SubCategoriesLevel5` DISABLE KEYS */;
INSERT INTO `SubCategoriesLevel5` VALUES (1,9,'Other'),(2,66,'Other Jackets'),(3,91,'Short Sleeve'),(4,119,'Caribbean Islands'),(5,137,'Long Sleeve'),(6,66,'Leather'),(7,146,'West Virginia'),(8,180,'Long Sleeve'),(9,182,'Sleeveless'),(10,193,'Shoulder Bags'),(11,182,'Short Sleeve'),(12,137,'Short Sleeve'),(13,210,'Hands-Free Headsets, Kits'),(14,216,'Professional'),(15,221,'1940-69'),(16,221,'1990-Now'),(17,222,'1990-Now'),(18,222,'1970-89'),(19,224,'International/1847 Rogers'),(20,222,'1940-69'),(21,221,'1970-89'),(22,222,'Pre-1940'),(23,270,'16 Inch'),(24,270,'24 Inch'),(25,270,'18 Inch'),(26,279,'Emerald'),(27,281,'Other'),(28,290,'Other Lengths'),(29,193,'Other Casual Styles'),(30,182,'Other Dresses'),(31,317,'Jade'),(32,270,'Other Lengths'),(33,330,'Other Tops'),(34,193,'Totes'),(35,91,'Long Sleeve'),(36,343,'Fur'),(37,347,'Short Sleeve'),(38,281,'Promotional'),(39,281,'Treasure Hunt'),(40,66,'Denim'),(41,281,'First Editions'),(42,356,'Leather'),(43,290,'18 Inch'),(44,290,'20 Inch'),(45,347,'Long Sleeve'),(46,371,'Short Sleeve'),(47,290,'16 Inch'),(48,375,'Short Sleeve'),(49,343,'Other Coats'),(50,385,'Other Jackets'),(51,290,'22 Inch'),(52,375,'Long Sleeve'),(53,371,'Sleeveless'),(54,371,'Long Sleeve'),(55,356,'Other Evening Bags'),(56,385,'Leather'),(57,330,'Long Sleeve'),(58,356,'Beaded'),(59,193,'Backpacks'),(60,450,'Fantasy'),(61,466,'Short Sleeve'),(62,466,'Long Sleeve'),(63,281,'Custom'),(64,193,'Clutches'),(65,182,'Long Sleeve'),(66,330,'Short Sleeve'),(67,270,'20 Inch'),(68,490,'Two-Piece'),(69,490,'One-Piece'),(70,290,'24 Inch'),(71,343,'Leather'),(72,375,'Other Dresses'),(73,270,'22 Inch'),(74,385,'Fur'),(75,371,'Other Dresses'),(76,356,'Fabric');
/*!40000 ALTER TABLE `SubCategoriesLevel5` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-22 21:19:43
