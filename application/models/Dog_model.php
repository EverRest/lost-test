<?php

class Dog_model extends CI_Model {

    private $id;
    private $tbl;
    private $tbl2animals;
    private $additional;

    /**
     * Dog_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->tbl = 'dogs';
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
}