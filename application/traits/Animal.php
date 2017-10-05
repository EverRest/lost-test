<?php

if (!trait_exists('Animal')) {

    trait Animal
    {
        /**
         * @param string $type
         * @param int $animal_id
         * @param string $additional
         * @return mixed
         */
        public function saveAnimal($type = '', $animal_id = 0, $additional = '')
        {
            $tbl = $type . 's';

            $this->db->insert($tbl, array('info' => $additional));
            $id = $this->db->insert_id();
            $this->db->insert('animals_' . $tbl, array('animal_id' => $animal_id, 'id' => $id));
            return $id;
        }

        /**
         * @param string $type
         * @return mixed
         */
        public function allTypicalAnimals($type = '')
        {
            $tbl = $type . 's';
            return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                  FROM " . $tbl .  " t1
                                  INNER JOIN animals_" . $tbl ." t2 ON t1.id = t2.id
                                  INNER JOIN animals t3 ON t2.animal_id=t3.id
                                  INNER JOIN types t4 ON t4.id=t3.type_id
                                  ORDER BY t3.id ASC
                                  ")->result();
        }

        /**
         * @param string $type
         * @param string $str
         * @return mixed
         */
        public function searchText( $type = '', $str = '')
        {
            $tbl = $type . 's';
            return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                      FROM " . $tbl .  "  AS t1
                                      INNER JOIN animals_" . $tbl .  "  AS t2 ON t1.id = t2.id
                                      INNER JOIN animals AS t3 ON t2.animal_id=t3.id
                                      INNER JOIN types AS t4 ON t4.id=t3.type_id
                                      WHERE t3.name LIKE '%" . $this->db->escape_str($str) . "%'
                                      OR t1.info LIKE '%" . $this->db->escape_str($str) . "%' 
                                      ORDER BY t3.id ASC
                                      LIMIT 10
                                      ")->result();
        }

        /**
         * @param string $type
         * @param array $coords
         * @param int $radius
         * @return mixed
         */
        public function searchRadius($type = '', $coords = array(), $radius = 0)
        {
            $tbl = $type . 's';
            return  $this->db->query("SELECT t3.*,
                                    ( 3959 * acos( cos( radians( " . $coords['lat']
                                    . " ) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians("
                                    . $coords['lng'] . ") ) + sin( radians(" . $coords['lat']
                                    . ") ) * sin( radians( lat ) ) ) ) AS distance,
                                    " . $radius . " AS radius,  t1.info, t4.name AS type 
                                    FROM animals AS t3
                                    INNER JOIN animals_" . $tbl .  "  AS t2 ON t3.id = t2.animal_id
                                    INNER JOIN " . $tbl . " AS t1 ON t2.id=t1.id
                                    INNER JOIN types AS t4 ON t4.id=t3.type_id
                                    HAVING distance < " . $radius . "
                                    ORDER BY distance
                                    ")->result();
        }

        /**
         * @param string $type
         * @param array $poly
         * @return mixed
         */
        public function searchPoly($type = '', $poly = array())
        {
            $lat = array();
            $lng = array();
            $tbl = $type . 's';

            if($poly['ne']['lat'] > $poly['sw']['lat'])
            {
                $lat['min'] = $poly['sw']['lat'];
                $lat['max'] = $poly['ne']['lat'];
            } else {
                $lat['max'] = $poly['sw']['lat'];
                $lat['min'] = $poly['ne']['lat'];
            }


            if($poly['ne']['lng'] > $poly['sw']['lng'])
            {
                $lng['min'] = $poly['sw']['lng'];
                $lng['max'] = $poly['ne']['lng'];
            } else {
                $lng['max'] = $poly['sw']['lng'];
                $lng['min'] = $poly['ne']['lng'];
            }

            return $this->db->query("SELECT t3.*, t1.info, t4.name AS type " .
                                    "FROM animals AS t3
                                    INNER JOIN animals_" . $tbl . " AS t2 ON t3.id = t2.animal_id
                                    INNER JOIN " . $tbl . " AS t1 ON t2.id=t1.id
                                    INNER JOIN types AS t4 ON t4.id=t3.type_id
                                    WHERE type_id=" . $this->type_id . " AND " .
                                    "(lat BETWEEN " . $lat['min'] . " AND " . $lat['max'] . ") AND " .
                                    "(lng BETWEEN " . $lng['min'] . " AND " . $lng['max'] . ") 
                                    ORDER BY id ASC")->result();
        }
    }
}