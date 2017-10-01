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

    /**
     * store info about animal
     * @param array $lost
     * @return array
     */
    public function store( $lost = array() )
    {

        $data = array();

        $data['name'] = $lost['name'];

        if ($lost['type'] === 'dog') {
            $data['type_id'] = 1;
        } elseif ($lost['type'] === 'cat') {
            $data['type_id'] = 2;
        } else {
            $data['type_id'] = 3;
        }

        $data['photo'] = 'uploads/animals/' . $lost['photo'];
        $data['lat'] = $lost['lat'];
        $data['lng'] = $lost['lng'];

        $this->db->insert('animals', $data);
        $data['id'] = $this->db->insert_id();


        $this->db->insert($lost['type'] . 's', array('info' => $lost['additional']));
        $data[$lost['type'].'_id'] = $this->db->insert_id();

        $this->db->insert('animals_' . $lost['type'] . 's', array('animal_id' => $data['id'], 'id' => $data[$lost['type'].'_id']));

        return $data;
    }


    /**
     * get additional info to animal
     * @param bool $type_id
     * @return string
     */
    private function getAdditional ($type_id = false)
    {
        if ($type_id === 1) return 'sort';
        if ($type_id === 2) return 'color';
        if ($type_id === 3) return 'talk';
    }

    /**
     * @param int $type_id
     * @return string
     */
    private function getType ($type_id = 0)
    {
        if ($type_id == 1) return 'dog';
        if ($type_id == 2) return 'cat';
        if ($type_id == 3) return 'parrot';
    }

    /**
     * @return mixed
     */
    public function getData()
    {

        $query = $this->db->get('animals');
        $animals = $query->result();

        foreach ($animals as $key => $row) {
            if ($row->id > 0) {

                $additional = $this->getAdditional($row->type_id);
                $type = $this->getType($row->type_id);


                $row->additional = $this->db->query("SELECT t2.info 
                                      FROM animals_" . $type . "s t1
                                      LEFT JOIN " . $type . "s t2 ON t1.id = t2.id
                                      WHERE t1.animal_id=" . $row->id ."
                                      LIMIT 1
                                      ")->result();


                $this->db->select('name');
                $this->db->from('types');
                $this->db->where('id', $row->type_id);
                $this->db->limit(1);
                $query = $this->db->get();

                $row->type = $query->result()[0];

            }
        }

        return $animals;

    }

    /**
     * @param string $str
     * @return mixed
     */
    public function searchByText( $str = '')
    {
        $animals = $this->db->query("SELECT * FROM animals WHERE name LIKE '%$str%'")->result();

        foreach ($animals as $key => $row) {
            if ($row->id > 0) {
                $additional = $this->getAdditional($row->type_id);
                $type = $this->getType($row->type_id);

                $row->additional = $this->db->query("SELECT t2.info 
                                      FROM animals_" . $type . "s t1
                                      LEFT JOIN " . $type . "s t2 ON t1.id = t2.id
                                      WHERE t1.animal_id=" . $row->id ."
                                      LIMIT 1
                                      ")->result();

                $this->db->select('name');
                $this->db->from('types');
                $this->db->where('id', $row->type_id);
                $this->db->limit(1);
                $query = $this->db->get();
                $row->type = $query->result()[0];

            }
        }
                return $animals;
    }
}