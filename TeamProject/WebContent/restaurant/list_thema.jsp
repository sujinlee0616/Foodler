<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%--2020 04 16 수정 완료!! --%>
    
<!DOCTYPE html>
<html lang="ko">
<head>

    <!-- jQuery, Bootstrap JS. -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="${pageContext.request.contextPath }/js/jquery-3.2.1.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/popper.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/bootstrap.min.js"></script>

<!--  테마   맛집 페이지 CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath }/css/themalist.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> 

<script type="text/javascript">

$(function(){

	let activeTab=$('.thematabmenu').attr('data-tab'); //bigTab1.jsp 로 쓸 예정!
	let bigTabId=$('.thematabmenu').attr('#id');  
	
	
	$.ajax({
	
		type:'post',
		url:'../restaurant/cate_select_ok.do', //디폴트 페이지 & ajax
		data:{"no":1,"activeTab":activeTab,"bigTabId":bigTabId},
		success:function(res){
			
			$('#showsmallcate').html(res);
			
		}
		
	})
	//ajax끝
	
	
	//효과 넣을 예정
	//$('div').css('opacity','0.5'); //선택되지 않은 탭 배경 변경
	//$(this).css('background-color','white');  //선택된 탭 배경 변경
	//호버효과 시작
	/*
	$('.thematabmenu').hovor(function(){ 
		
			$(this).css('cursor','pointer');
		
		},
		function(){
			
			$(this).css('cursor','none');
		
		}
		
	)//호버효과 끝!
	*/
	
	
	//big3 메뉴 선택시 => small 테마들 ajax로 출력 예정!
	$('.thematabmenu').click(function(){
	
		let no=$(this).attr("value");
		
		console.log("no: "+ no);
		$.ajax({
		
			type:'post',
			url:'../restaurant/cate_select_ok.do', // ajax될 부분에 이 파일을 넣을 예정!
			data:{"no":no,"activeTab":activeTab,"bigTabId":bigTabId},
			success:function(res){
				
				$('#showsmallcate').html(res);
				
			}
			
		})// ajax로 출력 끝
		
	})// 클릭 이벤트 끝!

	
	
})//스크립트 끝
</script>


</head>
<body>
<!--=============================THEMA LIST START =============================-->
 <section class="list-block">
    
     
        <div class="container-fluid py-4 container py-5">
			<div class="row nearbyrow">

			
				<div class="responsive-wrap nearbymd7">
					<!-- ===================================검색 결과 타이틀 "~ 주변 검색 결과" ===================================-->
					<h5 class="styled-heading"> Various Thema List </h5>

					<p>
						총 <span>###개</span>
					</p>
					<!-- ============================================카테고리!!============================================= -->

					
					<div class="mt-4">
						<div class="filter_row area">
						
				<!--=============================BIG 3 THEME  =============================-->
  
  
    <section class="main-block themablock" id="theme">
        <div class="themacontainer">
        
            <div class="row justify-content-center">
   <!-- 
                <div class="col-md-5">
                    <div class="styled-heading">
                        <h3>테마별 맛집</h3>
                    </div>
                </div>
   -->
             </div>
            
		
                 <c:forEach var="i" begin="1" end="3"> 
                    <div data-tab="bigTab1" class="themarow thematabmenu find-img-align" id="defaultThemamenu" value="${i }">
                        <div class="col-md-12">
	                            <div class="find-place-img_wrap">
	                                <div class="grid">
	                                    <figure class="effect-ruby">
	                                        <img src="${pageContext.request.contextPath }/images/themacate${i }.png" value="${i}" class="img-fluid" alt="img13" title="${data[i-1] }"/>
	                                        <figcaption>
	                                            <h5 class="bysituation" style="color:white;">${data[i-1] }</h5>
	                                            <p>////</p>
	                                        </figcaption>
	                                    </figure>
	                                </div>
	                            </div>
                        </div>
                    </div>
                </c:forEach>

						

            <!--                         BIG 3 THEMA END                                -->
    


           
                
           <!--                              AJAX사용부분  small thema list start                         -->
                
                <div class="smallcatelist" id="showsmallcate"></div>
                
                
            
            
        </div><!-- 카테고리 container 끝! -->
    </section><!--  카테고리  section 끝! -->
    
    

		<!--=============================  AJAX사용부분   MIDDLE  THEMA LIST END    =============================-->
							

						
		<!-- ================================모든 리스트 감싸는 곳! =============================================-->
			<div class="row light-bg detail-options-wrap pt-3 nearbysearchlist" id="result_thema_list">


								
						<!--  ============================= 리스트 출력 모두 감싸는 부분 끝 =======================================-->
			
					
					
				</div>
			</div>


		</div>
        </div>
    </section>
    <!--//END DETAIL -->
    


   
</body>
</html>