-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Жов 01 2017 р., 12:45
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
(12, 'fdsfdsfsda', 1, 'uploads/animals/IMG_5370.JPG', '149.161376953125', '-34.96699890670366'),
(13, 'vcxvxcvxc', 1, 'uploads/animals/IMG_5370.JPG', '149.732666015625', '-34.78222760653012'),
(14, 'Lucky', 1, 'uploads/animals/IMG_5370.JPG', '147.6507568359375', '-34.28445325435288'),
(15, 'Zooolooose', 3, 'uploads/animals/IMG_5370.JPG', '147.1893310546875', '-35.115415314253596'),
(16, 'Berry', 2, 'uploads/animals/IMG_5370.JPG', '148.677978515625', '-33.61461929233377'),
(17, 'ghjgkk', 1, 'uploads/animals/IMG_5370.JPG', '148.2330322265625', '-35.00750284295289'),
(18, 'POlly', 2, 'uploads/animals/IMG_5370.JPG', '148.018798828125', '-34.83634999076384'),
(19, ',.m nbvnvm,', 3, 'uploads/animals/IMG_5370.JPG', '149.1229248046875', '-34.19362958613085'),
(20, 'Pedrik', 2, 'uploads/animals/IMG_5370.JPG', '151.116943359375', '-33.86129311351552'),
(21, 'Booby', 2, 'uploads/animals/IMG_0227.JPG', '148.634033203125', '-32.249974455863295'),
(22, 'Eddy', 3, 'uploads/animals/IMG_7731.JPG', '148.2989501953125', '-34.307143856288036'),
(23, 'Pussycat', 2, 'uploads/animals/IMG_5370.JPG', '153.5723876953125', '-34.583475055991755'),
(24, 'Kerry', 3, 'uploads/animals/IMG_5370.JPG', '152.1221923828125', '-35.44277092585765'),
(25, 'Valera', 1, 'uploads/animals/IMG_5370.JPG', '152.4737548828125', '-33.6008944080788'),
(26, 'Byyy', 2, 'uploads/animals/IMG_5370.JPG', '151.7706298828125', '-34.651285198954135'),
(27, 'Petty', 2, 'uploads/animals/IMG_5370.JPG', '151.6937255859375', '-34.49750272138161'),
(28, 'ggi', 3, 'uploads/animals/IMG_5370.JPG', '145.8984375', '-32.8795871730663'),
(29, 'buulby', 2, 'uploads/animals/IMG_5370.JPG', '148.392333984375', '-36.38591277287651'),
(30, 'Petty', 2, 'uploads/animals/IMG_5370.JPG', '142.305908203125', '-32.41242905441613'),
(31, 'Duma', 2, 'uploads/animals/IMG_5370.JPG', '144.9700927734375', '-37.84015683604134'),
(32, 'Nana', 1, 'uploads/animals/IMG_5370.JPG', '148.0902099609375', '-40.02340800226771'),
(33, 'Poppy', 1, 'uploads/animals/IMG_5370.JPG', '121.9482421875', '-26.470573022375085');

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
(16, 1),
(18, 2),
(20, 3),
(21, 4),
(23, 5),
(26, 6),
(27, 7),
(29, 8),
(30, 9),
(31, 10);

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
(12, 2),
(13, 3),
(14, 4),
(17, 5),
(25, 6),
(32, 7),
(33, 8);

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
(15, 1),
(19, 2),
(22, 3),
(24, 4),
(28, 5);

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
(1, 'rudy'),
(2, 'nice'),
(3, 'blue'),
(4, 'blue'),
(5, 'terracot'),
(6, 'silver'),
(7, 'candy'),
(8, 'white'),
(9, 'catty'),
(10, 'lovely');

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
(2, 'sdafdsfsadf'),
(3, 'dcxzcxzcxzc'),
(4, 'doberman'),
(5, 'm,nmnbnm.'),
(6, 'hasky'),
(7, 'Huuuuu'),
(8, 'Catu');

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
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT для таблиці `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT для таблиці `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT для таблиці `parrots`
--
ALTER TABLE `parrots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
