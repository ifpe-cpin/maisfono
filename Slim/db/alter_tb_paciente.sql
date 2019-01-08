ALTER TABLE `tb_paciente` ADD `frg_user` VARCHAR(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL AFTER `id_pessoa`, ADD INDEX (`frg_user`);



ALTER TABLE `tb_paciente` ADD FOREIGN KEY (`frg_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;