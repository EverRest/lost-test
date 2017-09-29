<?php

class Dog_model extends CI_Model {

    private $id;
    private $additional;

    /**
     * Animal_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function store( $additional = '' )
    {
        $this->additional = $additional;
        $this->db->insert('dogs', array('additional' => $additional));
        $this->id = $this->db->insert_id();

        return $this->db->insert_id();
    }

}