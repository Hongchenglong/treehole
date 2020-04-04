-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 2019-04-01 21:25:38
-- 服务器版本： 5.6.35
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `treehole`
--

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL COMMENT '自增id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `face_url` varchar(250) NULL COMMENT '用户头像',
  `content` varchar(500) NOT NULL COMMENT '树洞消息内容',
  `total_likes` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `send_timestamp` int(11) NOT NULL COMMENT '发布的时间戳'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='树洞消息表';

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT '自增id',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `password` varchar(32) NOT NULL COMMENT '密码，md5加密',
  `face_url` varchar(250) NULL COMMENT '用户头像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id';
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id';