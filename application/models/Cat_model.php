<?php
include_once APPPATH . 'models/Animal_Base.php';

class Cat_model extends Animal_Base
{
    /**
     * Cat_model constructor.
     */
    public function __construct()
    {
        parent::__construct('cat', 2);
    }

}