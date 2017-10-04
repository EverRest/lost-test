-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Жов 04 2017 р., 18:38
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
  `lat` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `animals`
--

INSERT INTO `animals` (`id`, `name`, `type_id`, `photo`, `lng`, `lat`) VALUES
(38, 'Derek', 1, 'uploads/animals/IMG_5370.JPG', '146.986083984375', '-34.16181816123038'),
(39, 'Lucky', 3, 'uploads/animals/IMG_5370.JPG', '150.908203125', '-33.87953701355922'),
(40, 'Jobby', 1, 'uploads/animals/IMG_5370.JPG', '149.150390625', '-35.357696204467516'),
(41, 'Creator', 2, 'uploads/animals/IMG_5370.JPG', '-118.4915828704834', '34.03222983079913'),
(42, 'Caret', 2, 'uploads/animals/IMG_5370.JPG', '154.8907470703125', '-34.50655662164559'),
(43, 'Montana', 1, 'uploads/animals/IMG_5370.JPG', '173.759765625', '-42.09822241118973'),
(44, 'Bobby', 2, 'uploads/animals/IMG_5370.JPG', '153.0450439453125', '-27.46928747369202'),
(45, 'Nenno', 2, 'uploads/animals/IMG_5370.JPG', '144.9755859375', '-37.82280243352756'),
(46, 'Berry', 2, 'uploads/animals/IMG_5370.JPG', '126.705322265625', '-25.98273700762736'),
(47, 'Poppora', 2, 'uploads/animals/IMG_5370.JPG', '137.900390625', '-4.631179340411012'),
(48, 'Kool', 1, 'uploads/animals/IMG_5370.JPG', '156.15966796875', '-32.21744857303103'),
(49, 'Tuky', 3, 'uploads/animals/IMG_5370.JPG', '148.2110595703125', '-37.47049847079871'),
(50, 'bbbbb', 2, 'uploads/animals/IMG_5370.JPG', '80.33203125', '6.839169626342807'),
(51, 'Puppy', 1, 'uploads/animals/IMG_5370.JPG', '32.51953125', '-1.9332268264771106'),
(52, 'Newbie', 1, 'uploads/animals/IMG_5370.JPG', '130.84716796875', '-11.73830237143684'),
(55, 'Keno', 2, 'uploads/animals/IMG_5370.JPG', '148.0682373046875', '-34.99850370014628'),
(56, 'Kendra', 2, 'uploads/animals/IMG_5370.JPG', '150.5181884765625', '-35.16033672813034'),
(57, 'Gogyna', 2, 'uploads/animals/IMG_5370.JPG', '143.349609375', '-15.284185114076422'),
(58, 'Olll', 1, 'uploads/animals/IMG_5370.JPG', '146.458740234375', '-34.49297540250153'),
(59, 'Bulby', 3, 'uploads/animals/IMG_5370.JPG', '135.17578125', '-30.088107753367257'),
(60, 'Nully', 3, 'uploads/animals/IMG_5370.JPG', '143.6297607421875', '-34.20271636159618'),
(61, 'NifNif', 1, 'uploads/animals/IMG_5370.JPG', '112.1044921875', '0.8349313860427184'),
(62, 'NafNam', 2, 'uploads/animals/IMG_5370.JPG', '114.7412109375', '2.3723687086440504'),
(63, 'Nufnuf', 3, 'uploads/animals/IMG_5370.JPG', '115.1806640625', '-2.3723687086440504');

-- --------------------------------------------------------

--
-- Структура таблиці `animals_cats`
--

CREATE TABLE `animals_cats` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `animals_cats`
--

INSERT INTO `animals_cats` (`animal_id`, `id`) VALUES
(41, 13),
(42, 14),
(44, 15),
(45, 16),
(46, 17),
(47, 18),
(50, 19),
(56, 20),
(57, 21),
(62, 22);

-- --------------------------------------------------------

--
-- Структура таблиці `animals_dogs`
--

CREATE TABLE `animals_dogs` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `animals_dogs`
--

INSERT INTO `animals_dogs` (`animal_id`, `id`) VALUES
(38, 9),
(40, 10),
(43, 11),
(48, 12),
(51, 13),
(52, 14),
(58, 15),
(61, 16);

-- --------------------------------------------------------

--
-- Структура таблиці `animals_parrots`
--

CREATE TABLE `animals_parrots` (
  `animal_id` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `animals_parrots`
--

INSERT INTO `animals_parrots` (`animal_id`, `id`) VALUES
(39, 7),
(49, 8),
(59, 9),
(60, 10),
(63, 11);

-- --------------------------------------------------------

--
-- Структура таблиці `cats`
--

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `info` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `cats`
--

INSERT INTO `cats` (`id`, `info`) VALUES
(13, 'blue'),
(14, 'red'),
(15, 'orange'),
(16, 'Lol'),
(17, 'violet'),
(18, 'brown'),
(19, 'silver'),
(20, 'brown'),
(21, 'silver'),
(22, 'gold');

-- --------------------------------------------------------

--
-- Структура таблиці `dogs`
--

CREATE TABLE `dogs` (
  `id` int(11) NOT NULL,
  `info` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `dogs`
--

INSERT INTO `dogs` (`id`, `info`) VALUES
(9, 'wolf'),
(10, 'huskey'),
(11, 'terra'),
(12, 'noooooon'),
(13, 'green'),
(14, 'labrador'),
(15, 'akito'),
(16, 'terrier');

-- --------------------------------------------------------

--
-- Структура таблиці `parrots`
--

CREATE TABLE `parrots` (
  `id` int(11) NOT NULL,
  `info` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `parrots`
--

INSERT INTO `parrots` (`id`, `info`) VALUES
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT для таблиці `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT для таблиці `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблиці `parrots`
--
ALTER TABLE `parrots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
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
