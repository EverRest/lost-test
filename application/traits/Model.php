<?php

if (!trait_exists('Model')) {

    trait Model
    {
        public $_tbl;

        /**
         * set table
         * @param $tbl
         */
        public function setTbl($tbl)
        {
            $this->_tbl = $tbl;
        }

        /**
         * get table
         * @return bool
         */
        public function getTbl()
        {
            return !(empty($this->_tbl))? $this->_tbl : false;
        }


        /**
         * get all rows
         * @return bool
         */
        public function getAll()
        {
            if (empty($this->_tbl)) return false;
            $query = $this->db->order_by('id', 'ASC')->get($this->_tbl);
            return $query->result();
        }

        /**
         * get row by id
         * @param int $id
         * @return bool
         */
        public function getById($id = 0)
        {
            if (empty($this->_tbl)) return false;
            $query = $this->db->select('*')->from($this->_tbl)
                ->where('id', $id)
                ->limit(1)
                ->get();
            return $query->row();
        }

        /**
         * count all rows
         * @return bool
         */
        public function countAll()
        {
            return  !(empty($this->_tbl))? $this->db->count_all_results($this->_tbl) : false;
        }
    }
}