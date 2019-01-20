ALTER TABLE `tb_fonoaudiologo` ADD `frg_user` VARCHAR(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL AFTER `arr_cursos`, ADD INDEX (`frg_user`);

ALTER TABLE `tb_fonoaudiologo` ADD FOREIGN KEY (`frg_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;