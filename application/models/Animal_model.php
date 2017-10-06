<?php
include_once APPPATH . 'traits/Model.php';

class Animal_model extends CI_Model
{
    use Model;

    private $id;
    private $name;
    private $type_id;
    private $types;
    private $animals = array();
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
        $this->types = $this->type->allTypes();

        foreach ($this->types as $value => $type)
        {
            $model = ucfirst($type->name) . '_model';
            $this->load->model($model, $type->name);
            $this->animals[] = $type->name;
        }

        $this->setTbl('animals');
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
        $data['type_id'] = $this->type->geIdByType($lost['type']);

        $data['photo'] = 'uploads/animals/' . $lost['photo'];
        $data['lat'] = $lost['lat'];
        $data['lng'] = $lost['lng'];

        // save animal
        $this->db->insert('animals', $data);
        $data['id'] = $this->db->insert_id();

        // save additional info
        if ($lost['type'] === 'dog') {
            $data['info_id'] = $this->dog->saveInfo($data['id'], $lost['info']);
        } elseif ($lost['type'] === 'cat') {
            $data['info_id'] = $this->cat->saveInfo($data['id'], $lost['info']);
        } else {
            $data['info_id'] = $this->parrot->saveInfo($data['id'], $lost['info']);
        }

        return $data;
    }

    /**
     * @param string $str
     * @return mixed
     */
    public function searchByText( $str = '')
    {
        $res = array();

        foreach ($this->animals as $animal) {
            $tmp = $this->$animal->searchByText($str);
            $res = (empty($res))? $tmp : array_merge($res, $tmp);
        }
        return $res;
    }

    /**
     * @return array
     */
    public function getAll()
    {
        $res = array();

        foreach ($this->animals as $animal) {
            $tmp = $this->$animal->all();
            $res = (empty($res))? $tmp : array_merge($res, $tmp);
        }

        return $res;
    }

    /**
     * @param array $coords
     * @param int $radius
     * @return mixed
     */
    public function searchByRadius($coords = array(), $radius = 0)
    {
        $res = array();

        foreach ($this->animals as $animal) {
            $tmp = $this->$animal->searchByRadius($coords, $radius);
            $res = (empty($res))? $tmp : array_merge($res, $tmp);
        }

        return $res;
    }


    /**
     * @param array $poly
     * @return array
     */
    public function searchByPoly($poly = array())
    {

        $res = array();

        foreach ($this->animals as $animal) {
            $tmp = $this->$animal->searchByPoly($poly);
            $res = (empty($res))? $tmp : array_merge($res, $tmp);
        }

        return $res;
    }

}