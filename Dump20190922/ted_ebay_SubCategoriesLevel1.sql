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
-- Table structure for table `SubCategoriesLevel1`
--

DROP TABLE IF EXISTS `SubCategoriesLevel1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubCategoriesLevel1` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_Father` int(10) unsigned NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoriesLevel1`
--

LOCK TABLES `SubCategoriesLevel1` WRITE;
/*!40000 ALTER TABLE `SubCategoriesLevel1` DISABLE KEYS */;
INSERT INTO `SubCategoriesLevel1` VALUES (1,164,'Decorative & Holiday'),(2,164,'Autographs, Paper & Writing'),(3,164,'Housewares & Kitchenware'),(4,164,'Pop Culture'),(5,164,'Art, Animation & Photo Images'),(6,164,'Furnishings, Knives & Tools'),(7,164,'Advertising'),(8,165,'Boys'),(9,165,'Men'),(10,166,'Memorabilia'),(11,164,'Historical Memorabilia'),(12,167,'Memorabilia'),(13,165,'Women'),(14,164,'Animals'),(15,164,'Militaria'),(16,167,'Autographs'),(17,164,'Transportation'),(18,166,'Video, Film'),(19,164,'Cultures & Religions'),(20,164,'Disneyana'),(21,164,'Vintage Clothing, Accessories'),(22,168,'Classic Toys'),(23,169,'Antiques'),(24,165,'Personal Care'),(25,165,'Wedding Apparel'),(26,168,'Games'),(27,170,'Camera Accessories'),(28,171,'Baby Items'),(29,172,'Coins: US'),(30,173,'United States'),(31,174,'Apple, Macintosh'),(32,171,'Gardening'),(33,171,'Food & Beverage'),(34,175,'Glass'),(35,172,'Paper Money: World'),(36,172,'Paper Money: US'),(37,171,'Bed & Bath'),(38,176,'Phones & Wireless Devices'),(39,172,'Coins: World'),(40,176,'Home Audio & Video'),(41,175,'Pottery & China'),(42,171,'Home D_cor'),(43,176,'Video Games'),(44,176,'Gadgets & Other Electronics'),(45,174,'Laptops & Accessories'),(46,173,'Other World'),(47,171,'Housekeeping & Storage'),(48,174,'Printers & Supplies'),(49,177,'Tickets & Experiences'),(50,178,'Bears'),(51,170,'Digital Cameras'),(52,174,'Drives, Media'),(53,179,'CDs, Records, & Tapes'),(54,180,'Audio'),(55,180,'Fiction'),(56,169,'Art'),(57,180,'First Editions'),(58,180,'Children'),(59,165,'Infants'),(60,180,'Magazines, Catalogs'),(61,180,'Nonfiction'),(62,180,'Other'),(63,165,'Girls'),(64,181,'Fine Jewelry'),(65,182,'Gifts & Party Supplies'),(66,183,'Medical, Dental'),(67,168,'Diecast, Toy Vehicles'),(68,183,'Retail'),(69,181,'Costume Jewelry'),(70,168,'Electronic, Battery, Wind-Up'),(71,181,'Beads, Amulets'),(72,181,'Men'),(73,168,'Action Figures');
/*!40000 ALTER TABLE `SubCategoriesLevel1` ENABLE KEYS */;
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
