var App = (function () {

    var app,
        $this = this,
        map = {},
        lost = {},
        marker,
        infowindow = {},
        markers = [],
        URL = $('main').data('url');

    function App() {
        if (!app) {
            app = this;
        } else {
            return app;
        }
    }

    /**
     * render lost form, address search input, button to adding lost pet
     * return void
     */
    App.prototype.renderForm = function () {
        var modal = '<div id="lostModal" class="modal fade" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Add Lost Friend</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<form id="modalForm" method="POST" enctype="multipart/form-data" class="form-horizontal">' +
                    '<div class="form-group">' +
                    '<label class="control-label col-sm-2" for="name">Name:</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" name="name" class="form-control" id="name" placeholder="Enter name">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label class="control-label col-sm-2" for="sel1">Type:</label>' +
                    '<div class="col-sm-10">' +
                    '<select name="type" id="type" class="select form-control" required>' +
                    '<option disabled selected value="default">check type</option>' +
                    '<option value="dog">dog</option>' +
                    '<option value="cat">cat</option>' +
                    '<option value="parrot">parrot</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '<div action="' + URL + 'index.php/app/upload" class="dz-container dropzone">' +
                    '</div>' +
                    '<button type="submit" class="btn btn-lg btn-info center-block form-btn">Find!</button>' +
                    '</form>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '</div>',

                btn = '<button type="button" class="btn btn-success btn-lg btn-add"' +
                        ' data-toggle="modal" data-target="#lostModal"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>',
                search = '<input name="map-search" id="map-search" class="controls col-sm-4" type="text" placeholder="Enter an address...">';

        $('.map').append(btn).append(search);
        $('body').append(modal);
        // $('dz-container').addClass('dropzone');

    };

    // render map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        styles: [
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": -100
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": 100
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": 100
                    },
                    {
                        "hue": "#006eff"
                    },
                    {
                        "lightness": -19
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#2bff00"
                    },
                    {
                        "lightness": -39
                    },
                    {
                        "saturation": 8
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    }
                ]
            }
        ],
        zoom: 8
    });

    /**
     * get all server data
     * return void
     */
    App.prototype.getData = function () {
        $.ajax({
            url: URL + 'index.php/app/getData',
            success: function (res) {
                addMarkers(res);
            },
            dataType: 'json',
            error: function (XHR, status, response) {
                console.log(XHR);
            }
        });
    };

    /**
     * render additional fields to lost form
     * return void
     */
    App.prototype.renderFields = function () {

        $(document).on('change', '#type', function () {

            var type = this.value,
                fields = '';

            switch (type) {

                case 'dog':

                    fields += '<div class="form-group additional"><label class="control-label col-sm-2" for="additional">Sort:</label>' +
                                '<div class="col-sm-10">' +
                                '<input id="additional" type="text" name="additional" class="form-control" placeholder="Enter sort">' +
                                '</div></div>';
                    break;

                case 'cat':

                    fields += '<div class="form-group additional"><label class="control-label col-sm-2" for="additional">Color:</label>' +
                                '<div class="col-sm-10">' +
                                '<input id="additional" type="text" name="additional" class="form-control" placeholder="Enter color">' +
                                '</div></div>';
                    break;

                case 'parrot':

                    fields += '<div class="form-group additional">' +
                                '<label class="control-label col-sm-2" for="talk">Talk:</label>' +
                                '<div class="col-sm-10">' +
                                '<select name="additional" id="additional" class="select form-control">' +
                                '<option value="1">Yes</option>' +
                                '<option value="0">No</option>' +
                                '</select>' +
                                '</div>' +
                                '</div>';
                    break;

                case 'default':

                    alert( 'Please choose the type!!!' );

            }

            $('.additional').remove();
            $('.modal-body').find('.btn').before(fields);
        });

    };

    /**
     * grab data from form
     * return void
     */
    App.prototype.getFormData = function () {
        var mess = '<h3 class="form-msg">Choose a place on the map where you lost your friend!</h3>';

        $(document).on('click', '.form-btn', function () {
            lost.name = $('#name').val();
            lost.type = $('#type').val();
            lost.photo = $('.dz-image').find('img').attr('alt');
            lost.additional = $('#additional').val();

            if (lost.name && lost.type && lost.additional && lost.photo) {
                $('#name').val('');
                $('#additional').val('');

                $('#lostModal').find('.modal-header').append(mess);

                setTimeout(function () {
                    $('.form-msg').remove();
                    $('#lostModal').find('.close').click();
                    addMarkerEvent();

                    var issetData = setInterval(function () {
                        if(marker && lost.name && lost.type && lost.additional && lost.photo) {
                            lost.lat = marker.position.lat();
                            lost.lng = marker.position.lng();

                            save(lost);

                        clearInterval(issetData);
                        }
                    }, 3500);
                }, 2500);

            } else {
                alert('Please fill all fields!!!')
            }

            return false;
        });

    };

    /**
     * save new animal
     * @param mixed
     * return void
     */
    function save( lost ) {

        $.ajax({
            url: URL + 'index.php/app/save',
            type: "POST",
            data: lost,
            success: function (data) {
                console.log(data);
            },
            dataType: 'json'
        });
    }

    /**
     * add map marker event
     * return void
     */
    function addMarkerEvent() {

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
            if (marker) marker.setMap(null);
            addMarker(event.latLng, map);
        });

        // Adds a marker to the map.
        function addMarker(location, map) {
            marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: 'img/marker.png',
                draggable: true
            });
        }

    }

    /**
     * search autocomplete
     * return void
     */
    App.prototype.searchAutocomplete =   function () {
        var input = document.getElementById('map-search'),
            autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener('place_changed', function() {

            var place = autocomplete.getPlace();

            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

        });
    };

  function addMarkers( markers ) {

      var item = false;

      for (i = 0; i < markers.length; i++) {
          item = markers[i];

          contentString = '<div class="info-window" data-id=' + markers + '>'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
              'sandstone rock formation in the southern part of the '+
              'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
              'south west of the nearest large town, Alice Springs; 450&#160;km '+
              '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
              'features of the Uluru - Kata Tjuta National Park. Uluru is '+
              'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
              'Aboriginal people of the area. It has many springs, waterholes, '+
              'rock caves and ancient paintings. Uluru is listed as a World '+
              'Heritage Site.</p>'+
              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
              '(last visited June 22, 2009).</p>'+
              '</div>'+
              '</div>';

          infowindow = new google.maps.InfoWindow({
              content: contentString
          });

          markers[i] = new google.maps.Marker({
                      position: {
                          lat: 1 * item.lat,
                          lng: 1 * item.lng
                      },
                      map: map,
                      icon: 'img/marker.png'
            });

          markers[i].addListener('click', function() {
                  infowindow.open(map, markers[i]);
              });
          }

      }

    return App;
})();


