-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Вер 29 2017 р., 19:06
-- Версія сервера: 5.6.34-log
-- Версія PHP: 7.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `admin_lost`
--

-- --------------------------------------------------------

--
-- Структура таблиці `animals`
--

CREATE TABLE `animals` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `type_id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `lng` varchar(20) NOT NULL,
  `lat` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `animals`
--

INSERT INTO `animals` (`id`, `name`, `type_id`, `photo`, `lng`, `lat`) VALUES
(1, 'уцкуцкцукй', 1, 'uploads/animals/a97f2901e192ad169dad2e44d36b56bd_view.jpg', '149.1229248046875', '-35.30840140169162'),
(2, 'mnvbn', 2, 'uploads/animals/IMG_5370.JPG', '149.798583984375', '-34.75966612466248'),
(3, 'fdsfsafs', 2, 'uploads/animals/IMG_5370.JPG', '149.4580078125', '-34.70549341022545'),
(4, 'dsfasfsadf', 1, 'uploads/animals/IMG_5370.JPG', '149.8150634765625', '-34.624167789904895'),
(5, 'vzvcvz', 2, 'uploads/animals/IMG_5370.JPG', '149.1229248046875', '-35.30391856531168'),
(6, 'vcxvxcvz', 1, 'uploads/animals/IMG_5370.JPG', '149.7821044921875', '-34.50655662164559'),
(7, 'fdsfsdfsad', 1, 'uploads/animals/IMG_5370.JPG', '150.27099609375', '-34.09361045276871'),
(8, 'dsafsdfasd', 1, 'uploads/animals/IMG_5370.JPG', '149.534912109375', '-34.474863669009004'),
(9, 'dsfsdffdsa', 1, 'uploads/animals/IMG_5370.JPG', '149.468994140625', '-34.96699890670366'),
(10, 'fdsfdsafsdfsad', 1, 'uploads/animals/IMG_5370.JPG', '149.6942138671875', '-35.101934057246055'),
(11, 'dfdsfdfsaf', 1, 'uploads/animals/IMG_5370.JPG', '148.7274169921875', '-34.46580632768851'),
(12, 'fdsfdsfsda', 1, 'uploads/animals/IMG_5370.JPG', '149.161376953125', '-34.96699890670366'),
(13, 'vcxvxcvxc', 1, 'uploads/animals/IMG_5370.JPG', '149.732666015625', '-34.78222760653012');

-- --------------------------------------------------------

--
-- Структура таблиці `animals_cats`
--

CREATE TABLE `animals_cats` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `cat_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `animals_dogs`
--

CREATE TABLE `animals_dogs` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `dog_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `animals_dogs`
--

INSERT INTO `animals_dogs` (`animal_id`, `dog_id`) VALUES
(12, 2),
(13, 3);

-- --------------------------------------------------------

--
-- Структура таблиці `animals_parrots`
--

CREATE TABLE `animals_parrots` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `parrot_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `cats`
--

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `dogs`
--

CREATE TABLE `dogs` (
  `id` int(11) NOT NULL,
  `sort` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `dogs`
--

INSERT INTO `dogs` (`id`, `sort`) VALUES
(1, 'fasfdsfa'),
(2, 'sdafdsfsadf'),
(3, 'dcxzcxzcxzc');

-- --------------------------------------------------------

--
-- Структура таблиці `parrots`
--

CREATE TABLE `parrots` (
  `id` int(11) NOT NULL,
  `talk` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'dog'),
(2, 'cat'),
(3, 'parrot');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Індекси таблиці `animals_cats`
--
ALTER TABLE `animals_cats`
  ADD PRIMARY KEY (`animal_id`,`cat_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Індекси таблиці `animals_dogs`
--
ALTER TABLE `animals_dogs`
  ADD PRIMARY KEY (`animal_id`,`dog_id`),
  ADD KEY `dog_id` (`dog_id`);

--
-- Індекси таблиці `animals_parrots`
--
ALTER TABLE `animals_parrots`
  ADD PRIMARY KEY (`animal_id`,`parrot_id`),
  ADD KEY `parrot_id` (`parrot_id`);

--
-- Індекси таблиці `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `dogs`
--
ALTER TABLE `dogs`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `parrots`
--
ALTER TABLE `parrots`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблиці `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблиці `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблиці `parrots`
--
ALTER TABLE `parrots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблиці `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `animals`
--
ALTER TABLE `animals`
  ADD CONSTRAINT `animals_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `animals_cats`
--
ALTER TABLE `animals_cats`
  ADD CONSTRAINT `animals_cats_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `animals_cats_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `cats` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `animals_dogs`
--
ALTER TABLE `animals_dogs`
  ADD CONSTRAINT `animals_dogs_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `animals_dogs_ibfk_2` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `animals_parrots`
--
ALTER TABLE `animals_parrots`
  ADD CONSTRAINT `animals_parrots_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `animals_parrots_ibfk_2` FOREIGN KEY (`parrot_id`) REFERENCES `parrots` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
