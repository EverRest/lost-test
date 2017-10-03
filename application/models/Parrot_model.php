<?php

class Parrot_model extends CI_Model {

    private $id;
    private $additional;

    /**
     * Animal_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param string $additional
     * @return mixed
     */
    public function store( $additional = '' )
    {
        $this->additional = $additional;
        $this->db->insert('parrots', array('additional' => $additional));
        $this->id = $this->db->insert_id();

        return $this->db->insert_id();
    }

    /**
     * @return mixed
     */
    public function all()
    {
        return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                      FROM parrots AS t1
                                      INNER JOIN animals_parrots AS t2 ON t1.id = t2.id
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
                                      FROM parrots AS t1
                                      INNER JOIN animals_parrots AS t2 ON t1.id = t2.id
                                      INNER JOIN animals AS t3 ON t2.animal_id=t3.id
                                      INNER JOIN types AS t4 ON t4.id=t3.type_id
                                      WHERE t3.name LIKE '%" . $this->db->escape_str($str) . "%'
                                      ORDER BY t3.id ASC
                                      ")->result();
    }
}