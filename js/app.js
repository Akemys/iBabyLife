// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.run(function($ionicPlatform, $rootScope, $state, userService) {
	$ionicPlatform.ready(function() {
	
		//localizáció
		
		
		$rootScope.loc = {
			'szlogen' : 'Egy alkalmazás, hogy semmi ne merüljön feledésbe...',
			'belepes' : 'belépés',
			'ibabylifeloginpopupText' : 'Rendelkezel már IBabyLife felhasználóval ?',
			'ibabyliferegpopupText' : 'Sikeresen regisztráltál egy IBabyLife fiókot. A következő oldalon ezt használva be tudsz lépni, és az alkalmazás a jövőben ezt fogja használni !',
			'ibabylifeloginsucces' : 'Sikeresen bejelentkeztél. Az alkalmazás a továbbiakban ezt a felhasználói fiókot fogja használni !',
			'igen' : 'Igen',
			'nem' : 'Nem',
			'vissza' : 'Vissza',
			'tovabb' : 'Tovább',
			'loginFailText' : 'Ellenőrizd az internetkapcsolatod, és próbálj meg újra bejelentkezni',
			'connectFailText' : 'Csatlakozz az internethez, hogy ezt a funkciót használni tudd!',
			'loginFailTitle' : 'Nincs internetkapcsolat!',
			'exitTitle' : 'Kilépés',
			'exitText' : 'Biztos ki akarsz lépni?',
			'ismertetopopupText' : 'Szeretnél egy rövid ismertetőt az alkalmazásról ?',
			'ismertetopopupTitle' : 'Ismertető',
			'' : '',
			'' : '',
			'' : '',
			'' : '',
			'' : '',
			'' : '',
			'' : ''
		};
			$rootScope.loc.ertekelesKuldvePopupText = 'Köszönjük, hogy értékeléseddel segíted a munkánkat.';
			$rootScope.loc.ertekelesKuldvePopupTitle ='Értékelés elküldve!';
			$rootScope.loc.ertekelesKervePopupTitle ='iBabyLife értékelés';
			
			$rootScope.loc.ertekelesLatvany = 'Látvány';
			$rootScope.loc.ertekelesHasznal = 'Használhatóság';
			$rootScope.loc.ertekelesHasznos= 'Hasznosság';
		


		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

})


.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'temps/home.html',
      controller: 'homeCtrl'
    })
	.state('filter', {
      url: '/filter',
      templateUrl: 'temps/filter.html',
      controller: 'filterCtrl'
    })
    .state('ismerteto', {
      url: '/ismerteto',
      templateUrl: 'temps/ismerteto.html',
      controller: 'ismertetoCtrl'
    })
	.state('upload', {
      url: '/upload',
      templateUrl: 'temps/upload.html',
      controller: 'uploadCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'temps/signin.html',
      controller: 'signinCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'temps/signup.html',
      controller: 'signupCtrl'
    })
    .state('timeline', {
      url: '/timeline',
      templateUrl: 'temps/timeline.html',
      controller: 'timelineCtrl'
    })
     .state('newAlbum', {
      url: '/newAlbum',
      templateUrl: 'temps/newAlbum.html',
      controller: 'newAlbumCtrl'
    })
    .state('albumline', {
      url: '/albumline',
      templateUrl: 'temps/albumline.html',
      controller: 'albumlineCtrl'
    })
    .state('albumEvent', {
      url: '/albumEvent',
      templateUrl: 'temps/albumEvent.html',
      controller: 'albumEventCtrl'
    })
    .state('fotoalbum', {
      url: '/fotoalbum',
      templateUrl: 'temps/fotoalbum.html',
      controller: 'fotoalbumCtrl'
    })
	.state('login', {
		url : '/login',
		templateUrl : 'temps/login.html',
		controller : 'loginCtrl',
		data : {
			authenticate : false
		}
	}); 

    
  // Send to login if the URL was not found
  $urlRouterProvider.otherwise('/login');
})

.factory('userService', ['$rootScope','$ionicPopup', '$state', function($rootScope,$ionicPopup, $state) {
			



  // Hello.js Functions
   
	hello.init({
		google : '128251550279-homlrbethbbcm1bpjjvnmei96mrsr2bc.apps.googleusercontent.com',
		facebook : '761716387233976',
		twitter : 'S0Q3RMX6jXu674kpyKg2dtk48'
	}, {
		//
		// Define the OAuth2 return URL
		// This can be anything you like, providing its the callback which you have registered with the providers for OAuth2
		// It could even be localhost, e.g. http://localhost/somepath as phonegap is not run from a domain so SameOrigin breaks, instead we take advantage of being able to read the popups URL in PhoneGap
		scope : "email",
		redirect_uri : 'http://adodson.com/hello.js/redirect.html'
	}); 


  var service = {
    isLoggedIn: function() {
      return $rootScope.userStatus;
    },
    loginFacebook: function() {
      if(checkConnection()){
      	
				hello('facebook').login(function() {
					hello('facebook').api('/me').success(function(json) {
						console.log(json);
						$rootScope.user = json;
						$rootScope.$apply($rootScope.user);
						$rootScope.userStatus = true;
						$rootScope.network = 'facebook';
						window.localStorage.setItem("username", $rootScope.user.name);
						window.localStorage.setItem("email", $rootScope.user.email);
						$state.go('home');
					});
				});

      }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }
      
      
    },
    logoutFacebook: function() {
      hello('facebook').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;

         $state.go('login');
      });
    },
    loginGoogle: function() {
      if(checkConnection()){
	      hello('google').login( function() {
	        hello( 'google' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'google';
	          window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email",  $rootScope.user.email);	    
	          $state.go('home');
	        });
	      });
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }     
    },
    logoutGoogle: function() {
      hello('google').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;
        
         $state.go('login');
      });
    },
    loginTwitter: function() {
      if(checkConnection()){
	      hello('twitter').login(function() {
	        hello( 'twitter' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.user.email = $rootScope.user.screen_name+'@ibabylife.com';
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'twitter';
			  window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email", $rootScope.user.email);	    
	          $state.go('home');
	        });
	      });
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }     
    },
    logoutTwitter: function() {
      hello('twitter').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;
        $state.go('login');
      });
    }
  };

  return service;
}])

.controller('homeCtrl', ['$scope','$rootScope','$timeout', '$ionicModal', '$ionicSlideBoxDelegate','$state','$ionicPopup','$ionicPlatform','$ionicSideMenuDelegate','$ionicLoading','$http','userService',function($scope, $rootScope,$timeout,$ionicModal, $ionicSlideBoxDelegate, $state,$ionicPopup,$ionicPlatform,$ionicSideMenuDelegate,$ionicLoading,$http, userService) {
    
    
    $scope.data = {};  

   	$ionicPlatform.registerBackButtonAction(function () {
   		var myPopup = $ionicPopup.show({		   
		    title: $rootScope.loc.exitTitle,
		    subTitle: $rootScope.loc.exitText,
		    scope: $scope,
		    buttons: [
		      { text: $rootScope.loc.nem, },
		      {
		        text: $rootScope.loc.igen,
		        type: 'button-pink',
		        onTap: function(e) {
		          navigator.app.exitApp();		          
		        }
		      },
		    ]
		  });	 
	}, 100);
   
   $scope.exit = function(){
	   var myPopup = $ionicPopup.show({		   
			    title: $rootScope.loc.exitTitle,
			    subTitle: $rootScope.loc.exitText,
			    scope: $scope,
			    buttons: [
			      { text: $rootScope.loc.nem, },
			      {
			        text: $rootScope.loc.igen,
			        type: 'button-pink',
			        onTap: function(e) {
			          navigator.app.exitApp();		          
			        }
			      },
			    ]
			});	 
   };

	if (localStorage.getItem("saveImages") === null) {
		window.localStorage.setItem("saveImages", 1 );
		$scope.saveImages = true;
	}else{
		if(localStorage.getItem("saveImages")==1){
			$scope.saveImages = true;
		}else{
			$scope.saveImages = false;
		}		
	}
	
	
			
		if (localStorage.getItem("ujvagyok") === null) {
			window.localStorage.setItem("ujvagyok", 1);
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.ismertetopopupText,
				title : $rootScope.loc.ismertetopopupTitle,
				buttons : [{
					text : $rootScope.loc.igen,
					type : 'button-pink',

					onTap : function(e) {

						$scope.ismerteto();

					}
				}, {
					text : $rootScope.loc.nem,
					type : 'button-light'
				}]
			});

		};


		

		





	
	

	
	
	
	//tutorial model vége	
	
	
	
	
	$scope.saveImageHandler = function(saveImages){
		
		if (saveImages) {
			window.localStorage.setItem("saveImages", 1);
		} else {
			window.localStorage.setItem("saveImages", 0);
		}

	};


	gaPlugin = window.plugins.gaPlugin;
	gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-56764945-1", 10);

	function nativePluginResultHandler(result) {
		//alert('nativePluginResultHandler - '+result);
		console.log('nativePluginResultHandler: ' + result);
	}

	function nativePluginErrorHandler(error) {
		//alert('nativePluginErrorHandler - '+error);
		console.log('nativePluginErrorHandler: ' + error);
	}


	cordova.plugins.notification.badge.configure({ title: '%d feltöltetlen esemény' });
	cordova.plugins.notification.badge.configure({ smallIcon: 'icon' });	


	$scope.ismerteto = function(){
		$state.go('ismerteto');
	};
	
	$scope.logout = function() {
		var myPopup = $ionicPopup.show({
			title : 'Kijelentkezés',
			subTitle : 'Biztos ki akarsz jelentkezni?',
			scope : $scope,
			buttons : [{
				text : 'Nem'
			}, {
				text : '<b>Igen</b>',
				type : 'button-pink',
				onTap : function(e) {

					window.cookies.clear(function() {					    
					});
					window.localStorage.clear();
					$rootScope.userStatus = false;
					$rootScope.user = null;
					$rootScope.network = false;
					$state.go('login');
				
				}
			}]
		});

	}; 


	
	dao.getOfflineEvent(function(events) {
		$rootScope.offlineEvents = events;	
		
		
		
		if ($rootScope.offlineEvents.length == 0) {

			cordova.plugins.notification.badge.clear();
		} else {

			cordova.plugins.notification.badge.set($rootScope.offlineEvents.length);
		}

	});	
	
	
	$scope.getNumber = function(num) {
		return new Array(num);
	};
	
	$scope.setLatvany = function(num) {
		$scope.latvany = num+1;		
	};
	$scope.setHasznalhatosag = function(num) {
		$scope.hasznalhatosag = num+1;		
	};
	
	$scope.setHasznossag= function(num) {
		$scope.hasznossag = num+1;		
	};
	
	$scope.whatClassIsIt = function(mit,mivel) {
		if (mit == mivel)
			return "type2";		
		else
			return "type3";
	};

	
	$scope.rateApp = function() {
		if (checkConnection()) {
			$scope.latvany = 5;
			$scope.hasznalhatosag = 5;
			$scope.hasznossag = 5;
			
			
			
			var myPopup = $ionicPopup.show({
				
				title : $rootScope.loc.ertekelesKervePopupTitle,
				template : '<div>Kérlek, segítsd munkánkat értékeléseddel! 1-5-ig pontozd a szempontokat érintéssel, majd kattints a Küldés gombra!</div> </br>'+
						   '<table><tr><td>{{loc.ertekelesLatvany}} : </td><td><div ng-click="setLatvany($index)"  ng-repeat="i in getNumber(5) track by $index" ng-class="whatClassIsIt(latvany,$index+1)" class="circleBase">{{$index+1}}</td> </tr>' +
						   '<tr><td>{{loc.ertekelesHasznal}} : </td><td><div ng-click="setHasznalhatosag($index)"  ng-repeat="i in getNumber(5) track by $index" ng-class="whatClassIsIt(hasznalhatosag,$index+1)" class="circleBase">{{$index+1}}</td> </tr>' +
						   '<tr><td>{{loc.ertekelesHasznos}} : </td><td><div ng-click="setHasznossag($index)"  ng-repeat="i in getNumber(5) track by $index" ng-class="whatClassIsIt(hasznossag,$index+1)" class="circleBase">{{$index+1}}</td></tr></table>',
				scope : $scope,
				buttons : [{
					text : '<b>Küldés</b>',
					type : 'button-pink',
					onTap : function(e) {

						$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/apprate.php', {
							latvany : $scope.latvany,
							hasznalhatosag : $scope.hasznalhatosag,
							hasznossag : $scope.hasznossag,
							user : $rootScope.user.email
						}).success(function(data, status, headers, config) {
							var myPopup = $ionicPopup.show({
								title : $rootScope.loc.ertekelesKuldvePopupTitle,
								template : $rootScope.loc.ertekelesKuldvePopupText,
								buttons : [{
									text : '<b>Rendben</b>',
									type : 'button-pink'
								}]
							});
						});

					}
				}, {
					text : '<b>Mégsem</b>',
					type : 'button-light',
				}]
			});

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}

	};


	
	
	
	
	$scope.shareApp = function() {
		if (checkConnection()) {
			window.plugins.socialsharing.share(null, null, null, 'https://play.google.com/store/apps/details?id=com.fwstudio.iBabyLife');
			
		

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}

	};




	$scope.shareWeb = function() {

		if (checkConnection()) {
			var appInBrowser = window.open('https://www.facebook.com/sharer/sharer.php?u=http://www.ibabylife.com/', '_blank', 'location=yes,enableViewportScale=yes');

			appInBrowser.addEventListener('loadstart', function(event) {
				facebookLoc(event.url, appInBrowser);
			});

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}

	}; 

	
	function facebookLoc(loc, appInBrowser) {
		if (loc.indexOf("story.php") > -1) {
			appInBrowser.close();

			var myPopup = $ionicPopup.show({
				title : 'Sikeres megosztás',
				template : 'Köszönjük, hogy megosztottad az iBabyLife weboldalát!',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink'
				}]
			});

		}
	};


	//dao.dropTables();
	// albumszinkronizálás


	$rootScope.honap = function(datum) {
		var honapok = ['jan.', 'feb.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];	
		var ev,honap,nap,ora,perc,masodperc;
		var date = new Date(datum);
		
		ev = date.getFullYear() ;
		honap = honapok[date.getMonth()] ;
		nap = date.getDate()  ;
		ora = date.getHours() ;
		
		perc = date.getMinutes() ;		
		if(perc<10) perc = '0'+perc;
		
				
		masodperc = date.getSeconds() ;
		
		
		return ev+". "+honap+" "+nap+"   "+ora+":"+perc+" ";
		
	}; 

	dao.findAllAlbum(function(y) {
		$scope.familyalbums = [];
		$scope.minealbums = [];
		
		
		
		$scope.albums = y;
		$scope.albums.forEach(function(album) {			
			if(album.albumOwner!=$rootScope.user.email){				
				$scope.familyalbums.push(album);						
			}else{				
				$scope.minealbums.push(album);
			}
		}); 		
		$scope.$apply();
		
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/myAlbums.php', {
			albumowner : $rootScope.user.email
		}).success(function(data, status, headers, config) {	
			
			
			var myalbums = data;
			
						
			if (( typeof myalbums === 'object')) {
				console.log(myalbums);
			
				for (myalbum in myalbums) {					
					var e = myalbums[myalbum];
					var result = $.grep($scope.albums, function(e) {
						return e.albumName == myalbums[myalbum].albumName;
					});
				
					if (result.length == 0) {
						dao.newAlbum(myalbums[myalbum], function() {
						});
						$scope.albums.push(myalbums[myalbum]);						
					} else if (result.length == 1) {
					}

				}
			}else{
				//alert(myalbums);
			};
	
	
			
			
			dao.findAllAlbum(function(y) {
				$scope.familyalbums = [];
				$scope.minealbums = [];
				$scope.albums = y;
				$scope.albums.forEach(function(album) {
					if (album.albumOwner != $rootScope.user.email) {
						$scope.familyalbums.push(album);
					} else {
						$scope.minealbums.push(album);
					}

				});
				$scope.$apply();
			});




			
		}).error(function(data, status, headers, config) {			
			dao.findAllAlbum(function(albums) {
				$scope.albums = albums;
				$scope.$apply();
				
			});
		});
	}); 





	$scope.feedback = function(){
		if(checkConnection()){
			 var myPopup = $ionicPopup.show({			    
			    title: 'Segítsd munkánkat!',
			    template: '<div>Kérlek, írj pár mondatot arról, hogy milyennek találod az alkalmazást. Ha van valami, amit hiányolsz, azt is nyugodtan írd ide. Köszönjük!</div>'+
			       		  '​<textarea ng-model="data.feedback"  rows="5" cols="70"></textarea>',
			    scope: $scope,
			    buttons: [
			      { text: 'Mégsem' },
			      {
			        text: '<b>Küldés</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			          if (!$scope.data.feedback) {
			            //don't allow the user to close unless he enters wifi password
			            e.preventDefault();
			          } else {
			          	  $scope.feedbackData = {};
			          	  $scope.feedbackData.message = $scope.data.feedback;
			          	  $scope.feedbackData.deviceModel = device.model;
			          	  $scope.feedbackData.devicePlatform = device.platform;
			          	  $scope.feedbackData.deviceVersion = device.version;
			          	  
			          	  
			          	  
				          $http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/feedback.php', $scope.feedbackData).success(function(data, status, headers, config) {			
									
								var myPopup = $ionicPopup.show({
								title : 'Köszönjük!',
									template : 'Köszönjük, hogy üzeneteddel támogatod a munkánk!',
									buttons : [{
										text : '<b>Rendben</b>',
										type : 'button-pink'
									}]
								});
					
							}).error(function(data, status, headers, config) {							
								
							});
	
			               
			          }
			        }
			      },
			    ]
			  });
	
		}else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}

	};
	
	$scope.albumline = function(albumid,albumname,albumowner){
		
		if (checkConnection()) {
		
			$rootScope.albumid = albumid;
			$rootScope.albumname = albumname;
			$rootScope.albumowner = albumowner;
			$state.go('albumline');
			
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}
		

	};
	
	$scope.newalbum = function() {		 
		$state.go('newAlbum');
	};
	
	
	
	$scope.fotoalbum = function() {
		if (checkConnection()) {
		
			if ($scope.albums.length == 0) {
				var myPopup = $ionicPopup.show({
					title : 'Új album',
					template : 'Még nem készítettél albumot gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
					buttons : [{
						text : '<b>Rendben</b>',
						type : 'button-pink',
						onTap : function(e) {
							$ionicSideMenuDelegate.toggleRight();
						}
					}]
				});
	
			}else if($scope.albums.length == 1){
				$rootScope.fotoalbum = $scope.albums[0];	
				$state.go('fotoalbum');
			}else {
				 $scope.data.fotoalbum = $scope.albums[0];
				 var myPopup = $ionicPopup.show({
				    template: 'Válaszd ki, melyik albumból szeretnél fotóalbumot készíteni! <label class="item item-input item-select"><div class="input-label">	Album :  </div> <select ng-model="data.fotoalbum" ng-options="album.albumName for album in albums"></select></label>',
				    title: 'Fotóalbum készítés',
				    scope: $scope,
				    buttons: [
				      { text: 'Mégsem' },
				      {
				        text: '<b>Tovább</b>',
				        type: 'button-pink',
				        onTap: function(e) {
				          if (!$scope.data.fotoalbum) {
				            //don't allow the user to close unless he enters wifi password
				            e.preventDefault();
				          } else {
				        	$rootScope.fotoalbum = $scope.data.fotoalbum;
				          	$state.go('fotoalbum');
				          }
				        }
				      },
				    ]
				  });
				
			}
			
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}
	
	
		
	}; 

	

	$scope.timeline = function() {
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'Új album',
				template : 'Még nem készítettél albumot gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			$state.go('timeline');
		}
	}; 

	
	$scope.logoutGuest=function(){
		$state.go('login');
	};	 

	

    $scope.takePic = function() {	
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'Új album',
				template : 'Még nem készítettél albumot gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			var options = {
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				quality: 100,
				targetWidth: 1440,
  				targetHeight: 1440,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(onSuccess, onFail, options);
		}

     
       
    };
    


	

	
	var onSuccess = function(imageUri) {

		
		$rootScope.kepAdat = imageUri;
		$rootScope.images = [];
		$state.go('filter');

	};


    
    
    function onFail(message) {
      
    }   
    
    
    function currentDate() {
		var currentDate = new Date;
		var Day = currentDate.getDate();
		if (Day < 10) {
			Day = '0' + Day;
		}//end if
		var Month = currentDate.getMonth() + 1;
		if (Month < 10) {
			Month = '0' + Month;
		}//end if
		var Year = currentDate.getFullYear();
		var fullDate = Year + '-' + Month + '-' + Day;
		return fullDate;
	}//end current date function
    
	
	
	$scope.menuRight = function() {
		$ionicSideMenuDelegate.toggleRight();		
	}; 
	$scope.menuLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();		
	}; 


	
	
		
	var requests = []; // hold ajax request
	var ftrans = []; // hold filetransfer request

   
	$scope.uploadEvent = function(eventID, tombID) {		
		if (checkConnection()) {
			/*
			$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Feltöltés...'
			});
			*/
			
			
			$rootScope.offlineEvents[tombID].loading = 1;
			
			
			
			dao.eventById(eventID, function(event) {
				$scope.eventData = event[0];

				console.log($scope.eventData);

				
				dao.findAlbumByID($scope.eventData.albumId, function(album) {
					$scope.album = album;

					if ($scope.album[0].albumOwner == $rootScope.user.email) {
						$scope.eventData.albumOwner = $rootScope.user.email;
					} else {
						$scope.eventData.albumOwner = $scope.album[0].albumOwner;
					}

					$scope.eventData.feltoltve = 1;
					$scope.eventData.albumName = $scope.album[0].albumName;
					$scope.eventData.albumDate = $scope.album[0].albumDate;
					$scope.eventData.albumSex = $scope.album[0].albumSex;
					$scope.eventData.saveImages = localStorage.getItem("saveImages");
					
					
						
						requests.push($http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newEsemeny.php', $scope.eventData));
					
											
						requests[requests.length - 1].success(function(data, status, headers, config) {
							
							
							 dao.eventFeltolt(eventID);
							 $scope.offlineEvents.splice(tombID, 1);	

							 
							
					
						if ($rootScope.offlineEvents.length == 0) {
							$ionicSideMenuDelegate.toggleLeft();
							cordova.plugins.notification.badge.clear();
						} else {
							cordova.plugins.notification.badge.set($rootScope.offlineEvents.length);
						}

							  
							
							
						
							if (( typeof data === 'object')) {								
								
								ftrans.push(new FileTransfer());

								for (var i in data) {
									var url = data[i];									
									

									var imgName = url.replace("files/", "");

									ftrans[ftrans.length - 1].download('http://mobileapps.fekiwebstudio.hu/ibabylife/' + url, 'cdvfile://localhost/persistent/Pictures/iBabyLife/' + imgName, function(entry) {
									}, function(error) {
										alert(error);
									});
								}

							};

						}); 

						
						
					

				}); 

					

			});
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}


	}; 


}])

.controller('filterCtrl', ['$scope','$rootScope','$ionicPopup','$ionicPlatform','$timeout', '$state','$ionicLoading', 'userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform ,$timeout, $state,$ionicLoading, userService) {
	
	$scope.filter = '';
	
	$scope.back = function() {
		$state.go('home');
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);
	
	document.getElementById('originalPhoto').src = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	var bigPhoto = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	
/*
	var c = document.createElement("canvas");
	c.width = 300;
	c.height = 300;
	
	
	var cxt = c.getContext("2d");
	var img = new Image();
	img.src = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	img.onload = function() {
		cxt.drawImage(img, 0, 0,300,300);		
		var dataURL = c.toDataURL();	
		document.getElementById('originalPhoto').src = dataURL ;    
    	var originalPhoto = document.getElementById('originalPhoto');
	}; 
*/

	document.getElementById('filterButtons').addEventListener('click', szures, false);

	
	function szures(e){
		$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Szűrés...'
		});
		$timeout(function() {
	       prepFilterEffect(e);		
   		}, 250);
		
	}

	function prepFilterEffect(e) {		
	
		
		var filterButton = getFilterButton(e.target);
		if (!filterButton)
			return;
		

		ApplyEffects[filterButton.id](originalPhoto, 'wepb');
				
		if(document.getElementById('originalPhoto').style.display == 'block'){
			$ionicLoading.hide();	
		
			var myPopup = $ionicPopup.show({
				template : 'A szűrés közben gond lépett fel. Kérlek próbáld meg újra, vagy válassz másik szűrőt.',
				title : 'Sikertelen szűrés !',
				buttons : [{
					text : '<b>Újra</b>',
					type : 'button-pink',
					onTap : function() {
						szures(e);
					}
				}, {
					text : '<b>Másik</b>',
					type : 'button-light'
				}]
			}); 
	
			
		}else{
			$ionicLoading.hide();
		};			
		
		
		
		$scope.filter= filterButton.id;
		
		
	

	}
	

	
	

	function getFilterButton(target) {
		var button;
		if (target.classList.contains('filter')) {
			button = target;
		} else if (target.parentNode.classList.contains('filter')) {
			button = target.parentNode;
		}
		
		return button;
	}

	
	
	


	$scope.cont = function(){
	
		
		/*
		if(document.getElementById('filteredPhoto') !== null){
			$rootScope.finalKep = document.getElementById('filteredPhoto').src;	
		}else{
			$rootScope.finalKep = document.getElementById('originalPhoto').src;		
		}
		*/		
		
	
		if ($scope.filter != '') {			
			$rootScope.finalKep = document.getElementById('filteredPhoto').src;
			$rootScope.images.push($rootScope.finalKep);
			$state.go('upload');
			
		} else {			
			$rootScope.finalKep = bigPhoto;
			$rootScope.images.push($rootScope.finalKep);
			$state.go('upload');
		}


		
		
	};
	
	
	
	
	
	
	
	
	
	
	
    
}])


.controller('ismertetoCtrl', ['$scope','$rootScope','$ionicSlideBoxDelegate','$ionicPopup','$ionicPlatform','$timeout', '$state','$ionicLoading', 'userService',
					  function($scope, $rootScope,  $ionicSlideBoxDelegate ,$ionicPopup,$ionicPlatform ,$timeout, $state,$ionicLoading, userService) {
		
	
	$scope.back = function() {
		$state.go('home');
	};
	$ionicPlatform.registerBackButtonAction(function() {
		$state.go('home');
	}, 100);

	// Call this functions if you need to manually control the slides
	
  
  	
	

	$scope.aImages = [{
		'src' : 'tutorial/kep1.png',
		'msg' : 'A jobb felső sarokban lévő fogaskerekek megnyomásával érheted el a főbb beállitási pontokat.'
	}, {
		'src' : 'tutorial/kep1_1_1.png',
		'msg' : 'A bal felső sarokba lévő ikon azt jelzi, hogy van olyan esemény tárolva a telefonon, amit nem sikerült feltöltened.'
	}, {
		'src' : 'tutorial/kep1_1_2.png',
		'msg' : 'Az adott eseményre kattintva, egy gombnyomással feltöltheted azt.'
	}, {
		'src' : 'tutorial/kep1_1.png',
		'msg' : 'A kamera gomb megnyomásával egyből készítheted a képeket a gyermeked albumába.'
	}, {
		'src' : 'tutorial/kep1_2.png',
		'msg' : 'A "segíts" gombot megnyomva egy kis szövegdoboz ugrik fel, ahol az alkalmazással kapcsolatos észrevételeidet oszthatod meg velünk.'
	}, {
		'src' : 'tutorial/kep1_3.png',
		'msg' : 'A "saját albumok" cím alatt az általad létrehozott albumok találhatóak. Melyekre kattintva az adott album teljes tartalmát meg tudod tekinteni.'
	}, {
		'src' : 'tutorial/kep1_4.png',
		'msg' : 'A "családi albumok"  cím alatt a mások által létrehozott, de veled megosztott albumok találhatóak. Melyekre kattintva az adott album teljes tartalmát meg tudod tekinteni.'
	}, {
		'src' : 'tutorial/kep2.png',
		'msg' : 'Az első pontban a saját neved és email címed látod. Ezekkel tudod azonosítani magad az alkalmazás számára.'
	}, {
		'src' : 'tutorial/kep3.png',
		'msg' : 'A második pontban új albumot hozhatsz létre gyermeked számára.'
	}, {
		'src' : 'tutorial/kep4.png',
		'msg' : 'A harmadik pontban, egy már meglévő album képeiből készíthetsz fotóalbumot pár gombnyomással.'
	}, {
		'src' : 'tutorial/kep7.png',
		'msg' : 'A negyedik pontban értékelni tudod az iBabyLife alkalmazást.'
	}, {
		'src' : 'tutorial/kep8.png',
		'msg' : 'A ötödik pontban el tudod küldeni az alkalmazást email-ben egy kedves ismerősödek/barátodak.'
	}, {
		'src' : 'tutorial/kep9.png',
		'msg' : 'A hatodik pontban meg tudod osztani az iBabyLife hivatalos oldalát facebook-on.'
	}, {
		'src' : 'tutorial/kep5.png',
		'msg' : 'A hetedik pontban a jelenleg futó súgó ablakot tudod újra előhívni.'
	}, {
		'src' : 'tutorial/kep6.png',
		'msg' : 'Az nyolcadik pontban be tudod állítani, hogy az elkészült képek mentésre kerüljenek a készülékeden is.'
	}];
	
	$scope.slideIndex = 0; 
	
	$scope.next = function() {
		
		$scope.slideIndex++; 
		$scope.slide = $scope.aImages[$scope.slideIndex];
		
		
	};

	$scope.previous = function() {
		$scope.slideIndex--; 
		$scope.slide = $scope.aImages[$scope.slideIndex];
		
		 
	};	
	
	$scope.slide = $scope.aImages[0];
	

    
}])
.controller('albumlineCtrl', ['$scope', '$rootScope','$ionicLoading','$ionicActionSheet','$ionicScrollDelegate', '$ionicPopup','$ionicPlatform','$ionicScrollDelegate', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope,$ionicLoading,$ionicActionSheet,$ionicScrollDelegate, $ionicPopup,$ionicPlatform,$ionicScrollDelegate, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.data = {};  
	$scope.home = function() {
		$rootScope.scrollto = 0;
		$state.go('home');
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	
		$rootScope.scrollto = 0; 
	    $state.go('home');
	}, 100);


	

	$scope.scrollToItem = function(itemIndex) {		
			
		var scrollHeight = 0;
		for (var i = 0; i < itemIndex; i++) {
			scrollHeight += 450;
		}
		
		$ionicScrollDelegate.scrollTo(0, scrollHeight);
	}; 



	$scope.eventOpen = function(event,index) {

		$ionicActionSheet.show({
			buttons : [{
				text : 'Megnézem'
			},{
				text : 'Megosztom Facebookon'
			}],				
			cancelText : 'Mégsem',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				
				if (index == 0) {
					$rootScope.scrollto = index;
					$rootScope.openEvent = event;
					$state.go('albumEvent');
				};								
				
				if (index == 1) {
				
					$ionicLoading.show({
						template : '<i class="icon ion-looping"></i> Képek betöltése...'
					});


					var kepek = [];
					event.kepek.forEach(function(entry) {
						kepek.push('http://mobileapps.fekiwebstudio.hu/ibabylife/' + entry);
					});					
				
					window.plugins.socialsharing.shareViaFacebook(null, kepek, null, function() {
						$ionicLoading.hide();					

					}, function(errormsg) {
						$ionicLoading.hide();
					}); 

				};



				return true;
			}
		}); 

	
		
	};
	
	$scope.newEvent = function() {		
		var options = {
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,	
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				quality: 100,
				targetWidth: 1440,
  				targetHeight: 1440,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onSuccess, onFail, options);
		

     
     
	}; 
	

	$scope.share = function() {
			 var myPopup = $ionicPopup.show({
		    title: 'Megosztás',
		    template: 'Kérlek add meg ismerősöd email címét, akivel megszeretnéd osztani ezt az albumot, hogy ő is tudjon hozzáadni eseményeket. <input type="text" ng-model="data.shareemail">',
		    scope: $scope,
		    buttons: [
		      { text: 'Mégsem' },
		      {
		        text: '<b>Megosztás</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          if (!$scope.data.shareemail) {
		            //don't allow the user to close unless he enters wifi password
		            e.preventDefault();
		          } else {     	
		          	  $scope.shareData = {};
		          	  $scope.shareData.shareemail = $scope.data.shareemail;
		          	  $scope.shareData.meghivo = $rootScope.user.name;	   
				      $scope.shareData.albumOwner = $scope.album[0].albumOwner;
				      $scope.shareData.albumName = $scope.album[0].albumName;
				      $scope.shareData.albumDate = $scope.album[0].albumDate;
				      $scope.shareData.albumSex = $scope.album[0].albumSex;
				      
					  
		          	  	          	  
			          $http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/share.php', $scope.shareData).success(function(data, status, headers, config) {			
		
							var myPopup = $ionicPopup.show({
								title: 'Sikeres megosztás',
								template : 'A megadott címre értesítést küldtünk. Az ismerősödnek nincs más dolga, mint regisztrálnia a megadott email címmel az iBabyLife applikációban és máris szerkesztheti '+ $scope.album[0].albumName +' albumát.',
								buttons : [{
									text : '<b>Rendben</b>',
									type : 'button-pink'									
								}]
							});
							
						}).error(function(data, status, headers, config) {
							alert('Nincs kapcsolat a szerverrel');	
						});
		               
		          }
		        }
		      },
		    ]
		  });

	};

	
	
 	var onSuccess = function(imageData) {
 		$rootScope.albumID = $scope.albumData.albumid;
 		$rootScope.kepAdat = imageData;
		$rootScope.images = [];
		$state.go('filter');
 	
		 
		
		
    };
    
    
    function onFail(message) {
     
    }   

	$scope.mikorTortent = function(eventDate) {
		var date1 = new Date($scope.album[0].albumDate);
		var date2 = new Date(eventDate);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (diffDays >= 365) {
			return parseInt(diffDays / 365) + ' éves korban ';

		} else if (diffDays < 365 && diffDays > 30) {
			return parseInt(diffDays / 30) + ' hónapos korba ';
		} else {
			return diffDays + ' napos korban';
		}
	};




	$scope.albumData = {};
	$scope.albumData.albumowner = $rootScope.albumowner;
	$scope.albumData.albumid = $rootScope.albumid;
	$scope.albumData.albumname = $rootScope.albumname;
	
	
	$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/albumEvents.php', $scope.albumData).success(function(data, status, headers, config) {	
		
		if (data.length >=1) {
			dao.findAlbumByID($rootScope.albumid, function(album) {
				$scope.album = album;
				$scope.events = data;

				$.each($scope.events, function(key, value) {
					$scope.events[key].kepek = [];
					if ($scope.events[key].eventImg1 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg1);
					if ($scope.events[key].eventImg2 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg2);
					if ($scope.events[key].eventImg3 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg3);
					if ($scope.events[key].eventImg4 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg4);
					if ($scope.events[key].eventImg5 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg5);
					if ($scope.events[key].eventImg6 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg6);
					if ($scope.events[key].eventImg7 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg7);
					if ($scope.events[key].eventImg8 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg8);
					if ($scope.events[key].eventImg9 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg9);
					if ($scope.events[key].eventImg10 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg10);

					

				});
			
				
				
				var date1 = new Date($scope.album[0].albumDate);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if (diffDays >= 365) {
					$scope.kor = parseInt(diffDays / 365) + ' éves ';
				} else if (diffDays < 365 && diffDays > 30) {
					$scope.kor = parseInt(diffDays / 30) + ' hónapos ';
				} else {
					$scope.kor = diffDays + ' napos';
				}
				$scope.$apply();

				

				if ($rootScope.scrollto > 0) {
					$scope.scrollToItem($rootScope.scrollto);
				}

			});
		} else {
			
			dao.findAlbumByID($rootScope.albumid, function(album) {
				$scope.album = album;
				var date1 = new Date($scope.album[0].albumDate);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if (diffDays >= 365) {
					$scope.kor = parseInt(diffDays / 365) + ' éves ';
				} else if (diffDays < 365 && diffDays > 30) {
					$scope.kor = parseInt(diffDays / 30) + ' hónapos ';
				} else {
					$scope.kor = diffDays + ' napos';
				}
				$scope.$apply();

			});
		}

	
		

	}).error(function(data, status, headers, config) {
		alert('Nincs kapcsolat a szerverrel');
	});

	
	


}])

.controller('albumEventCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform','$ionicScrollDelegate', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform,$ionicScrollDelegate, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.data = {};  
	$scope.home = function() {
		window.history.back();
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    window.history.back();
	}, 100);
	
	$scope.event = $rootScope.openEvent;
	
	
	
	$scope.onlyDate = function(datum){
		var honapok = ['jan.', 'feb.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];	
		var ev,honap,nap;
		var date = new Date(datum);
		
		ev = date.getFullYear() ;
		honap = honapok[date.getMonth()] ;
		nap = date.getDate()  ;
		
		return ev+". "+honap +" "+ nap;
	};	

	

	$scope.facebookshareEvent = function(url) {
		var appInBrowser = window.open('https://www.facebook.com/sharer/sharer.php?u=http://mobileapps.fekiwebstudio.hu/ibabylife/shareEvent/index.php?shareID=' + url, '_blank', 'location=yes,enableViewportScale=yes');

		appInBrowser.addEventListener('loadstart', function(event) {
			facebookLoc(event.url, appInBrowser);
		});
	}; 


	function facebookLoc(loc, appInBrowser) {
		if (loc.indexOf("story.php") > -1) {
			appInBrowser.close();

			var myPopup = $ionicPopup.show({
				title : 'Sikeres megosztás',
				template : 'Ezt az eseményt sikeresen megosztottad a facebook idővonaladon !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink'
				}]
			});

		}
	};


	
	$scope.deleteEvent = function(){
		
			
		var myPopup = $ionicPopup.show({
			title : 'Esemény törlése',
			template : 'Biztos törölni szeretnéd ezt az eseményt ?',
			buttons : [{
				text : '<b>Igen</b>',
				type : 'button-pink',
				onTap: function(e) {			
					$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/deleteEvent.php?eventID=' + $scope.event.id).success(function(data) {
				
						var myPopup = $ionicPopup.show({
							title : 'Esemény törölve',
							template : 'Ezt az eseményt végleg töröltük a rendszerből.',
							buttons : [{
								text : '<b>Rendben</b>',
								type : 'button-pink',
								onTap : function(e) {
									window.history.back();
								}
							}]
						});

					});
			    }
			},{
				text : '<b>Nem</b>',
				type : 'button-light'
			}]
		}); 

		
			
	};

}])


.controller('newAlbumCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$('#albumDate').mobiscroll('destroy');
		$state.go('home');		
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $('#albumDate').mobiscroll('destroy');
	    $state.go('home');	    
	    
	}, 100);
	$scope.data= {};
	
	 
    
    $('#albumDate').mobiscroll().datetime({
		theme: 'android-holo-light', 
		display : 'bottom',
		mode : 'scroller',
		dateOrder : 'yy mm dd',
		dateFormat : "yy-mm-dd",		
		maxDate : new Date(),
		lang : 'hu'
	});
	
	
	 $scope.newalbum =  function(){
		
		
    	console.log($scope.data);
    	 if (!$scope.data.albumName || !$scope.data.albumSex || $('#albumDate').val()=='' ) {	            
		            var myPopup = $ionicPopup.show({
					    title: 'Valamelyik adat hiányzik',
					    buttons: [
					      {
					        text: '<b>újra</b>',
					        type: 'button-pink',
					        onTap: function(e) {
					         
					        }
					      },
					    ]
					  });		          				          
		          } else {
		            album = {
			    		albumName : $scope.data.albumName,
			    		albumDate : $('#albumDate').val(),
			    		albumSex  : $scope.data.albumSex,
			    		albumOwner : $rootScope.user.email
			    	};
			    	dao.newAlbum(album,function(){});
			    	var myPopup = $ionicPopup.show({
					    title: 'Az albumot sikeresen létrehoztad',
					    buttons: [
					      {
					        text: '<b>Rendben</b>',
					        type: 'button-pink',
					        onTap: function(e) {
					           $state.go('home');
					           return;
					        }
					      },
					    ]
					  });			    	
			    	return;
		          }
    
    	
    };
	

}])
.controller('fotoalbumCtrl', ['$scope','$ionicLoading','$ionicActionSheet', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http',  'userService',
function($scope,$ionicLoading,$ionicActionSheet, $rootScope, $ionicPopup,$ionicPlatform, $state, $http,   userService) {
	$scope.home = function() {		
		$('#albumFromDate').mobiscroll('destroy');
		$('#albumToDate').mobiscroll('destroy');		
		$state.go('home');		
	};
	
	
	$ionicPlatform.registerBackButtonAction(function() {
		$('#albumFromDate').mobiscroll('destroy');
		$('#albumToDate').mobiscroll('destroy');
		$state.go('home');
	}, 100); 

	
	$scope.data={};
	
	$scope.fotoalbum= $rootScope.fotoalbum;
	console.log($scope.fotoalbum);	
	$scope.data.albumFromDate = "";
	$scope.data.albumToDate = "";

	
	$scope.albumFromDateChanged = function() {		
		$scope.data.albumFromDate = $('#albumFromDate').val();
		$scope.$apply();
	};
	$scope.albumToDateChanged = function() {		
		$scope.data.albumToDate = $('#albumToDate').val();		
		$scope.$apply();
	};
	
	function linkMegnyitas(url){
		window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
	};
	
	function facebookShare(url){
		var appInBrowser = window.open('https://www.facebook.com/sharer/sharer.php?u='+url, '_blank', 'location=yes,enableViewportScale=yes');
		
		appInBrowser.addEventListener('loadstart', function(event) {
			facebookLoc(event.url, appInBrowser);
		});

	};

	function facebookLoc(loc, appInBrowser) {
		if (loc.indexOf("story.php") > -1) {
			appInBrowser.close();

			var myPopup = $ionicPopup.show({
				title : 'Sikeres megosztás',
				template : 'Ezt az albumot sikeresen megosztottad a facebook idővonaladon !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink'
				}]
			});

		}
	}

	$scope.show = function(db) {

				
		var hideSheet = $ionicActionSheet.show({
			buttons : [{
				text : '<b>Facebook</b> megosztás'
			},{
				text : 'Megnéz'
			}],
			buttonClicked : function(index) {
				
				if(index==0 && db==20){
					facebookShare($scope.photoAlbum20url);
				}
				if(index==0 && db==50){
					facebookShare($scope.photoAlbum50url);
				}
				if(index==0 && db==80){
					facebookShare($scope.photoAlbum80url);
				}
				
				if(index==1 && db==20){
					linkMegnyitas($scope.photoAlbum20url);
				}
				if(index==1 && db==50){
					linkMegnyitas($scope.photoAlbum50url);
				}
				if(index==1 && db==80){
					linkMegnyitas($scope.photoAlbum80url);
				}
				return true;
			}
		}); 

	}; 

	 



	
	
	$scope.newPhotoAlbum = function(db){
		
		
		$ionicLoading.show({
			template : '<i class="icon ion-looping"></i> Fotóalbum generálása...'
		}); 

		if ($scope.data.albumFromDate != '' && $scope.data.albumToDate != '') {
		
		
			$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newPhotoAlbum.php?imagesSize='+db+'&albumName=' + $scope.fotoalbum.albumName + '&albumOwner=' + $scope.fotoalbum.albumOwner +'&albumOwnerName=' +  $rootScope.user.name + '&fromDate=' + $scope.data.albumFromDate + '&toDate=' + $scope.data.albumToDate + '').success(function(data) {
				$ionicLoading.hide();
				if(data['success'] == false){		
					
					if (data['usedalbum']) {
						
						var myPopup = $ionicPopup.show({
							title : 'Már kész',
							template : 'Ezt a fotóalbumot ezekkel a dátumparaméterekkel már elkészítetted!',
							buttons : [{
								text : '<b>Rendben</b>',
								type : 'button-pink',								
								onTap : function(e) {

									if (db == 20) {
										$scope.photoAlbum20 = true;
										$scope.photoAlbum20url = data['url'];
									} else if (db == 50) {
										$scope.photoAlbum50 = true;
										$scope.photoAlbum50url = data['url'];
									} else {
										$scope.photoAlbum80 = true;
										$scope.photoAlbum80url = data['url'];
									}
									$scope.$apply();
									return;

								}

							}]
						}); 

					} else if (data['wrongdate']) {
						
						
						
						var myPopup = $ionicPopup.show({
							title : 'Rossz adatok',
							template : 'A megadott két időpont között nincsenek feltöltött események !',

							buttons : [{
								text : '<b>Rendben</b>',
								type : 'button-pink',
								onTap : function(e) {									
									return;
								}
							}]

						}); 


					}

				
				}else {
					/*
					 var myPopup = $ionicPopup.show({
					 title : 'Fotóalbum elkészült',
					 template : 'A fotóalbuma elkészült, most lehetősége van hogy megnézze és megossza barátaival, családtagjaival !',
					 buttons : [{
					 text : '<b>Rendben</b>',
					 type : 'button-pink',
					 onTap : function(e) {

					 return;

					 }
					 }]

					 });
					 */
					if (db == 20) {
						$scope.photoAlbum20 = true;
						$scope.photoAlbum20url = data['url'];
					} else if (db == 50) {
						$scope.photoAlbum50 = true;
						$scope.photoAlbum50url = data['url'];
					} else {
						$scope.photoAlbum80 = true;
						$scope.photoAlbum80url = data['url'];
					}
					$scope.$apply();
				};

				
			});
		} else {
			$ionicLoading.hide();
			var myPopup = $ionicPopup.show({
				title : 'Hiányzó adatok',
				template : 'Add meg mindkét időpontot, amelyek a fotóalbum kezdetét és végét jelzik !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink',
					onTap : function(e) {									
							return;
					}
				}]
			});
		}


	

	
	};


	$('#albumFromDate').mobiscroll().date({
		theme : 'android-holo-light',
		display : 'bottom',
		mode : 'scroller',
		dateOrder : 'yy mm dd',
		dateFormat : "yy-mm-dd",
		minDate : new Date($scope.fotoalbum.albumDate),
		maxDate : new Date(),
		lang : 'hu'
	});
	$('#albumFromDate').mobiscroll('setDate', new Date($scope.fotoalbum.albumDate), true);

	$('#albumToDate').mobiscroll().date({
		theme : 'android-holo-light',
		display : 'bottom',
		mode : 'scroller',
		dateOrder : 'yy mm dd',
		dateFormat : "yy-mm-dd",
		minDate : new Date($scope.fotoalbum.albumDate),
		maxDate : new Date(),
		lang : 'hu'
	});
	$('#albumToDate').mobiscroll('setDate', new Date(), true);

    
    
	

}])



.controller('signinCtrl', ['$scope', '$rootScope','$ionicPopup','$ionicPlatform', '$state','$http','userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform, $state,$http, userService) {

	$scope.back=function(){
		$state.go('login');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('login');	  
	}, 100);
	
	$scope.logAjax = function() {
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/login.php?' + jQuery("#form-login").serialize()).success(function(data) {
			console.log(data);

			if (!data.success) {
				// if not successful, bind errors to error variables
				$scope.errorLogin = data.errors.login;

			} else {
				var myPopup = $ionicPopup.show({
				    title: 'Sikeres bejelentkezés',
				    template: $rootScope.loc.ibabylifeloginsucces,
				    buttons: [
				      { text: '<b>Rendben</b>',	      
				        type: 'button-pink',
				        onTap: function(e) {
				          window.localStorage.setItem("ibabylifeusername", data.vezeteknev+' '+data.keresztnev);
				          window.localStorage.setItem("ibabylifeemail", data.email);	          
				          
				          
							console.log(data);
							$rootScope.user =  {
								name : data.vezeteknev+' '+data.keresztnev,
								email : data.email
							};
							$rootScope.$apply($rootScope.user);
							
							$state.go('home');

		  				  
				        }
				      }
				    ]
				  });

			}
		});

	};



}])


.controller('signupCtrl', ['$scope', '$rootScope','$ionicPopup','$ionicPlatform', '$state','$http','userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform,$state,$http, userService) {
		
	$scope.back=function(){
		$state.go('login');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('login');	  
	}, 100);
	
	$scope.regAjax = function() {
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/signup.php?' + jQuery("#form-signup").serialize()).success(function(data) {
			console.log(data);

			if (!data.success) {
				// if not successful, bind errors to error variables
				$scope.errorVezeteknev = data.errors.vezeteknev;
				$scope.errorKeresztnev= data.errors.keresztnev;
				$scope.errorEmail = data.errors.email;
				$scope.errorJelszo = data.errors.jelszo;

			} else {
				var myPopup = $ionicPopup.show({
				    title: 'Sikeres regisztráció',
				    template: $rootScope.loc.ibabyliferegpopupText,
				    buttons: [
				      { text: '<b>Bejelentkezés</b>',	      
				        type: 'button-pink',
				        onTap: function(e) {
		  				  $state.go('signin'); 
				        }
				      }
				    ]
				  });
			}
		});

	};



}])


.controller('uploadCtrl', ['$scope', '$rootScope','$timeout', '$state','$stateParams', '$ionicPopup','$http','$ionicSlideBoxDelegate','$ionicLoading','$ionicPlatform','$ionicActionSheet', 'userService',
function($scope, $rootScope, $timeout, $state,$stateParams, $ionicPopup,$http,$ionicSlideBoxDelegate,$ionicLoading,$ionicPlatform,$ionicActionSheet, userService) {
	$ionicLoading.hide();	
	
	
	$ionicPlatform.registerBackButtonAction(function () {	
		if(!$scope.mentve && !$scope.uploading){
		    var myPopup = $ionicPopup.show({		   
		    title: 'Kilépés',
		    subTitle: 'Biztos visszalépsz a főmenübe ?',
		    scope: $scope,
		    buttons: [
		      { text: 'Nem' },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		       	onTap: function(e) {
					$rootScope.images = [];
					$rootScope.albumID = false;
					$state.go('home');
				}

		      },
		    ]
		  });
		}else{
			$rootScope.images = [];
			$rootScope.albumID = false;
			$state.go('home');
		} 
		 	  
	}, 100);

	$scope.home = function() {
		 if(!$scope.mentve && !$scope.uploading){
		    var myPopup = $ionicPopup.show({		   
		    title: 'Kilépés',
		    subTitle: 'Biztos visszalépsz a főmenübe ?',
		    scope: $scope,
		    buttons: [
		      { text: 'Nem' },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		       	onTap: function(e) {
					$rootScope.images = [];
					$rootScope.albumID = false;
					$state.go('home');
				}

		      },
		    ]
		  });
		}else{
			$rootScope.images = [];
			$rootScope.albumID = false;
			$state.go('home');
		} 
		 
	}; 
	
	
	$scope.egyketto = ['első kapálozó mozdulata', 'fény felé fordul', 'hangra figyel, fordul', 'felemeli a fejét', 'fordítja a fejét', 'alkalra támaszkodik', 'tenyerét a fény felé tartja', 'kezeit a szájába veszi'];
	$scope.haromnegy = ['felfedezi kezét, mozgatja közben figyeli', 'kitámasztja és emeli magát hason', 'tenyerét nyitva tartja', 'kezébe adott dolgot megfog', 'oldalra fordul', 'az első átfordulás hasról hátra', 'a kezébe adott csörgőt tudatosan rázza', 'első mosoly, öröm az arcon'];
	$scope.othat = ['hasról hátra - hátáról hasra forog', 'tudatosan nyúl a tárgyakért', 'fürdéskor már "pancsol"', 'utánoz, pl nyelvet nyújt', 'mosolyog a tükörben magára', 'hasán kúszik', 'felül egyedül', 'már használja az első 3 ujját fogásra', 'mindent a szájába vesz'];
	$scope.hetnyolc = ['elgurul a helyéről', 'elkezd tudatosan kúszni előre-hátra', 'elöször áll fel kapaszkodva', 'tudatosan kapaszkodik dolgokba', 'karját nyújtja felénk', 'mindent megrágcsál', 'jön az első fog', 'kúszik, négykézlábra emelkedik', 'mászik négykézláb '];
	$scope.kilenctiz = ['feláll egyedül', 'mászik egyedül előre', 'kapaszkodik, első lépések', 'mutatóujjával mutogat', 'pakolászik dolgokat egymásba', 'ülésből hasra fordul', 'első oldallépések kapaszkodva', 'ülve, egyedül játszik'];
	$scope.tizenegyketto = ['bútorokba kapaszkodva egyedül lépeget', 'pakolászik játékokat', 'játékokat dobál', 'puszit ad', 'kézenfogva sétál', 'próbál papírra firkálni', 'kanállal eszik', 'egyedül tipeg']; 



	$scope.kor = function(date) {

		var date1 = new Date(date);
		var date2 = new Date();
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		x = parseInt(diffDays / 30);

		return x;

	}; 
	

    $scope.takePic = function() {	
	


			var options = {
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				quality: 100,
				targetWidth: 1440,
  				targetHeight: 1440,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(ujEvent, onFail, options);
		

     
       
    };
    
	
	var ujEvent = function(imageUri) {
		
		$rootScope.kepAdat = imageUri;
		$rootScope.images = [];
		$state.go('filter');

	};

	
	

	
	$scope.facebookshareEvent = function() {
		if (checkConnection()) {
			$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Képek betöltése...'
			});

			var kepek = [];
			$scope.kepek.forEach(function(entry) {
				kepek.push('http://mobileapps.fekiwebstudio.hu/ibabylife/' + entry);
			});

			window.plugins.socialsharing.shareViaFacebook(null, kepek, null, function() {
				$ionicLoading.hide();
				var myPopup = $ionicPopup.show({
				title : 'Sikeres megosztás',
				template : 'Ezt az eseményt sikeresen megosztottad a facebook idővonaladon !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink'
				}]
			});
			}, function(errormsg) {
				$ionicLoading.hide();
			});
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}
	};

	

	$scope.data = [];
	
	$scope.data.message = $rootScope.message;
	$scope.data.milestone = $rootScope.milestone;

	
	if (!$rootScope.albumID) {
		dao.findAllAlbum(function(albums) {
			$scope.albums = albums;
			
			if (typeof $rootScope.album == 'undefined') {
				$scope.data.album = $scope.albums[0];
			} else {
				$scope.data.album = $scope.albums[$rootScope.album - 1];
			}

			
			$scope.$apply();
		});
	} else {
		dao.findAlbumByID($rootScope.albumID,function(albums){
			$scope.albums = albums;
			$scope.data.album = $scope.albums[0];
			$scope.$apply();
		});
		
		
	}
	



	$scope.images=$rootScope.images;	
	$scope.$apply();

	

	$scope.mentve = false;
	$scope.uploading = false;

	$scope.saveEvent = function() {
		$scope.uploading = true;
		/*
		 $ionicLoading.show({
		 template : '<i class="icon ion-looping"></i> Feltöltés...'
		 });
		 */

		if (checkConnection()) {
			//offline mentés eleje
				
			
			$scope.data.albumid = $scope.data.album.id;
			$scope.data.eventMessage = $scope.data.message;
			$scope.data.eventMilestone = $scope.data.milestone;
			$scope.data.eventImg1 = $scope.images[0];
			$scope.data.eventImg2 = $scope.images[1];
			$scope.data.eventImg3 = $scope.images[2];
			$scope.data.eventImg4 = $scope.images[3];
			$scope.data.eventImg5 = $scope.images[4];
			$scope.data.eventImg6 = $scope.images[5];
			$scope.data.eventImg7 = $scope.images[6];
			$scope.data.eventImg8 = $scope.images[7];
			$scope.data.eventImg9 = $scope.images[8];
			$scope.data.eventImg10 = $scope.images[9];
			$scope.data.eventDate = currentDate() + " " + currentTime();

			var azEventId;
			dao.newEVent($scope.data,1, function(id) {
				$scope.uploading = true;
				azEventId = id;	
			});

			
			//offline mentés vége
			
		   

			//online mentés eleje
			$scope.eventData = {};
		
			
			
			if ($scope.data.message)
				$scope.eventData.eventMessage = $scope.data.message;
			else
				$scope.eventData.eventMessage = 'undefined';

			if ($scope.data.milestone)
				$scope.eventData.eventMilestone = $scope.data.milestone;
			else
				$scope.eventData.eventMilestone = 'undefined';

			if ($scope.images[0])
				$scope.eventData.eventImg1 = $scope.images[0];
			else
				$scope.eventData.eventImg2 = 'undefined';

			if ($scope.images[1])
				$scope.eventData.eventImg2 = $scope.images[1];
			else
				$scope.eventData.eventImg2 = 'undefined';
			
			if ($scope.images[2])
				$scope.eventData.eventImg3 = $scope.images[2];
			else
				$scope.eventData.eventImg3 = 'undefined';
				
			if ($scope.images[3])
				$scope.eventData.eventImg4 = $scope.images[3];
			else
				$scope.eventData.eventImg4 = 'undefined';
				
			if ($scope.images[4])
				$scope.eventData.eventImg5 = $scope.images[4];
			else
				$scope.eventData.eventImg5 = 'undefined';
				
			if ($scope.images[5])
				$scope.eventData.eventImg6 = $scope.images[5];
			else
				$scope.eventData.eventImg6 = 'undefined';
				
			if ($scope.images[6])
				$scope.eventData.eventImg7 = $scope.images[6];
			else
				$scope.eventData.eventImg7 = 'undefined';
				
			if ($scope.images[7])
				$scope.eventData.eventImg8 = $scope.images[7];
			else
				$scope.eventData.eventImg8 = 'undefined';
				
			if ($scope.images[8])
				$scope.eventData.eventImg9 = $scope.images[8];
			else
				$scope.eventData.eventImg9 = 'undefined';
				
			if ($scope.images[9])
				$scope.eventData.eventImg10 = $scope.images[9];
			else
				$scope.eventData.eventImg10 = 'undefined';

			
			
			$scope.eventData.eventDate = currentDate() + " " + currentTime();
			
		
			dao.findAlbumByID($scope.data.album.id, function(album) {
				$scope.album = album;
				
				
				
				if( $scope.album[0].albumOwner == $rootScope.user.email){
					$scope.eventData.albumOwner = $rootScope.user.email;
				}else{
					$scope.eventData.albumOwner =  $scope.album[0].albumOwner;
				}				
				$scope.eventData.albumId = $scope.data.album.id;
				$scope.eventData.albumName = $scope.album[0].albumName;
				$scope.eventData.albumDate = $scope.album[0].albumDate;
				$scope.eventData.albumSex = $scope.album[0].albumSex;
				$scope.eventData.saveImages = localStorage.getItem("saveImages");
				
			
				$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newEsemeny.php', $scope.eventData).success(function(data, status, headers, config) {			
		
				
					$ionicLoading.hide();	
					
					
					$scope.uploading = false;
					$scope.mentve = true;
					
				
					if (checkConnection()) {
						$scope.facebookshare = true;
					}

					
					$rootScope.message = '';
					$rootScope.milestone = '';

					dao.eventFeltolt(azEventId);

					dao.getOfflineEvent(function(events) {
						$rootScope.offlineEvents = events;
						$rootScope.$apply();
					});


					
					
					$scope.shareID = data.shareID;					
					$scope.kepek = data.kepek ;					
				
					
					if (( localStorage.getItem("saveImages") == 1)) {
						var ft = new FileTransfer();

						for (var i in data.kepek) {
							var url = data.kepek[i];

							var imgName = url.replace("files/", "");

							ft.download('http://mobileapps.fekiwebstudio.hu/ibabylife/' + url, 'cdvfile://localhost/persistent/Pictures/iBabyLife/' + imgName, function(entry) {
							}, function(error) {
							});
						}

					};
					
				

					
				
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();

					var myPopup = $ionicPopup.show({
						template : 'A készülék nem tudott kapcsolódni a szerverhez. Ennek oka lehet a lassú internetkapcsolat. Az eseményt elmentettük a készülékre, így a feltöltés megpóbbálhatod újra a főmenüben.',
						title : 'Sikertelen feltöltés !',
						buttons : [{
							text : '<b>Rendben</b>',
							type : 'button-pink',
							onTap : function(e) {
								$scope.mentve = true;								
							}
						}]
					});

				}); 

				

			});
			
			
			//online mentés vége
		} else {
		
			$scope.data.albumid = $scope.data.album.id;
			$scope.data.eventMessage = $scope.data.message;
			$scope.data.eventMilestone = $scope.data.milestone;
			$scope.data.eventImg1 = $scope.images[0];
			$scope.data.eventImg2 = $scope.images[1];
			$scope.data.eventImg3 = $scope.images[2];
			$scope.data.eventImg4 = $scope.images[3];
			$scope.data.eventImg5 = $scope.images[4];
			$scope.data.eventImg6 = $scope.images[5];
			$scope.data.eventImg7 = $scope.images[6];
			$scope.data.eventImg8 = $scope.images[7];
			$scope.data.eventImg9 = $scope.images[8];
			$scope.data.eventImg10 = $scope.images[9];
			$scope.data.eventDate = currentDate() + " " + currentTime();

			
			dao.newEVent($scope.data,0,function() {
				$ionicLoading.hide();
				var myPopup = $ionicPopup.show({
					template : 'Ezt az eseményt elmentettük a telefonra, ha internet közelben leszel, próbáld meg feltölteni újra.',
					title : $rootScope.loc.loginFailTitle,
					buttons : [{
						text : '<b>Rendben</b>',
						type : 'button-pink',
						
						onTap : function(e) {

							$scope.uploading = false;
							$scope.mentve = true;
							$rootScope.message = '';
							$rootScope.milestone = '';
						}

					}]
				});

			}); 

		}

		

	};

	
	function currentDate() {
		var currentDate = new Date;
		var Day = currentDate.getDate();
		if (Day < 10) {
			Day = '0' + Day;
		}//end if
		var Month = currentDate.getMonth() + 1;
		if (Month < 10) {
			Month = '0' + Month;
		}//end if
		var Year = currentDate.getFullYear();
		var fullDate = Year + '-' + Month + '-' + Day;
		return fullDate;
	}//end current date function

	function currentTime() {
		var currentTime = new Date;
		var Minutes = currentTime.getMinutes();
		if (Minutes < 10) {
			Minutes = '0' + Minutes;
		}
		var Hour = currentTime.getHours();
		if (Hour < 10) {
			Hour = '0' + Hour;
		}
		var second = currentTime.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}

		var Time = Hour + ':' + Minutes + ':' + second;
		return Time;
	}// end current time function


	$scope.plusz1Image = function() {
	
		$rootScope.album = $scope.data.album.id;
		$rootScope.message = $scope.data.message;
		$rootScope.milestone = $scope.data.milestone;
	
		var options = {
			destinationType : Camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: true, 
			sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			encodingType : 0,
			quality: 100,
			targetWidth: 1440, 
  			targetHeight: 1440,
			correctOrientation : true
		};
		// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onSuccess, onFail, options);
	};
	var onSuccess = function(imageData) {
	
		$rootScope.kepAdat = imageData;
		$state.go('filter');

	
	/*
		$scope.picData = "data:image/jpeg;base64," + imageData;
		$rootScope.kepAdat = imageData;			
		$rootScope.images.push($scope.picData);	 
	
		$state.transitionTo($state.current, $stateParams, {
			reload : true,
			inherit : false,
			notify : true
		});
    */
		

	};

	function onFail(message) {
		
	}

	
    
  
	$scope.checkImagesSize = function() {
		if ($rootScope.images.length > 1 ) {
			return true;
		}else{
			return false;
		}
	};
  
	$scope.show = function(index) {
		
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({			
			destructiveText : 'Törlés',
			titleText : 'Kép szerkesztése',
			cancelText : 'Mégse',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				return true;
			},
			destructiveButtonClicked : function() {	
			
				$rootScope.images.splice(index,1);				

				$state.transitionTo($state.current, $stateParams, {
					reload : true,
					inherit : false,
					notify : true
				}); 


			}
		});
	};


    
}])


.controller('loginCtrl', ['$scope','$rootScope','$ionicPopup','$ionicPlatform','$state','$ionicLoading', 'userService', function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state,$ionicLoading, userService) {
	  	 
	  	 
	
	$ionicLoading.show({
		template : 'Bejelentkezés..'
	});	 
	 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    var myPopup = $ionicPopup.show({		   
		    title: 'Kilépés',
		    subTitle: 'Biztos ki akarsz lépni ?',
		    scope: $scope,
		    buttons: [
		      { text: 'Nem' },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          navigator.app.exitApp();		          
		        }
		      },
		    ]
		  });	 	  
	}, 100);

	
	var online = function(session) {
		var current_time = (new Date()).getTime() / 1000;
		return session && session.access_token && session.expires > current_time;
	};

	
	var loginIBabyLife = function(){
		if(localStorage.getItem('ibabylifeemail') != null){
			return true;
		}else{
			return false;
		}
	};


	var facebookonline = hello("facebook").getAuthResponse();
	var googleonline = hello("google").getAuthResponse();
	var twitteronline = hello("twitter").getAuthResponse();
	
	
	
	
 
	
	document.addEventListener("deviceready", onDeviceReady, false);
	// device APIs are available
	function onDeviceReady() {
	
		
		
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI] = 'WiFi connection';
		states[Connection.CELL_2G] = 'Cell 2G connection';
		states[Connection.CELL_3G] = 'Cell 3G connection';
		states[Connection.CELL_4G] = 'Cell 4G connection';
		states[Connection.NONE] = 'No network connection';
		
		if ((online(facebookonline) || online(googleonline) || online(twitteronline) || loginIBabyLife())) {
	
			if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
				$ionicLoading.hide();
				var myPopup = $ionicPopup.show({					
				    template: 'Mivel nincs internetkapcsolatod, csak offline módban tudsz tovább lépni. Lesznek olyan funkciók, amik ilyenkor nem használhatóak.',
				    title: $rootScope.loc.loginFailTitle,
				    buttons: [
				      { text: '<b>Rendben</b>',	      
				        type: 'button-light',				       
						onTap: function(e) {
							if (online(facebookonline) || online(googleonline) || online(twitteronline)) {

								$rootScope.user = {
									name : localStorage.getItem('username'),
									email : localStorage.getItem('email')
								};
								$ionicLoading.hide();
								$state.go('home');

							} else if (loginIBabyLife()) {
								$rootScope.user = {
									name : localStorage.getItem('ibabylifeusername'),
									email : localStorage.getItem('ibabylifeemail')
								};
								$rootScope.$apply($rootScope.user);
								$ionicLoading.hide();
								$state.go('home');
							}

						}


				      }
				    ]
				  });
				
			} else {
				
				if (online(facebookonline) || online(googleonline) || online(twitteronline)) {

					$rootScope.user = {
						name : localStorage.getItem('username'),
						email : localStorage.getItem('email')
					};
					$ionicLoading.hide();
					$state.go('home');

				} else if (loginIBabyLife()) {
					$rootScope.user = {
						name : localStorage.getItem('ibabylifeusername'),
						email : localStorage.getItem('ibabylifeemail')
					};
					$rootScope.$apply($rootScope.user);
					$ionicLoading.hide();
					$state.go('home');
				}
		
			}
	
		} else {
			$ionicLoading.hide();
		}
	}

  $scope.loginFacebook = userService.loginFacebook;
  $scope.loginGoogle = userService.loginGoogle;
  $scope.loginTwitter = userService.loginTwitter;
  
  $scope.loginIbabyLife = function() {
	 if(checkConnection()){	 
		  var myPopup = $ionicPopup.show({
		    template: $rootScope.loc.ibabylifeloginpopupText,
		    title: 'IBabyLife belépés',
		    buttons: [
		      { text: '<b>Még nem</b>',	      
		        type: 'button-light',
		        onTap: function(e) {
		          $state.go('signup');
		        }
		      },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          $state.go('signin');
		        }
		      },
		    ]
		  });
	  }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }
	
	  
  };
}]);