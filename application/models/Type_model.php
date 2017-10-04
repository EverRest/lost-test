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
     * @param int $id
     * @return string
     */
    public function getTypeById( $id = 0 )
    {
        $res = $this->db->query("SELECT name AS type  
                                  FROM types
                                  WHERE id= " . $this->db->escape_str($id) . "
                                  LIMIT 1
                                  ")->row();
        return $res->type;
    }

    /**
     * @param string $type
     * @return int
     */
    public function geIdByType( $type = '' )
    {
        $res = $this->db->query("SELECT id AS type_id  
                                  FROM types
                                  WHERE name= '" . $this->db->escape_str($type) . "'
                                  LIMIT 1
                                  ")->row();

        return $res->type_id;
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