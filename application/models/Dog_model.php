<?php

class Dog_model extends CI_Model {

    private $id;
    private $tbl;
    private $type;
    private $type_id;
    private $tbl2animals;
    private $additional;

    /**
     * Dog_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->tbl = 'dogs';
        $this->type = 'dog';
        $this->type_id = 1;
        $this->tbl2animals = 'animals_dogs';
    }

    /**
     * @param int $animal_id
     * @param string $additional
     * @return mixed
     */
    public function saveInfo($animal_id = 0, $additional = '')
    {
        $this->db->insert('dogs', array('info' => $additional));
        $id = $this->db->insert_id();
        $this->db->insert('animals_dogs', array('animal_id' => $animal_id, 'id' => $id));

        return $id;
    }

    /**
     * @return mixed
     */
    public function all()
    {
        return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                      FROM dogs AS t1
                                      INNER JOIN animals_dogs AS t2 ON t1.id = t2.id
                                      INNER JOIN animals AS t3 ON t2.animal_id=t3.id
                                      INNER JOIN types AS t4 ON t4.id=t3.type_id
                                      ORDER BY t3.id ASC
                                      ")->result();
    }

    /**
     * @param string $str
     * @return mixed
     */
    public function searchByText( $str = '')
    {
        return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                      FROM dogs AS t1
                                      INNER JOIN animals_dogs AS t2 ON t1.id = t2.id
                                      INNER JOIN animals AS t3 ON t2.animal_id=t3.id
                                      INNER JOIN types AS t4 ON t4.id=t3.type_id
                                      WHERE t3.name LIKE '%" . $this->db->escape_str($str) . "%'
                                      OR t1.info LIKE '%" . $this->db->escape_str($str) . "%' 
                                      ORDER BY t3.id ASC
                                      ")->result();
    }

    /**
     * @param array $coords
     * @param int $radius
     * @return mixed
     */
    public function searchByRadius($coords = array(), $radius = 0)
    {
        $animals = $this->db->query("SELECT t3.*, 
                                ( 3959 * acos( cos( radians( " . $coords['lat']
                                . " ) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians("
                                . $coords['lng'] . ") ) + sin( radians(" . $coords['lat']
                                . ") ) * sin( radians( lat ) ) ) ) AS distance,
                                " . $radius . " AS radius 
                                FROM animals AS t3
                                WHERE t3.type_id=" . $this->type_id . "
                                HAVING distance < " . $radius . "
                                ORDER BY distance LIMIT 0 , 10
                                ")->result();


        foreach ($animals as $key => $row) {
            if ($row->id > 0) {

                $row->additional = $this->db->query("SELECT t2.info 
                                      FROM animals_" . $this->type . "s t1
                                      LEFT JOIN " . $this->type . "s t2 ON t1.id = t2.id
                                      WHERE t1.animal_id=" . $row->id ."
                                      LIMIT 1
                                      ")->row();

                $row->type = $this->type;

            }
        }

        return $animals;
    }

    /**
     * @param array $poly_arr
     * @return mixed
     */
    public function searchByPoly($poly = array())
    {
        $lat = array();
        $lng = array();

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
                                INNER JOIN animals_dogs AS t2 ON t3.id = t2.animal_id
                                INNER JOIN dogs AS t1 ON t2.id=t1.id
                                INNER JOIN types AS t4 ON t4.id=t3.type_id
                                WHERE type_id=" . $this->type_id . " AND " .
                                "(lat BETWEEN " . $this->db->escape_str($lat['min']) . " AND " . $this->db->escape_str($lat['max']) . ") AND " .
                                "(lng BETWEEN " . $this->db->escape_str($lng['min']) . " AND " . $this->db->escape_str($lng['max']) . ") 
                                ORDER BY id ASC")->result();
    }
}