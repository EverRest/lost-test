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
                console.log(status);
            }
        });
    };

    getInfo = function () {
        $.ajax({
            url: URL + 'index.php/app/getData',
            success: function (res) {
                addMarkers(res);
            },
            dataType: 'json',
            error: function (XHR, status, response) {
                console.log(XHR);
                console.log(status);
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
                    // deleteMarkers();
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
                if (data.success) window.location.reload();
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

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    /**
     *  render markers
     * @param markers
     */
  function addMarkers( markers ) {

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


      for (i = 0; i < markers.length; i++) {

          if (!markers[i].name.length && !markers[i].additional.length && !markers[i].type.length &&
              !markers[i].photo.length && !markers[i].lat.length && !markers[i].lng.length) continue;

          var Coordinate = new google.maps.LatLng(1 * markers[i].lat, 1 * markers[i].lng);

          var marker = new google.maps.Marker({
              position: Coordinate,
              map: map,
              icon: 'img/marker.png'
          });

          google.maps.event.addListener(marker, 'click', (function (marker, i) {

              if (!markers[i].additional.length) return false;
              markers[i].additional = markers[i].additional[0];

              var str = '';

              switch (markers[i].type.name) {

                  case 'dog':
                      str = '<div class="iw-title">'+
                            '<h3>' + markers[i].type.name.toUpperCase()  + '</h3>'+
                            '</div><div class="iw-main ' + markers[i].type.name + '-bg">'+
                            '<img class="lost-img" src="' + URL + markers[i].photo +'" alt="' + markers[i].name +'">' +
                            '<p><span>Address: </span><span>( ' + markers[i].lat + ', ' + markers[i].lng  + ' )</span></p>' +
                            '<div class="iw-text"><p><span>Name: </span><stromg>' + markers[i].name.toUpperCase()  + '</stromg></p>' +
                            '<p><span>Sort: </span><span>' + markers[i].additional['sort']  + '</span></p>' +
                            '</div>'+
                            '</div>';
                      break;

                  case 'cat':
                      str = '<div class="iw-title">'+
                          '<h3>' + markers[i].type.name.toUpperCase()  + '</h3>'+
                          '</div><div class="iw-main ' + markers[i].type.name + '-bg">'+
                          '<div class="iw-text"><p><span>Name: </span><stromg>' + markers[i].name.toUpperCase()  + '</stromg></p>' +
                          '<p><span>Address: </span><span>( ' + markers[i].lat + ', ' + markers[i].lng  + ' )</span></p></div>' +
                          '<img class="lost-img" src="' + URL + markers[i].photo +'" alt="' + markers[i].name +'">' +
                          '<p><span>Color: </span><span>' + markers[i].additional['color']  + '</span></p>' +
                          '</div>'+
                          '</div>';
                      break;

                  case 'parrot':
                      str = '<div class="iw-title">'+
                          '<h3>' + markers[i].type.name.toUpperCase()  + '</h3>'+
                          '</div><div class="iw-main ' + markers[i].type.name + '-bg">'+
                          '<p><span>Address: </span><span>( ' + markers[i].lat + ', ' + markers[i].lng  + ' )</span></p></div>' +
                          '<img class="lost-img block-center" src="' + URL + markers[i].photo +'" alt="' + markers[i].name +'">' +
                          '<div class="iw-text"><p><span>Name: </span><stromg>' + markers[i].name.toUpperCase()  + '</stromg></p>' +
                          '<p><span>Talk: </span><span>' + markers[i].additional['talk']  + '</span></p>' +
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

      }

    return App;
})();


