<?php
include APPPATH . 'traits/Animal.php';

class Cat_model extends CI_Model {

    use Animal;

    private $id;
    private $type;
    private $type_id;
    private $additional;

    /**
     * Cat_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->type = 'cat';
        $this->type_id = 2;
        $this->tbl2animals = 'animals_cats';
    }

    /**
     * @param int $animal_id
     * @param string $additional
     * @return mixed
     */
    public function saveInfo($animal_id = 0, $additional = '')
    {
        return $this->saveAnimal($this->type, $animal_id, $additional);
    }

    /**
     * @return mixed
     */
    public function all()
    {
        return $this->allTypicalAnimals($this->type);
    }

    /**
     * @param string $str
     * @return mixed
     */
    public function searchByText( $str = '')
    {
        return $this->searchText($this->type, $str);
    }


    /**
     * @param array $coords
     * @param int $radius
     * @return mixed
     */
    public function searchByRadius($coords = array(), $radius = 0)
    {
        return $this->searchRadius($this->type, $coords, $radius);
    }

    /**
     * @param array $poly_arr
     * @return mixed
     */
    public function searchByPoly($poly = array())
    {
        return $this->searchPoly($this->type, $poly);
    }
}