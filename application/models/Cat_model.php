<?php
include APPPATH . 'traits/Animal.php';

class Cat_model extends CI_Model {

    use Animal;

    private $id;
    private $tbl;
    private $type;
    private $type_id;
    private $tbl2animals;
    private $additional;

    /**
     * Cat_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->tbl = 'cats';
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


        return $this->searchPoly($this->type, $poly);
    }
}