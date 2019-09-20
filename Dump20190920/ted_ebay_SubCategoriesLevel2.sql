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
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoriesLevel2`
--

LOCK TABLES `SubCategoriesLevel2` WRITE;
/*!40000 ALTER TABLE `SubCategoriesLevel2` DISABLE KEYS */;
INSERT INTO `SubCategoriesLevel2` VALUES (1,1,'Decorative by Brand'),(2,2,'Paper'),(3,3,'Barware'),(4,4,'Comics'),(5,3,'Bottles: Antique (Pre-1900)'),(6,5,'Photographic Images'),(7,3,'Kitchenware'),(8,6,'Clocks'),(9,7,'Cars'),(10,3,'Textiles'),(11,3,'Bottles: Modern (1900-Now)'),(12,8,'Clothing'),(13,4,'Magic'),(14,3,'Shaving'),(15,9,'Clothing: Big & Tall'),(16,3,'Metalware'),(17,4,'Promo Glasses'),(18,3,'Tableware'),(19,9,'Accessories'),(20,10,'Theater'),(21,11,'Firefighting'),(22,12,'Golf-Other'),(23,4,'Science Fiction'),(24,13,'Intimates'),(25,4,'Trading Cards'),(26,9,'Clothing: Regular'),(27,14,'Dog'),(28,15,'Civil War (1861-65)'),(29,3,'Irons'),(30,4,'Lunchboxes, Thermoses'),(31,10,'Other Memorabilia'),(32,3,'Magnets'),(33,7,'Tobacciana'),(34,10,'Television'),(35,3,'Flue Covers'),(36,4,'Keychains'),(37,11,'Other Historical Items'),(38,10,'Movie'),(39,16,'Fragrances: Women'),(40,7,'Breweriana'),(41,4,'Nodders'),(42,4,'Pez'),(43,6,'Tools'),(44,4,'Pinbacks'),(45,5,'Art'),(46,17,'Racing-NASCAR'),(47,13,'Plus Sizes'),(48,9,'Footwear'),(49,18,'Automobilia'),(50,10,'Autographs'),(51,12,'Football-Other'),(52,13,'Misses'),(53,19,'DVD'),(54,3,'Bottles: Reproduction'),(55,20,'Cultures'),(56,1,'Holiday, Seasonal'),(57,12,'Basketball-NBA'),(58,21,'Pottery'),(59,6,'Knives'),(60,22,'Cars, Trucks-Diecast'),(61,18,'Aviation'),(62,23,'Decorative Arts'),(63,19,'VHS'),(64,13,'Footwear'),(65,24,'Clothing (Pre-1980)'),(66,25,'Contemporary (1968-Now)'),(67,18,'Railroadiana, Trains'),(68,24,'Vanity Items'),(69,26,'Marbles'),(70,14,'Bird'),(71,5,'Animation Characters'),(72,13,'Petites'),(73,16,'Makeup & Face Care'),(74,12,'Hockey-NHL'),(75,27,'Brides\' Gowns'),(76,16,'Body Care'),(77,12,'Baseball-Other'),(78,7,'Distillery'),(79,11,'Flags'),(80,13,'Accessories'),(81,28,'Footwear'),(82,29,'Cellular, Wireless Phones'),(83,1,'Decorative by Theme'),(84,12,'Tennis'),(85,7,'Candy & Nuts'),(86,12,'Golf-PGA'),(87,30,'Mousepads'),(88,17,'Football-NFL'),(89,31,'Miniatures'),(90,32,'Filters'),(91,33,'Feeding'),(92,33,'Safety'),(93,34,'Halves'),(94,33,'Nursery'),(95,35,'Possessions'),(96,36,'Drives-Internal'),(97,35,'Duck Stamps'),(98,37,'Plants, Seeds, Bulbs'),(99,38,'Honey, Syrup'),(100,39,'Stained Glass'),(101,34,'Half Dimes'),(102,40,'Canada'),(103,41,'Obsolete Currency'),(104,42,'Bedding'),(105,43,'UK (Great Britain)'),(106,34,'Quarters'),(107,44,'Cable & Satellite'),(108,35,'Covers, Event'),(109,35,'Postal History'),(110,45,'Accent Pieces'),(111,46,'Nintendo, Super'),(112,35,'Collections, Mixture'),(113,47,'GPS'),(114,48,'Accessories'),(115,49,'China'),(116,50,'Laundry & Closets'),(117,46,'Nintendo 64'),(118,34,'Large Cents'),(119,37,'Tools, Gear, Equipment'),(120,39,'Fenton'),(121,33,'Other Baby Items'),(122,45,'Floral D_cor'),(123,51,'Laser Printers'),(124,52,'Event Tickets'),(125,53,'Boyds'),(126,54,'Other'),(127,55,'Drives'),(128,56,'Contemporary (1973-Now)'),(129,53,'Artist'),(130,35,'FDCs (pre-1951)'),(131,39,'Pyrex'),(132,46,'Nintendo NES'),(133,57,'By Material'),(134,58,'To fit Nikon'),(135,39,'EAPG'),(136,16,'Other Items'),(137,59,'Italy & Area'),(138,46,'Sony PlayStation'),(139,39,'Elegant'),(140,60,'Copiers'),(141,61,'16-inch or smaller'),(142,62,'Subwoofers'),(143,19,'Beta'),(144,57,'Antique'),(145,63,'Table Lamps'),(146,30,'Gaming Controls'),(147,64,'Power Tools'),(148,37,'Garden D_cor'),(149,65,'USB'),(150,21,'Porcelain'),(151,39,'Vaseline'),(152,44,'Accessories'),(153,66,'Other'),(154,45,'Vases'),(155,67,'Network Interface Cards'),(156,46,'Internet Games'),(157,39,'Waterford'),(158,68,'PC'),(159,63,'Other Lamps, Lighting'),(160,61,'Flat Panel'),(161,52,'Gift Certificates'),(162,69,'CDs'),(163,23,'Silver'),(164,70,'Cassettes'),(165,71,'Adventure'),(166,72,'Paintings'),(167,19,'Laserdisc'),(168,19,'PAL'),(169,19,'16mm'),(170,19,'Television'),(171,73,'Other'),(172,71,'Military'),(173,74,'Mystery, Adventure'),(174,71,'Romance'),(175,75,'Clothing'),(176,19,'8mm'),(177,72,'Prints'),(178,76,'National Geographic'),(179,75,'Other Items'),(180,23,'Antiquities'),(181,69,'Records'),(182,76,'Illustrated'),(183,76,'True Crime'),(184,71,'Other'),(185,77,'Instructional'),(186,76,'Celebrity'),(187,77,'Military'),(188,77,'Vehicles'),(189,76,'Movies, TV'),(190,77,'Religion'),(191,78,'Illustrated, Art'),(192,71,'Mystery, Suspense'),(193,80,'Self-Help'),(194,23,'Ethnographic'),(195,23,'Books, Manuscripts'),(196,76,'Women'),(197,19,'CED'),(198,75,'Footwear'),(199,75,'Accessories'),(200,28,'Accessories'),(201,28,'Clothing'),(202,81,'New, Contemporary'),(203,82,'Gag Gifts, Novelties'),(204,8,'Accessories'),(205,83,'Instruments'),(206,8,'Footwear'),(207,28,'Other Items'),(208,84,'Shelving & Racks'),(209,27,'Accessories'),(210,27,'Grooms\' Attire'),(211,85,'Star Wars'),(212,13,'Maternity'),(213,86,'Vintage'),(214,87,'Electronic, Interactive'),(215,31,'Board, Traditional Games'),(216,16,'Hair Care'),(217,16,'Fragrances: Men'),(218,26,'Yo-Yos'),(219,82,'Party, Occasion Supplies'),(220,27,'Other Items'),(221,16,'Nail Care'),(222,27,'Bridesmaids\' Dresses'),(223,88,'Tourmaline'),(224,89,'Other'),(225,85,'Super Hero'),(226,90,'Crystal, Lampwork & Glass'),(227,81,'Vintage, Antique'),(228,27,'Flower Girls\' Dresses'),(229,91,'Slightly Unusual'),(230,92,'Wristwatches'),(231,93,'Rings'),(232,8,'Other Boys Items'),(233,94,'Other Ethnic, Tribal'),(234,85,'Sports'),(235,31,'Role Playing'),(236,85,'Other'),(237,93,'Chains, Necklaces'),(238,31,'Magic, Gaming Cards (CCG)');
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

-- Dump completed on 2019-09-20 14:56:08
