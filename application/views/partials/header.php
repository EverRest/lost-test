<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<header>
    <nav class="navbar  navbar-inverse">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="<?= base_url('/') ;?>">Lost</a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <div class="row">
                            <div class="col-sm-6 search-wrapper">
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <button id="poligon" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-record" aria-hidden="true"></span></button>
                                    </div><!-- /btn-group -->
                                    <input id="search" name="search" type="text" class="form-control" aria-label="...">
                                    <div class="input-group-btn">
                                        <button id="search-btn" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Search</button>
                                    </div><!-- /btn-group -->
                                </div><!-- /input-group -->
                            </div><!-- /.col-lg-6 -->
                        </div><!-- /.row -->
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
</header>