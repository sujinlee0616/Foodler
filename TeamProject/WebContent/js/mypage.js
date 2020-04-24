

/*
 * $(document).ready(function() {

	// 기존 css에서 플로팅 배너 위치(top)값을 가져와 저장한다.
	var floatPosition = parseInt($("#floatMenu").css('top'));
	// 250px 이런식으로 가져오므로 여기서 숫자만 가져온다. parseInt( 값 );

	$(window).scroll(function() {
		// 현재 스크롤 위치를 가져온다.
		var scrollTop = $(window).scrollTop();
		var newPosition = scrollTop + floatPosition + "px";

		 애니메이션 없이 바로 따라감
		 $("#floatMenu").css('top', newPosition);
		 

		$("#floatMenu").stop().animate({
			"top" : newPosition
		}, 500);

	}).scroll();

});
*/

$(function() {
	$("#floatMenu").hide();
	$('#mypage_wish').click(function() {
		$.ajax({
			type : 'POST',
			url : '../mypage/wish.do',
			success : function(res) {

				$('#myContents').html(res);
			},
			error : function(e) {
				alert(e);
			}
		});
	});

	$('#mypage_reserve').click(function() {
		$("#floatMenu").hide();
		$.ajax({
			type : 'POST',
			url : '../mypage/reserve.do',
			success : function(res) {

				$('#myContents').html(res);
			},
			error : function(e) {
				alert(e);
			}
		});
	});

	$('#mypage_review').click(function() {
		$("#floatMenu").show();
		$.ajax({
			type : 'POST',
			url : '../mypage/review.do',
			success : function(res) {

				$('#myContents').html(res);
				
				$('#floatMenu').html(
						'<p>게시글 제목을 입력하세요</p>'
						+'<input type="text" id=""></input>'
						+'<input type="button" id="" value="검색"></input>'
						
						
				);
				
			},
			error : function(e) {
				alert(e);
			}
		});
	});

	$('#mypage_coupon').click(function() {

		$("#floatMenu").show();
		$.ajax({
			type : 'POST',
			url : '../mypage/coupon.do',
			success : function(res) {
				
				
				$('#myContents').html(res);
				
				
			
				$('#floatMenu').html(
					
					'<ul class="p-0">'	       
					+'  <li>'
					+'      <a id="nextPage">'
					+'          <svg height="30" viewBox="10 0 30 30" width="80" xmlns="http://www.w3.org/2000/svg">'
					+'              <path d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"></path>'
					+'              <path d="M0 0h48v48h-48z" fill="none"></path>'
					+'          </svg>'
					+'      </a>'
					+'  </li>'
					+'  <li>'
					+'      <a id="beforePage">'
					+'          <svg height="30" viewBox="10 0 30 30" width="80" xmlns="http://www.w3.org/2000/svg">'
					+'              <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"></path>'
					+'              <path d="M0-.75h48v48h-48z" fill="none"></path>'
					+'          </svg>'
					+'      </a>'
					+'  </li>'
					+'	<label style="font-size:13px">페이지 번호를 입력하세요</label>'
					+'  <input type="text" id="inputPage" style="width:50px; float:left; text-align:center">'
					+'  <button id="inputPageSearch"><img src="../images/header_searchicon.png" style="width:32px; height:32px; left:30px"></button>'		             
					+'	<button type="button" id="curPage" class="btn btn-success">page</button>'
					+'	<button type="button" id="totalPage" class="btn btn-success">tal</button>'
					+'	<label style="font-size:13px">가게 이름을 입력하세요</label>'
					+'	<input type="text" id="couponSearchText" style="width:90px; margin-top:0px;">'
					+'  <button id="couponSearch"><img src="../images/header_searchicon.png" style="width:32px; height:32px; left:30px"></button>'
					+'	<div id="couponSearchList" style="color:black;"></div>'
					+'</ul>'
					
				);
				
				/////////////////
				
				
				//////////////
				//page 초기값
				$('#curPage').text($('#couponCurpage').val());
				
				$('#totalPage').text($('#couponTotal').val());
	
				
				///////////////////////////////////////
				
		
				
				$('#inputPageSearch').click(function(){
					var inputPage = $('#inputPage').val();
					if(isNaN(inputPage)==false && inputPage>0)
					{
						var curpage = inputPage;
						
						if(curpage >$('#totalPage').text())
						{
							$('#inputPage').val("");
							return;
						}
						$('#couponCurpage').val(curpage);
						$('#curPage').text(curpage);
					
						$.ajax({
							type : 'POST',
							url : '../mypage/coupon.do',
							data : {"pageMove":"before","page":curpage},
							success : function(res) 
							{						
								
								$('#myContents').html(res);
								$('#inputPage').val("");
							},
							error : function(e) {
								alert(e);
							}
						})					
					}			
				})
				
				$('#couponSearch').click(function(){
					var couponSearchText = $('#couponSearchText').val();
					
					$.ajax({
						type : 'POST',
						url : '../mypage/coupon_search.do',
						data : {"rname":couponSearchText},
						success : function(res) 
						{
							$('#couponSearchText').val("");
							$('#myContents').html(res);	
							
							$('.couponSearchOne').remove();
						}
						
					});		
						
				});

				$('#couponSearchText').keyup(function(){
					var couponSearchText = $('#couponSearchText').val();
			
					if($('#couponSearchText').val()=="")
					{
						//""입력했다가 지웠을때 상황
						return;
					}
					$.ajax({
						type : 'POST',
						url : '../mypage/coupon_search_list.do',
						data : {"rname":couponSearchText},
						success : function(res) 
						{						
							
							$('#couponSearchList').html(res);
					
							$('.couponSearchOne').click(function(){
								var value=$(this).text();
								
								$('#couponSearchText').val(value);
							})
							
						}
					});
					
		
				});
				
				$('#beforePage').click(function(){
					var curpage = $('#couponCurpage').val();
				
					if(curpage <= 1 || curpage == undefined)
						curpage=1;
					else
						curpage=Number(curpage)-1;
					
						$('#curPage').text(curpage);
					
					$.ajax({
						type : 'POST',
						url : '../mypage/coupon.do',
						data : {"pageMove":"before","page":curpage},
						success : function(res) 
						{						
							
							$('#myContents').html(res);
						}
					});
				});
				
				$('#nextPage').click(function(){
					var curpage = $('#couponCurpage').val();
					
					if(curpage == undefined || curpage >= $('#totalPage').text())
						curpage=$('#totalPage').text();
					else
						curpage=Number(curpage)+1;
					
						$('#curPage').text(curpage);
				
					$.ajax({
						type : 'POST',
						url : '../mypage/coupon.do',
						data : {"pageMove":"next","page":curpage},

						success : function(res) 
						{						
							
							$('#myContents').html(res);
						}
					});
				});
			
			},
			error : function(e) {
				alert(e);
			}
		});
	});
	$('#mypage_infoupdate').click(function() {
		$("#floatMenu").hide();
		$.ajax({
			type : 'POST',
			url : '../mypage/infoupdate_check.do',
			success : function(res) {

				$('#myContents').html(res);
			},
			error : function(e) {
				alert(e);
			}
		});
		
		
	});
	
	$('#mypage_infoupdate_check_button').click(function() {
		var pwd = $('#mypage_infoupdate_check_pwd').val();
	
		$.ajax({
			type : 'POST',
			url : '../mypage/infoupdate_check_ok.do',
			data:{"pwd":pwd},
			success : function(res) {
				
				$('#myContents').html(res);
			},
			error : function(e) {
				alert(e);
			}
		});
	});
	
})






//원래 있던 자바스크립트 코드
/*var swiper = new Swiper('.swiper-container', {
	slidesPerView : 3,
	slidesPerGroup : 3,
	loop : true,
	loopFillGroupWithBlank : true,
	pagination : {
		el : '.swiper-pagination',
		clickable : true,
	},
	navigation : {
		nextEl : '.swiper-button-next',
		prevEl : '.swiper-button-prev',
	},
});

if ($('.image-link').length) {
	$('.image-link').magnificPopup({
		type : 'image',
		gallery : {
			enabled : true
		}
	});
}
if ($('.image-link2').length) {
	$('.image-link2').magnificPopup({
		type : 'image',
		gallery : {
			enabled : true
		}
	});
}
*/