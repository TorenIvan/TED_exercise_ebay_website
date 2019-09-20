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
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoriesLevel5`
--

LOCK TABLES `SubCategoriesLevel5` WRITE;
/*!40000 ALTER TABLE `SubCategoriesLevel5` DISABLE KEYS */;
INSERT INTO `SubCategoriesLevel5` VALUES (1,9,'Other'),(2,66,'Other Jackets'),(3,91,'Short Sleeve'),(4,109,'1990-Now'),(5,109,'1940-69'),(6,146,'Caribbean Islands'),(7,159,'Long Sleeve'),(8,66,'Leather'),(9,165,'West Virginia'),(10,91,'Long Sleeve'),(11,175,'Promotional'),(12,186,'Lingerie, Stockings'),(13,202,'Long Sleeve'),(14,175,'Other'),(15,219,'Long Sleeve'),(16,202,'Sleeveless'),(17,226,'Other Casual Styles'),(18,229,'Batteries'),(19,226,'Shoulder Bags'),(20,202,'Short Sleeve'),(21,159,'Short Sleeve'),(22,246,'Hands-Free Headsets, Kits'),(23,252,'Professional'),(24,254,'Other'),(25,256,'Hands-Free Headsets, Kits'),(26,259,'Other'),(27,269,'Professional'),(28,270,'Pre-1940'),(29,270,'1940-69'),(30,276,'International/1847 Rogers'),(31,270,'1970-89'),(32,109,'1970-89'),(33,270,'1990-Now'),(34,291,'Gorham, Whiting'),(35,325,'16 Inch'),(36,325,'24 Inch'),(37,325,'18 Inch'),(38,334,'Emerald'),(39,344,'Other Lengths'),(40,202,'Other Dresses'),(41,369,'Jade'),(42,325,'Other Lengths'),(43,382,'Other Tops'),(44,226,'Totes'),(45,325,'20 Inch'),(46,344,'18 Inch'),(47,399,'Other Coats'),(48,401,'Leather'),(49,401,'Other Jackets'),(50,344,'24 Inch'),(51,175,'Custom'),(52,66,'Denim'),(53,175,'First Editions'),(54,412,'Long Sleeve'),(55,417,'Other Tops'),(56,399,'Fur'),(57,431,'Short Sleeve'),(58,175,'Treasure Hunt'),(59,436,'Leather'),(60,344,'20 Inch'),(61,431,'Long Sleeve'),(62,412,'Short Sleeve'),(63,344,'16 Inch'),(64,448,'Short Sleeve'),(65,344,'22 Inch'),(66,448,'Long Sleeve'),(67,412,'Sleeveless'),(68,436,'Other Evening Bags'),(69,382,'Long Sleeve'),(70,219,'Short Sleeve'),(71,226,'Clutches'),(72,436,'Beaded'),(73,226,'Backpacks'),(74,417,'Short Sleeve'),(75,417,'Long Sleeve'),(76,520,'Fantasy'),(77,382,'Short Sleeve'),(78,412,'Other Dresses'),(79,448,'Other Dresses'),(80,399,'Leather'),(81,436,'Fabric'),(82,334,'Other Shapes'),(83,565,'Two-Piece'),(84,565,'One-Piece'),(85,325,'22 Inch'),(86,574,'Other'),(87,401,'Fur');
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

-- Dump completed on 2019-09-20 14:56:09
