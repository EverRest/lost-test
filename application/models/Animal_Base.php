<?php
//include_once APPPATH . 'traits/Model.php';
class Animal_Base extends CI_Model
{
//    use Animal;

    private $id;
    private $type;
    private $tbl;
    private $type_id;
    private $additional;

    /**
     * Animal_Base constructor.
     * @param string $type
     * @param int $type_id
     */
    public function __construct($type = '', $type_id = 0)
    {
        parent::__construct();
        $this->type = $type;
        $this->type_id = $type_id;
        $this->tbl = $this->type . 's';
    }

    /**
     * @param int $animal_id
     * @param string $additional
     * @return mixed
     */
    public function saveInfo($animal_id = 0, $additional = '')
    {
        $this->additional = $additional;
        $this->db->insert($this->tbl, array('info' => $additional));
        $id = $this->db->insert_id();
        $this->db->insert('animals_' . $this->tbl, array('animal_id' => $animal_id, 'id' => $id));
        $this->id = $id;

        return $id;
    }

    /**
     * @return mixed
     */
    public function all()
    {
        return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                  FROM " . $this->tbl .  " t1
                                  INNER JOIN animals_" . $this->tbl ." t2 ON t1.id = t2.id
                                  INNER JOIN animals t3 ON t2.animal_id=t3.id
                                  INNER JOIN types t4 ON t4.id=t3.type_id
                                  ORDER BY t3.id ASC
                                  ")->result();
    }

    /**
     * @param string $str
     * @return mixed
     */
    public function searchByText( $str = '')
    {
        return $this->db->query("SELECT t3.*, t1.info, t4.name AS type  
                                      FROM " . $this->tbl .  "  AS t1
                                      INNER JOIN animals_" . $this->tbl .  "  AS t2 ON t1.id = t2.id
                                      INNER JOIN animals AS t3 ON t2.animal_id=t3.id
                                      INNER JOIN types AS t4 ON t4.id=t3.type_id
                                      WHERE t3.name LIKE '%" . $this->db->escape_str($str) . "%'
                                      OR t1.info LIKE '%" . $this->db->escape_str($str) . "%' 
                                      ORDER BY t3.id ASC
                                      LIMIT 10
                                      ")->result();
    }

    /**
     * @param array $coords
     * @param int $radius
     * @return mixed
     */
    public function searchByRadius($coords = array(), $radius = 0)
    {
        return  $this->db->query("SELECT t3.*,
                                    ( 3959 * acos( cos( radians( " . $coords['lat']
            . " ) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians("
            . $coords['lng'] . ") ) + sin( radians(" . $coords['lat']
            . ") ) * sin( radians( lat ) ) ) ) AS distance,
                                    " . $radius . " AS radius,  t1.info, t4.name AS type 
                                    FROM animals AS t3
                                    INNER JOIN animals_" . $this->tbl .  "  AS t2 ON t3.id = t2.animal_id
                                    INNER JOIN " . $this->tbl . " AS t1 ON t2.id=t1.id
                                    INNER JOIN types AS t4 ON t4.id=t3.type_id
                                    HAVING distance < " . $radius . "
                                    ORDER BY distance
                                    ")->result();
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

        return $this->db->query("SELECT t3.*, t1.info, t4.name AS type " .
            "FROM animals AS t3
                                    INNER JOIN animals_" . $this->tbl . " AS t2 ON t3.id = t2.animal_id
                                    INNER JOIN " . $this->tbl . " AS t1 ON t2.id=t1.id
                                    INNER JOIN types AS t4 ON t4.id=t3.type_id
                                    WHERE type_id=" . $this->type_id . " AND " .
            "(lat BETWEEN " . $lat['min'] . " AND " . $lat['max'] . ") AND " .
            "(lng BETWEEN " . $lng['min'] . " AND " . $lng['max'] . ") 
                                    ORDER BY id ASC")->result();
    }
}