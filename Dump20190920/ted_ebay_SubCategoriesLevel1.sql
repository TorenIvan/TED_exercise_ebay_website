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
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoriesLevel1`
--

LOCK TABLES `SubCategoriesLevel1` WRITE;
/*!40000 ALTER TABLE `SubCategoriesLevel1` DISABLE KEYS */;
INSERT INTO `SubCategoriesLevel1` VALUES (1,140,'Decorative & Holiday'),(2,140,'Autographs, Paper & Writing'),(3,140,'Housewares & Kitchenware'),(4,140,'Pop Culture'),(5,140,'Art, Animation & Photo Images'),(6,140,'Furnishings, Knives & Tools'),(7,140,'Advertising'),(8,141,'Boys'),(9,141,'Men'),(10,142,'Memorabilia'),(11,140,'Historical Memorabilia'),(12,143,'Memorabilia'),(13,141,'Women'),(14,140,'Animals'),(15,140,'Militaria'),(16,141,'Personal Care'),(17,143,'Autographs'),(18,140,'Transportation'),(19,142,'Video, Film'),(20,140,'Cultures & Religions'),(21,144,'Pottery & China'),(22,145,'Diecast, Toy Vehicles'),(23,146,'Antiques'),(24,140,'Vintage Clothing, Accessories'),(25,140,'Disneyana'),(26,145,'Classic Toys'),(27,141,'Wedding Apparel'),(28,141,'Girls'),(29,147,'Phones & Wireless Devices'),(30,148,'Input Peripherals'),(31,145,'Games'),(32,149,'Camera Accessories'),(33,150,'Baby Items'),(34,151,'Coins: US'),(35,152,'United States'),(36,148,'Apple, Macintosh'),(37,150,'Gardening'),(38,150,'Food & Beverage'),(39,144,'Glass'),(40,151,'Paper Money: World'),(41,151,'Paper Money: US'),(42,150,'Bed & Bath'),(43,151,'Coins: World'),(44,147,'Home Audio & Video'),(45,150,'Home D_cor'),(46,147,'Video Games'),(47,147,'Gadgets & Other Electronics'),(48,148,'Laptops & Accessories'),(49,152,'Other World'),(50,150,'Housekeeping & Storage'),(51,148,'Printers & Supplies'),(52,153,'Tickets & Experiences'),(53,154,'Bears'),(54,149,'Digital Cameras'),(55,148,'Drives, Media'),(56,154,'Barbie'),(57,154,'Dolls'),(58,149,'Lenses'),(59,152,'Europe'),(60,155,'Office Equipment'),(61,148,'Monitors'),(62,147,'Car Audio & Electronics'),(63,150,'Lamps, Lighting, Ceiling Fans'),(64,150,'Tools'),(65,148,'Scanners'),(66,145,'Educational, Developmental'),(67,148,'Networking & I.T.'),(68,148,'Software'),(69,156,'CDs, Records, & Tapes'),(70,157,'Audio'),(71,157,'Fiction'),(72,146,'Art'),(73,157,'First Editions'),(74,157,'Children'),(75,141,'Infants'),(76,157,'Magazines, Catalogs'),(77,157,'Nonfiction'),(78,157,'Antiquarian, Rare'),(79,157,'Other'),(80,157,'Textbooks, Education'),(81,158,'Fine Jewelry'),(82,159,'Gifts & Party Supplies'),(83,155,'Medical, Dental'),(84,155,'Retail'),(85,145,'Action Figures'),(86,158,'Costume Jewelry'),(87,145,'Electronic, Battery, Wind-Up'),(88,158,'Loose Gemstones'),(89,155,'Telephone Systems'),(90,158,'Beads, Amulets'),(91,159,'Weird Stuff'),(92,158,'Watches'),(93,158,'Men'),(94,158,'Ethnic, Tribal Jewelry');
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

-- Dump completed on 2019-09-20 14:56:09
