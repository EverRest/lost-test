<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {


    public function __construct() {
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

    public function save()
    {
        if (!empty($_POST))
        {

            $response = array(
                'success' => true,
                'errors' => 0,
                'messages' => array(),
//                'src' => ''
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

                echo '<pre>';print_r($animal);exit;
            }

        }
	}

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

    public function getData()
    {
        $res = $this->animal->getData();
        echo json_encode($res);
	}
}
