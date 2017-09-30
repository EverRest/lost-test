<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller
{

    /**
     * App constructor.
     * return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Animal_model', 'animal');
        $this->load->model('Dog_model', 'dog');
        $this->load->model('Cat_model', 'cat');
        $this->load->model('Parrot_model', 'parrot');
    }
    
	/**
	 * Index Page for this controller.
     * return void
	 */
	public function index()
	{
        $this->load->helper('url');

		$this->load->view('partials/head');
		$this->load->view('partials/header');
		$this->load->view('lost/list');
		$this->load->view('partials/footer');
		$this->load->view('partials/scripts');
	}

    /**
     * store animal to db
     * return json
     */
    public function save()
    {
        if (!empty($_POST))
        {

            $response = array(
                'success' => true,
                'errors' => 0,
                'messages' => array(),
            );
            $post = array();
            // XSS cleaning the $_POST
            $this->load->helper("security");

            $post['name'] = $this->security->xss_clean($_POST['name']);
            $post['additional'] = $this->security->xss_clean($_POST['additional']);
            $post['type'] = $this->security->xss_clean($_POST['type']);
            $post['lat'] = $this->security->xss_clean($_POST['lat']);
            $post['lng'] = $this->security->xss_clean($_POST['lng']);
            $post['photo'] = $_POST['photo'];


            if (empty($post['name']))
            {
                $response['success'] = false;
                $response['errors']++;
                $response['messages'][] = 'name';
            }

            if (empty($post['additional']))
            {
                $response['success'] = false;
                $response['errors']++;
                $response['messages'][] = 'additional';
            }

            if (empty($post['type']))
            {
                $response['success'] = false;
                $response['errors']++;
                $response['messages'][] = 'type';
            }

            if (empty($post['lat']))
            {
                $response['success'] = false;
                $response['errors']++;
                $response['messages'][] = 'lat';
            }

            if (empty($post['photo']))
            {
                $response['success'] = false;
                $response['errors']++;
                $response['messages'][] = 'photo';
            }

            if ($response['success'])
            {
                $animal = $this->animal->store($post);
                echo json_encode($response);
            }

        }
	}

    /**
     * upload photos
     * return void
     */
    public function upload()
    {
        $response = array(
            'success' => true,
            'errors' => 0,
            'messages' => false,
            'src' => ''
        );

        $response['src'] = $this->animal->upload();
        if(empty($response['src'])) $response['success'] = false; $response['errors']++;
        
        echo json_encode($response);
	}

    /**
     * get info about all animals
     * return void
     */
    public function getData()
    {
        $res = $this->animal->getData();
        echo json_encode($res);
	}

    public function searchByText()
    {
        $response = array(
            'success' => true,
            'errors' => 0,
            'messages' => false,
            'result' => false
        );

        $search = '';
        $result = false;

        if(empty($_GET['search'])) {
            $response['success'] = false;
            $response['errors']++;
        }

        if ($response['success'] && $response['errors'] == 0)
        {
            // XSS cleaning the $_GET
            $this->load->helper("security");
            $search = $this->security->xss_clean($_GET['search']);

            $result = $this->animal->searchByText($search);
            $response['result'] = $result;
        }

        echo json_encode($response);
    }
}
