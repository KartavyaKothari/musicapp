//song varialbles
// var songName1 = 'Badri Ki Dulhania (Title Track)';
// var songName2 = 'Humma Song';
// var songName3 = 'Nashe Si Chadh Gayi';
// var songName4 = 'The Breakup Song';
var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
var songList = ['Badri Ki Dulhania (Title Track)','Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
var songs = [
    {
      'name': 'Badri Ki Dulhania (Title Track)',
      'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
      'album': 'Badrinath ki Dulhania',
      'duration': '2:56',
     'fileName': 'song1.mp3'
    },
    {
      'name': 'Humma Song',
      'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
      'album': 'Ok Jaanu',
      'duration': '3:15',
      'fileName': 'song2.mp3'
    },
    {
      'name': 'Nashe Si Chadh Gayi',
      'artist': 'Arijit Singh',
      'album': 'Befikre',
      'duration': '2:34',
      'fileName': 'song3.mp3'
    },
    {
      'name': 'The Breakup Song',
      'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
      'album': 'Ae Dil Hai Mushkil',
      'duration': '2:29',
      'fileName': 'song4.mp3'
  }];

var currentSongPosition = null;

// function setUpPlaylist() {
//     for(var i =0; i < songs.length;i++) {
//      var song = songs[i];
//
//      $('#song'+ i + ' .song-name').text(song.name);
     // $('#song'+ i + ' .song-artist').text(song.artist);
     // $('#song'+ i + ' .song-album').text(song.album);
     // $('#song'+ i + ' .song-length').text(song.duration);
//
//    }
// }

function setUpPlaylist() {
 // HTML STRING
  var songDetailsHTML =
      '<span class="song-name"></span>'+
      '<span class="song-artist"></span>'+
      '<span class="song-album"></span><'+
      'span class="song-length"></span>';

   for (var i=0; i < songList.length ; i++) {
       var song = songs[i];
       $('.song-list').append('<div id="song'+ i + '" class="song">'+songDetailsHTML +'</div>');
       //$('#song'+ i +' .song-name').text(songList[i]);
       $('#song'+ i +' .song-name').text(song.name);
       $('#song'+ i + ' .song-artist').text(song.artist);
       $('#song'+ i + ' .song-album').text(song.album);
       $('#song'+ i + ' .song-length').text(song.duration);

       $('#song' + i).attr('data-song-position', i) ;
       $('#song' + i).click(function() {
            // Selecting audio element and storing it in a variable
            var audio = document.querySelector('audio');

            if ($(this).attr('data-song-position') != currentSongPosition){
                var songPosition = $(this).attr('data-song-position');
                songPosition = parseInt(songPosition);
                audio.src = songs[songPosition].fileName ;

                currentSongPosition = songPosition;
            }


            toggleSong();
      });
   }
};

//fucntion to get a fancy time format
function fancyTimeFormat(time){
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

//Updates the song time properties
function updateCurrentTime() {
    //Modify the updateCurrentTime() function like this

    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);

    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}

//This function plays the song if song is paused and viceversa
function toggleSong() {
  var song = document.querySelector('audio');

  // This should be false as we have
    // not called song.pause() till now
    console.log(song.paused);

  if(song.paused == true) {
    console.log('Playing');
    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
    song.play();
   }
   else {
    console.log('Pausing');
    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
    song.pause();
   }

   updateCurrentTime();

   setInterval(function() {
        updateCurrentTime();
    },1000);
}

//Hides welcome screen (Landing page) and shows main content
$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();

    if(name.length > 2) {
        var message = "Welcome, " +  name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
        setUpPlaylist();
    }else {
      $('#name-input').addClass('error');
    }
});

//Click event song play function
$('.play-icon').on('click',function() {
  toggleSong();
});

//Spacebar event song play function
$('body').on('keypress',function(event) {
  if (event.keyCode == 32){
    toggleSong();
  }
});
