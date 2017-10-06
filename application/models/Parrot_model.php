<?php
include_once APPPATH . 'models/Animal_Base.php';

class Parrot_model extends Animal_Base
{
    /**
     * Parrot_model constructor.
     */
    public function __construct()
    {
        parent::__construct('parrot', 3);
    }

}