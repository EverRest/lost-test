<?php

class Animal_model extends CI_Model {

    private $id;
    private $name;
    private $type_id;
    private $photo;
    private $lat;
    private $lng;

    /**
     * Animal_model constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Type_model', 'type');
        $this->load->model('Dog_model', 'dog');
        $this->load->model('Cat_model', 'cat');
        $this->load->model('Parrot_model', 'parrot');
    }

    /**
     * upload photo
     * @param string $name
     * @return bool|string
     */
    public function upload($name = '')
    {

        $storeFolder = 'uploads/animals/';

        if (!empty($_FILES)) {

            $tempFile = $_FILES['file']['tmp_name'];
            $fileName = $_FILES['file']['name'];
            $targetFile =  $storeFolder . $fileName;

            move_uploaded_file($tempFile,$targetFile);

            return $targetFile;

        }

        return false;
    }

//
//    /**
//     * @param array $poly_arr
//     * @return mixed
//     */
//    public function searchByPoly($poly = array())
//    {
//
//        $lat = array();
//        $lng = array();
//
//        if($poly['ne']['lat'] > $poly['sw']['lat'])
//        {
//            $lat['min'] = $poly['sw']['lat'];
//            $lat['max'] = $poly['ne']['lat'];
//        } else {
//            $lat['max'] = $poly['sw']['lat'];
//            $lat['min'] = $poly['ne']['lat'];
//        }
//
//
//        if($poly['ne']['lng'] > $poly['sw']['lng'])
//        {
//            $lng['min'] = $poly['sw']['lng'];
//            $lng['max'] = $poly['ne']['lng'];
//        } else {
//            $lng['max'] = $poly['sw']['lng'];
//            $lng['min'] = $poly['ne']['lng'];
//        }
//
//
//        $animals = $this->db->query("SELECT * " .
//                                    "FROM animals WHERE " .
//                                    "(lat BETWEEN " . $this->db->escape_str($lat['min']) . " AND " . $this->db->escape_str($lat['max']) . ") AND " .
//                                    "(lng BETWEEN " . $this->db->escape_str($lng['min']) . " AND " . $this->db->escape_str($lng['max']) . ") ORDER BY id ASC")->result();
//
//
//        foreach ($animals as $key => $row) {
//            if ($row->id > 0) {
//
//                $additional = $this->getAdditional($row->type_id);
//                $type = $this->getType($row->type_id);
//
//
//                $row->additional = $this->db->query("SELECT t2.info
//                                      FROM animals_" . $type . "s t1
//                                      LEFT JOIN " . $type . "s t2 ON t1.id = t2.id
//                                      WHERE t1.animal_id=" . $row->id ."
//                                      LIMIT 1
//                                      ")->result();
//
//
//                $this->db->select('name');
//                $this->db->from('types');
//                $this->db->where('id', $row->type_id);
//                $this->db->limit(1);
//                $query = $this->db->get();
//
//                $row->type = $query->result();
//
//            }
//        }
//        return $animals;
//    }

    /**
     * store info about animal
     * @param array $lost
     * @return array
     */
    public function store( $lost = array() )
    {

        $data = array();

        $data['name'] = $lost['name'];
        $data['type_id'] = $this->type->geIdByType($lost['type']);

        $data['photo'] = 'uploads/animals/' . $lost['photo'];
        $data['lat'] = $lost['lat'];
        $data['lng'] = $lost['lng'];

        // save animal
        $this->db->insert('animals', $data);
        $data['id'] = $this->db->insert_id();

        // save additional info
        if ($lost['type'] === 'dog') {
            $data['info_id'] = $this->dog->saveInfo($data['id'], $lost['additional']);
        } elseif ($lost['type'] === 'cat') {
            $data['info_id'] = $this->cat->saveInfo($data['id'], $lost['additional']);
        } else {
            $data['info_id'] = $this->parrot->saveInfo($data['id'], $lost['additional']);
        }

        return $data;
    }

    /**
     * @param string $str
     * @return mixed
     */
    public function searchByText( $str = '')
    {

        $dogs = $this->dog->searchByText($str);
        $cats = $this->cat->searchByText($str);
        $parrots = $this->parrot->searchByText($str);

        return array_merge($dogs,$cats,$parrots);
    }

    /**
     * @return array
     */
    public function getAll()
    {
        $dogs = $this->dog->all();
        $cats = $this->cat->all();
        $parrots = $this->parrot->all();

        return array_merge($dogs,$cats,$parrots);
    }

    /**
     * @param array $coords
     * @param int $radius
     * @return mixed
     */
    public function searchByRadius($coords = array(), $radius = 0)
    {
        $dogs = $this->dog->searchByRadius( $coords, $radius);
        $cats = $this->cat->searchByRadius( $coords, $radius);
        $parrots = $this->parrot->searchByRadius( $coords, $radius);

        return array_merge($dogs,$cats,$parrots);
    }


    /**
     * @param array $poly
     * @return array
     */
    public function searchByPoly($poly = array())
    {
        $dogs = $this->dog->searchByPoly($poly);
        $cats = $this->cat->searchByPoly($poly);
        $parrots = $this->parrot->searchByPoly($poly);


        return array_merge($dogs, $cats, $parrots);
    }

}