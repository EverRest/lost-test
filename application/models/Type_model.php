<?php

class Type_model extends CI_Model {

    private $id;
    private $name;

    /**
     * Type_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param integer $id
     * @return mixed
     */
    public function getById( $id = 0 )
    {
        return $this->db->query("SELECT name AS type  
                                  FROM types
                                  WHERE id= " . $this->db->escape_str($id) . "
                                  LIMIT 1
                                  ")->result();
    }

    /**
     * @return mixed
     */
    public function all()
    {
        return $this->db->query("SELECT *  
                                  FROM types
                                  ORDER BY id ASC
                                  ")->result();
    }

}