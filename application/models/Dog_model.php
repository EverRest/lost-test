<?php
//include_once APPPATH . 'traits/Animal.php';
include_once APPPATH . 'models/Animal_Base.php';

class Dog_model extends Animal_Base
{
    /**
     * Dog_model constructor.
     */
    public function __construct()
    {
        parent::__construct('dog', 1);
    }

}