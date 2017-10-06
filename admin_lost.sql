-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Жов 06 2017 р., 11:20
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
  `lng` varchar(30) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `animals_cats`
--

CREATE TABLE `animals_cats` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `animals_dogs`
--

CREATE TABLE `animals_dogs` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `animals_parrots`
--

CREATE TABLE `animals_parrots` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `cats`
--

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `info` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `dogs`
--

CREATE TABLE `dogs` (
  `id` int(11) NOT NULL,
  `info` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `parrots`
--

CREATE TABLE `parrots` (
  `id` int(11) NOT NULL,
  `info` tinyint(1) DEFAULT NULL
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
  ADD PRIMARY KEY (`animal_id`,`id`),
  ADD KEY `cat_id` (`id`);

--
-- Індекси таблиці `animals_dogs`
--
ALTER TABLE `animals_dogs`
  ADD PRIMARY KEY (`animal_id`,`id`),
  ADD KEY `dog_id` (`id`);

--
-- Індекси таблиці `animals_parrots`
--
ALTER TABLE `animals_parrots`
  ADD PRIMARY KEY (`animal_id`,`id`),
  ADD KEY `parrot_id` (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT для таблиці `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT для таблиці `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT для таблиці `parrots`
--
ALTER TABLE `parrots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
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
  ADD CONSTRAINT `animals_cats_ibfk_2` FOREIGN KEY (`id`) REFERENCES `cats` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `animals_dogs`
--
ALTER TABLE `animals_dogs`
  ADD CONSTRAINT `animals_dogs_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `animals_dogs_ibfk_2` FOREIGN KEY (`id`) REFERENCES `dogs` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `animals_parrots`
--
ALTER TABLE `animals_parrots`
  ADD CONSTRAINT `animals_parrots_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`),
  ADD CONSTRAINT `animals_parrots_ibfk_2` FOREIGN KEY (`id`) REFERENCES `parrots` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
