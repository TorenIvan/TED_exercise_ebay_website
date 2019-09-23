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
-- Table structure for table `SubCategoriesLevel2`
--

DROP TABLE IF EXISTS `SubCategoriesLevel2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubCategoriesLevel2` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_Father` int(10) unsigned NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoriesLevel2`
--

LOCK TABLES `SubCategoriesLevel2` WRITE;
/*!40000 ALTER TABLE `SubCategoriesLevel2` DISABLE KEYS */;
INSERT INTO `SubCategoriesLevel2` VALUES (1,1,'Decorative by Brand'),(2,2,'Paper'),(3,3,'Barware'),(4,4,'Comics'),(5,3,'Bottles: Antique (Pre-1900)'),(6,5,'Photographic Images'),(7,3,'Kitchenware'),(8,6,'Clocks'),(9,7,'Cars'),(10,3,'Textiles'),(11,3,'Bottles: Modern (1900-Now)'),(12,8,'Clothing'),(13,4,'Magic'),(14,3,'Shaving'),(15,9,'Clothing: Big & Tall'),(16,3,'Metalware'),(17,4,'Promo Glasses'),(18,3,'Tableware'),(19,9,'Accessories'),(20,10,'Theater'),(21,11,'Firefighting'),(22,12,'Golf-Other'),(23,4,'Science Fiction'),(24,13,'Intimates'),(25,4,'Trading Cards'),(26,9,'Clothing: Regular'),(27,14,'Dog'),(28,15,'Civil War (1861-65)'),(29,3,'Irons'),(30,4,'Lunchboxes, Thermoses'),(31,10,'Other Memorabilia'),(32,3,'Magnets'),(33,7,'Tobacciana'),(34,4,'Pinbacks'),(35,16,'Racing-NASCAR'),(36,10,'Movie'),(37,13,'Plus Sizes'),(38,9,'Footwear'),(39,17,'Automobilia'),(40,4,'Nodders'),(41,10,'Autographs'),(42,12,'Football-Other'),(43,13,'Misses'),(44,18,'DVD'),(45,4,'Keychains'),(46,3,'Bottles: Reproduction'),(47,4,'Pez'),(48,19,'Cultures'),(49,1,'Holiday, Seasonal'),(50,12,'Basketball-NBA'),(51,20,'Contemporary (1968-Now)'),(52,6,'Knives'),(53,10,'Television'),(54,17,'Railroadiana, Trains'),(55,17,'Aviation'),(56,21,'Vanity Items'),(57,22,'Marbles'),(58,14,'Bird'),(59,5,'Animation Characters'),(60,6,'Tools'),(61,23,'Decorative Arts'),(62,24,'Makeup & Face Care'),(63,12,'Hockey-NHL'),(64,25,'Brides\' Gowns'),(65,24,'Body Care'),(66,12,'Baseball-Other'),(67,7,'Distillery'),(68,11,'Flags'),(69,18,'VHS'),(70,1,'Decorative by Theme'),(71,12,'Tennis'),(72,13,'Accessories'),(73,16,'Football-NFL'),(74,26,'Miniatures'),(75,27,'Filters'),(76,28,'Feeding'),(77,28,'Safety'),(78,29,'Halves'),(79,28,'Nursery'),(80,30,'Possessions'),(81,31,'Drives-Internal'),(82,30,'Duck Stamps'),(83,32,'Plants, Seeds, Bulbs'),(84,33,'Honey, Syrup'),(85,34,'Stained Glass'),(86,29,'Half Dimes'),(87,35,'Canada'),(88,36,'Obsolete Currency'),(89,37,'Bedding'),(90,38,'Cellular, Wireless Phones'),(91,39,'UK (Great Britain)'),(92,29,'Quarters'),(93,40,'Cable & Satellite'),(94,30,'Covers, Event'),(95,30,'Postal History'),(96,41,'Pottery'),(97,42,'Accent Pieces'),(98,43,'Nintendo, Super'),(99,30,'Collections, Mixture'),(100,44,'GPS'),(101,45,'Accessories'),(102,46,'China'),(103,47,'Laundry & Closets'),(104,43,'Nintendo 64'),(105,29,'Large Cents'),(106,32,'Tools, Gear, Equipment'),(107,34,'Fenton'),(108,28,'Other Baby Items'),(109,42,'Floral D_cor'),(110,48,'Laser Printers'),(111,49,'Event Tickets'),(112,50,'Boyds'),(113,51,'Other'),(114,52,'Drives'),(115,53,'CDs'),(116,23,'Silver'),(117,54,'Cassettes'),(118,55,'Adventure'),(119,56,'Paintings'),(120,18,'Laserdisc'),(121,18,'PAL'),(122,18,'16mm'),(123,18,'Television'),(124,57,'Other'),(125,55,'Military'),(126,58,'Mystery, Adventure'),(127,55,'Romance'),(128,59,'Clothing'),(129,18,'Beta'),(130,18,'8mm'),(131,53,'Records'),(132,60,'True Crime'),(133,55,'Other'),(134,61,'Instructional'),(135,61,'Vehicles'),(136,56,'Prints'),(137,60,'Movies, TV'),(138,55,'Mystery, Suspense'),(139,23,'Books, Manuscripts'),(140,59,'Footwear'),(141,59,'Accessories'),(142,63,'Accessories'),(143,59,'Other Items'),(144,63,'Clothing'),(145,64,'New, Contemporary'),(146,65,'Gag Gifts, Novelties'),(147,8,'Accessories'),(148,66,'Instruments'),(149,8,'Footwear'),(150,67,'Cars, Trucks-Diecast'),(151,13,'Footwear'),(152,63,'Footwear'),(153,13,'Petites'),(154,24,'Fragrances: Women'),(155,63,'Other Items'),(156,68,'Shelving & Racks'),(157,13,'Maternity'),(158,69,'Vintage'),(159,70,'Electronic, Interactive'),(160,26,'Board, Traditional Games'),(161,24,'Hair Care'),(162,24,'Fragrances: Men'),(163,25,'Grooms\' Attire'),(164,25,'Other Items'),(165,24,'Nail Care'),(166,25,'Bridesmaids\' Dresses'),(167,25,'Accessories'),(168,24,'Other Items'),(169,71,'Crystal, Lampwork & Glass'),(170,64,'Vintage, Antique'),(171,25,'Flower Girls\' Dresses'),(172,72,'Rings'),(173,26,'Role Playing'),(174,73,'Other'),(175,72,'Chains, Necklaces');
/*!40000 ALTER TABLE `SubCategoriesLevel2` ENABLE KEYS */;
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
