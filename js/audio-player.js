$(function(){
	"use strict";
	if($('.audio-player').length){
		var myPlaylist=new jPlayerPlaylist({
				jPlayer:"#jquery_jplayer_1",
				cssSelectorAncestor:"#jp_container_1"
			},
			[
				{
					title:"Baarishein",
					artist:"Anuv Jain",
					mp3:"songs/Baarishein_192(PaglaSongs).mp3",
					
				},
				{
					title:"Dil Galti Kar",
					artist:"Triasha Chatterjee",
					mp3:"songs/Dil_Galti_Kar_Baitha_Hai_320.mp3",
				},
				{
					title:"Main Khiladi",
					artist:"JG",
					mp3:" songs/320-Main_Khiladi_-_Selfiee_320_Kbps.mp3",
				},
				{
					title:"MeraDilYePukareAaja",
					artist:"Remix",
					mp3:"songs/MeraDilYePukareAaja.mp3",
				},
				{
					title:"O Holy Night - DJ Williams",
					artist:"DJ Williams",
					mp3:"songs/O Holy Night - DJ Williams.mp3",
				},
				{
					title:"Ice & Fire - King Canyon",
					artist:"King Canyon",
					mp3:"songs/Ice & Fire - King Canyon.mp3",
				},
				{
					title:"Lismore",
					artist:"Bloodhound Gang",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
				},
				{
					title:"The Separation",
					artist:"Friendly Fires ",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
				},
				{
					title:"Beside Me",
					artist:"Friendly Fires ",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
				},
				{
					title:"Bubble",
					artist:"Skunkhour",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
				},
				{
					title:"Stirring of a fool",
					artist:"The Meanies",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
				},
				{
					title:"Partir",
					artist:"The Living End",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
				},
				{
					title:"Thin Ice",
					artist:"Screaming Trees",
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
				}
			],
			{
				swfPath:"js/plugins",
				supplied:"oga, mp3",
				wmode:"window",
				useStateClassSkin:true,
				autoBlur:false,
				smoothPlayBar:true,
				keyEnabled:true,
				playlistOptions:{
					autoPlay:false
				}
			}
		);
		$("#jquery_jplayer_1").on($.jPlayer.event.ready+' '+$.jPlayer.event.play,function(event){
			var current=myPlaylist.current;
			var playlist=myPlaylist.playlist;
			$.each(playlist,function(index,obj){
				if(index==current){
					$(".jp-now-playing").html(
						"<div class='jp-track-name'>"
						+obj.title
						+"</div> <div class='jp-artist-name'>"
						+obj.artist
						+"</div>"
					);
				}
			});
			$('.jp-volume-bar').mousedown(
				function(){
					var parentOffset=$(this).offset(),width=$(this).width();
					$(window).mousemove(function(e){
						var x=e.pageX-parentOffset.left,volume=x/width
						if(volume>1){
							$("#jquery_jplayer_1").jPlayer("volume",1);
						}else if(volume<=0){
							$("#jquery_jplayer_1").jPlayer("mute");
						}else{
							$("#jquery_jplayer_1").jPlayer("volume",volume);
							$("#jquery_jplayer_1").jPlayer("unmute");
						}
					});
					return false;
				}
			).mouseup(function(){$(window).unbind("mousemove");});
			var timeDrag=false;$('.jp-play-bar').mousedown(function(e){
				timeDrag=true;
				updatebar(e.pageX);
			});
			$(document).mouseup(function(e){
				if(timeDrag){
					timeDrag=false;
					updatebar(e.pageX);
				}
			});
			$(document).mousemove(function(e){
				if(timeDrag){
					updatebar(e.pageX);
				}
			});
			var updatebar=function(x){
				var progress=$('.jp-progress');
				var position=x-progress.offset().left;
				var percentage=100*position/progress.width();
				if(percentage>100){
					percentage=100;
				}
				if(percentage<0){
					percentage=0;
				}
				$("#jquery_jplayer_1").jPlayer("playHead",percentage);
				$('.jp-play-bar').css('width',percentage+'%');
			};
			$('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click',function(){
				$('#playlist-wrap').fadeToggle();
				$('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
			});
			$('.hide_player').unbind().on('click',function(){
				$('.audio-player').toggleClass('is_hidden');
				$(this).html($(this).html()=='<i class="fa fa-angle-down"></i> HIDE'?'<i class="fa fa-angle-up"></i> SHOW PLAYER':'<i class="fa fa-angle-down"></i> HIDE');
			});
			$('body').unbind().on('click','.audio-play-btn',function(){
				$('.audio-play-btn').removeClass('is_playing');
				$(this).addClass('is_playing');
				var playlistId=$(this).data('playlist-id');
				myPlaylist.play(playlistId);
			});
		});
	}
});