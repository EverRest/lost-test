URL = $('main').data('url');

var App = (function () {

    var app,
        $this = this,
        rectangle,
        animals = [],
        map = {},
        lost = {},
        marker,
        infowindow = {},
        markers = [],
        // URL = $('main').data('url'),
        mapStyles = [
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
        ];

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
                        ' data-toggle="modal" data-target="#lostModal" data-tooltip="tooltip" title="Add New"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>',
                search = '<input name="map-search" id="map-search" class="controls col-sm-4" type="text" placeholder="Enter an address...">';

        $('.map').append(btn).append(search);
        $('body').append(modal);

        // addTooltips();
    };

    // render map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        styles: mapStyles,
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
                animals = addAnimals(res);
                addMarkers(animals);
            },
            dataType: 'json',
            error: function (XHR, status, response) {
                console.log(XHR);
                console.log(status);
            }
        });
    };

    /**
     * add animals to array
     * @param res
     * @returns {Array}
     */
    function addAnimals(res) {
        var animals = [];
        $(res).each(function (i) {
            var animal  = false;

            switch (this.type) {

                case 'dog':
                    animal = new Dog(this.id, this.name, this.type_id, this.photo, this.lat, this.lng, this.info, this.address);
                    break;

                case 'cat':
                    animal = new Cat(this.id, this.name, this.type_id, this.photo, this.lat, this.lng, this.info, this.address);
                    break;

                case 'parrot':
                    animal = new Parrot(this.id, this.name, this.type_id, this.photo, this.lat, this.lng, this.info, this.address);
                    break;

            }

            animals.push(animal);
        });

        return animals;
    }

    /**
     * get Info from backend
     * return void
     */
    getInfo = function () {
        $.ajax({
            url: URL + 'index.php/app/getData',
            success: function (res) {
                animals = addAnimals(res);
                addMarkers(animals);
            },
            dataType: 'json',
            error: function (XHR, status, response) {
                console.log(XHR);
                console.log(status);
            }
        });
    };

    /**
     * helper for tooltips
     * @param latLng
     * @param map
     * @returns {google.maps.Point}
     */
    function fromLatLngToPoint(latLng, map) {
        var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    }

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

            lostModal = $('#lostModal');

            if (lost.name && lost.type && lost.additional && lost.photo) {
                $('#name').val('');
                $('#additional').val('');
                $('#map-search').val('');

                lostModal.find('.modal-header').append(mess);
                lostModal.find('.modal-body').slideToggle('fast');

                setTimeout(function () {
                    addMarkerEvent();
                    $('.form-msg').remove();
                    lostModal.find('.modal-body').slideToggle('fast');
                    $('.dz-image-preview').remove();
                    $('.dz-default').show('fast');
                    $('#type').val('default');

                    lostModal.find('.close').click();

                    var issetData = setInterval(function () {
                        if(marker && lost.name && lost.type && lost.additional && lost.photo) {
                            lost.lat = marker.position.lat();
                            lost.lng = marker.position.lng();

                            save(lost);

                            $('#map').append('<div class="lost-success"><h2>Thank You! Saving the data...</h2></div>');
                            setTimeout(function () {
                                $('.lost-success').remove();
                            }, 3000);

                        clearInterval(issetData);
                        getInfo();
                        }
                    }, 3000);
                }, 2000);

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
        // console.log(getAddress( lost.lat, lost.lng));
        // var address = false;
        // address = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lost.lat +',' + lost.lng +'&key=AIzaSyCmzPGoH3jCuOIPnPrDY9_DmgFcTPW1lnY', function (data) {
        //     return data.results;
        // });
        // address = address.getAllResponseHeaders();
        // var parsed = JSON.parse(address);
        // console.log(address.response);
        // if(address.status != 'OK') console.log('Can not get address from coordinates!');

        // (address.results.length)? lost.address = address.results[0].formatted_address : 'No address';

        var geocoder = new google.maps.Geocoder(),
            location = { 'lat': 1*lost.lat, 'lng': 1*lost.lng },
            address = '';

        // use geocoder to find the adrress
        geocoder.geocode({ 'location': location }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                (results.length)? lost.address = results[0].formatted_address : '';
                var animal = new Animal(lost.name, lost.type, lost.photo, lost.lat, lost.lng, lost.additional, lost.address);
                animal.save(lost);
            }
        });
    }

    /**
     * add map marker event
     * return void
     */
    function addMarkerEvent() {

        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(infowindow, 'domready', function() {


            // Reference to the DIV which receives the contents of the infowindow using jQuery
            var iwOuter = $('.gm-style-iw');

            /* The DIV we want to change is above the .gm-style-iw DIV.
             * So, we use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
             */
            var iwBackground = iwOuter.prev();

            // Remove the background shadow DIV
            iwBackground.children(':nth-child(2)').css({'display' : 'none', 'background-color' : 'transparent'}).remove();

            // Remove the white background DIV
            iwBackground.children(':nth-child(4)').css({'display' : 'none', 'background-color' : 'transparent'}).remove();
            iwOuter.prev().css({'display' : 'none', 'background-color' : 'transparent'});
            $('#iw-container').parent('div').css({'overflow':'hidden'});

            // Taking advantage of the already established reference to
            // div .gm-style-iw with iwOuter variable.
            // You must set a new variable iwCloseBtn.
            // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
            // Is this div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.css({
                'opacity': '1', // by default the close button has an opacity of 0.7
                right: '50px', top: '0px' // button repositioning
            });

            // The API automatically applies 0.7 opacity to the button after the mouseout event.
            // This function reverses this event to the desired value.
            //   iwCloseBtn.mouseout(function(){
            //       $(this).css({opacity: '1'});
            //   });
        });

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
            if (marker) marker.setMap(null);
            addMarker(event.latLng, map);
        });

        // add a marker to the map.
        function addMarker(location, map) {

            marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: 'img/marker.png',
                draggable: true
            });

            $this.markers.push(marker);

            // add InfoWindow
            google.maps.event.addListener(marker, 'click', (function (marker, i) {

                if (!lost) alert('Error: Problem with input.');

                var str = '<div class="iw-title">'+
                            '<h3>' + lost.type.toUpperCase()  + '</h3>'+
                            '</div><div class="iw-main ' + lost.type + '-bg">'+
                            '<img class="lost-img" src="' + URL + 'uploads/animals/' + lost.photo +'" alt="' + lost.name +'">' +
                            '<p><span>Address: </span><span>( ' + lost.address  + ' )</span></p>' +
                            '<div class="iw-text"><p><span>Name: </span><stromg>' + lost.name.toUpperCase()  + '</stromg></p>' +
                            '<p><span>Sort: </span><span>' + lost.additional  + '</span></p>' +
                            '</div>'+
                            '</div>';

                var content = '<div id="iw-container" class="info-window" data-id="0">'+
                    str + '</div>';

                return function () {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }

            })(marker, i));
        }

    }

    /**
     * search by polygon
     * return void
     */
    App.prototype.searchByPolygon =   function () {
        $(document).on('click', '#polygon-btn', function () {
            var poly_array = [];

            hideMarkers(map, $this.markers);
            map.addListener('click', function (e) {

                var latLng = e.latLng,
                    bounds = new google.maps.LatLngBounds(
                        new google.maps.LatLng (latLng.lat(), latLng.lng()),
                        new google.maps.LatLng (latLng.lat() - 1, latLng.lng() + 2)
                    );

                // Define a rectangle and set its  editable property to true.
                rectangle = new google.maps.Rectangle({
                    bounds: bounds,
                    editable: true,
                    map: map
                });

                // Add an event listener on the rectangle.
                rectangle.addListener('bounds_changed', showNewRect);

            });

            $(document).on('click', '#polygon-btn', function () {
                bounds.setMap(null);
            });
        });
    };

    function showNewRect(event) {
        var ne = rectangle.getBounds().getNorthEast(),
            sw = rectangle.getBounds().getSouthWest(),
            data = [];

        data['lat'] = [ne.lat(),sw.lat()];
        data['lng'] = [ne.lng(),sw.lng()];


            var ne = {
                    'lat': ne.lat(),
                    'lng': ne.lng()
                    },
                sw = {
                    'lat': sw.lat(),
                    'lng': sw.lng()
                    };
            filterByPolygon(ne, sw);
    }


    /**
     * @param ne
     * @param sw
     */
    function filterByPolygon( ne, sw ) {

            $.ajax({
                url: URL + 'index.php/app/searchByPoly',
                type: 'post',
                data: {
                    'ne': ne,
                    'sw': sw
                },
                success: function (res) {
                    if (res.success) {
                        // render map
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: -34.397, lng: 150.644},
                            styles: mapStyles,
                            zoom: 8
                        });

                        animals = addAnimals(res.result);
                        addMarkers(animals);

                        if (res.result.length) map.setCenter({'lat': 1 * res.result[0].lat, 'lng': 1 * res.result[0].lng});
                    } else {
                        alert('Error: Wrong Input!');
                    }
                },
                dataType: 'json',
                error: function (XHR, status, response) {
                    console.log(XHR);
                    console.log(status);
                }
            });
    }

    /**
     * search by radius
     * return void
     */
    App.prototype.searchByRadius =   function () {

        $(document).on('click', '#radius-btn', function () {
            var circle, marker, center;
            setCenter = true;
            hideMarkers(map, $this.markers);

            circleOptions = {
                fillColor:"#d4d4d4",
                fillOpacity:0.5,
                strokeColor:"#f3f3f3",
                strokeOpacity:0.8,
                strokeWeight:3,
                clickable:false
            };

            var cirle_draw = google.maps.event.addListener(map, 'click', function(event) {

                $(document).on('click', '#radius-btn', function () {
                    marker.setMap(null);
                    circle.setMap(null);

                    google.maps.event.removeListener(cirle_draw);
                });

                if (setCenter) {
                    if (marker != undefined) {
                        marker.setMap(null);
                    }
                    marker = new google.maps.Marker({
                        position: event.latLng,
                        clickable:false,
                        icon: URL + 'img/circle-center.png'
                    });
                    marker.setMap(map);
                    circleOptions.center = event.latLng;
                    setCenter = false;
                }
                else {
                    var radius = distHaversine(circleOptions.center, event.latLng);
                    circleOptions.radius = radius*1000;
                    if (circle != undefined) {
                        circle.setMap(null);
                    }
                    circle = new google.maps.Circle(circleOptions);
                    circle.setMap(map);

                    setCenter = true;

                    filterByRadius( circleOptions.center.lat(), circleOptions.center.lng(), radius);

                }
            });
        });

        /**
         * filter animal by radius
         * @param radius
         * @param lat
         * @param lng
         */
        function filterByRadius (lat, lng, radius) {
            if (radius && lat && lng) {
                $.ajax({
                    url: URL + 'index.php/app/searchByRadius',
                    type: 'get',
                    data: {
                        'lat': lat,
                        'lng': lng,
                        'radius': radius
                    },
                    success: function (res) {

                        if (res.success) {
                            map = new google.maps.Map(document.getElementById('map'), {
                                center: {lat: -34.397, lng: 150.644},
                                styles: mapStyles,
                                zoom: 8
                            });

                            animals = addAnimals(res.result);
                            addMarkers(animals);

                            if (res.result.length) map.setCenter({'lat': 1 * res.result[0].lat, 'lng': 1 * res.result[0].lng});
                        } else {
                            alert('Error: Wrong Input!');
                        }
                    },
                    dataType: 'json',
                    error: function (XHR, status, response) {
                        console.log(XHR);
                        console.log(status);
                    }
                });
            } else {
                alert('Wrong input');
            }
        }


        /**
         * to radians
         * @param x
         * @returns {number}
         */
        rad = function(x) {
            return x*Math.PI/180;
        };

        /**
         * @param p1
         * @param p2
         * @returns {string}
         */
        distHaversine = function(p1, p2) {
            var R = 6371; // earth's mean radius in km
            var dLat  = rad(p2.lat() - p1.lat());
            var dLong = rad(p2.lng() - p1.lng());

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;

            return d.toFixed(3);
        };
    };

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

    /**
     * ajax search by text
     * return void
     */
    App.prototype.searchByText =   function () {

        $(document).on('click', '#search-btn', function () {
            var search = $('#search').val();
            if (search.length< 2 || !search.length) alert('Wrong search input!!!');

            $.ajax({
                url: URL + 'index.php/app/searchByText',
                type: 'get',
                data: {
                   'search': search
                },
                success: function (res) {
                    if (res.success && res.result.length) {
                        // render map
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: -34.397, lng: 150.644},
                            styles: mapStyles,
                            zoom: 8
                        });

                        animals = addAnimals(res.result);
                        addMarkers(animals);

                        if (res.result.length) map.setCenter({'lat': 1 * res.result[0].lat, 'lng': 1 * res.result[0].lng});

                    } else {
                        if (!res.success) alert('Error: Wrong Input!');
                        $('#map').append('<div class="lost-success"><h2>The search result is empty!!!<br>Please try again.</h2></div>');
                        setTimeout(function () {
                            $('.lost-success').remove();
                        }, 3000);
                    }
                },
                dataType: 'json',
                error: function (XHR, status, response) {
                    console.log(XHR);
                    console.log(status);
                }
            });
        });
    };

    /**
     * remove markers
     * @param map
     * @param markers
     * return void
     */
    function hideMarkers(map, markers) {
        /* Remove All Markers */
        while(markers.length){
            markers.pop().setMap(null);
        }

    }

    /**
     *  render markers
     * @param markers
     */
  function addMarkers( markers ) {

      var infowindow = new google.maps.InfoWindow();

        // if ($this.markers) hideMarkers(map, $this.markers);

      google.maps.event.addListener(infowindow, 'domready', function() {

          // Reference to the DIV which receives the contents of the infowindow using jQuery
          var iwOuter = $('.gm-style-iw');

          /* The DIV we want to change is above the .gm-style-iw DIV.
           * So, we use jQuery and create a iwBackground variable,
           * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
           */
          var iwBackground = iwOuter.prev();

          // Remove the background shadow DIV
          iwBackground.children(':nth-child(2)').css({'display' : 'none', 'background-color' : 'transparent'}).remove();

          // Remove the white background DIV
          iwBackground.children(':nth-child(4)').css({'display' : 'none', 'background-color' : 'transparent'}).remove();
          iwOuter.prev().css({'display' : 'none', 'background-color' : 'transparent'});
          $('#iw-container').parent('div').css({'overflow':'hidden'});

          // Taking advantage of the already established reference to
        // div .gm-style-iw with iwOuter variable.
        // You must set a new variable iwCloseBtn.
        // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
        // Is this div that groups the close button elements.
          var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
          iwCloseBtn.css({
              'opacity': '1', // by default the close button has an opacity of 0.7
              right: '50px', top: '0px' // button repositioning
          });

      });

       $this.markers = [];

      for (i = 0; i < markers.length; i++) {

          marker = 0;

          if (!markers[i].name && !markers[i].type &&
              !markers[i].photo && !markers[i].lat && !markers[i].lng) continue;

          var Coordinate = new google.maps.LatLng(1 * markers[i].lat, 1 * markers[i].lng);

          var marker = new google.maps.Marker({
              position: Coordinate,
              map: map,
              icon: 'img/marker.png',
              draggable: true
          });

        // add InfoWindow
          google.maps.event.addListener(marker, 'click', (function (marker, i) {

              if (!markers[i].info) console.log('empty info info');
              if (!markers[i].address) markers[i].address = 'No address';

              var str = '';

              switch (markers[i].type) {

                  case 'dog':
                      str = '<div class="iw-title">'+
                            '<h3>' + markers[i].type.toUpperCase()  + '</h3>'+
                            '</div><div class="iw-main ' + markers[i].type + '-bg">'+
                            '<div class="iw-text">' +
                            '<img class="lost-img" src="' + URL + markers[i].photo +'" alt="' + markers[i].name +'">' +
                            '<p><span>Address: </span><span>' + markers[i].address + '</span></p>' +
                            '<p><span>Name: </span><stromg>' + markers[i].name.toUpperCase()  + '</stromg></p>' +
                            '<p><span>Sort: </span><span>' + markers[i].info + '</span></p>' +
                            '</div>'+
                            '</div>';
                      break;

                  case 'cat':
                      str = '<div class="iw-title">'+
                          '<h3>' + markers[i].type.toUpperCase()  + '</h3>'+
                          '</div><div class="iw-main ' + markers[i].type + '-bg">'+
                          '<div class="iw-text"><p><span>Name: </span><stromg>' + markers[i].name.toUpperCase()  + '</stromg></p>' +
                          '<p><span>Address: </span><span>' + markers[i].address + '</span></p></div>' +
                          '<img class="lost-img" src="' + URL + markers[i].photo +'" alt="' + markers[i].name +'">' +
                          '<p><span>Color: </span><span>' + markers[i].info  + '</span></p>' +
                          '</div>'+
                          '</div>';
                      break;

                  case 'parrot':
                      str = '<div class="iw-title">'+
                          '<h3>' + markers[i].type.toUpperCase()  + '</h3>'+
                          '</div><div class="iw-main ' + markers[i].type + '-bg">'+
                          '<div class="iw-text">' +
                          '<p><span>Address: </span><span>' + markers[i].address + '</span></p></div>' +
                          '<img class="lost-img block-center" src="' + URL + markers[i].photo +'" alt="' + markers[i].name +'">' +
                          '<p><span>Name: </span><stromg>' + markers[i].name.toUpperCase()  + '</stromg></p>' +
                          '<p><span>Talk: </span><span>' + markers[i].info  + '</span></p>' +
                          '</div>'+
                          '</div>';
                      break;

                  case 'default':

                      alert( 'Something goes wrong!!!' );

              }

              var content = '<div id="iw-container" class="info-window" data-id="' + markers[i].id + '">'+
                                    str + '</div>';

              return function () {
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
              }

          })(marker, i));

          }


        $this.markers.push(marker);
      }

    return App;
})();


